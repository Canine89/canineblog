#!/usr/bin/env node

/**
 * 자동 이미지 업로드 스크립트
 * 
 * 마크다운 파일에서 로컬 이미지 경로를 감지하고
 * public/images/posts/ 폴더로 이동한 후 경로를 업데이트합니다.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 설정
const CONTENT_DIR = path.join(__dirname, '../content');
const PUBLIC_IMAGES_DIR = path.join(__dirname, '../public/images/posts');
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];

// 로그 함수
const log = {
  info: (msg) => console.log(`ℹ️  ${msg}`),
  success: (msg) => console.log(`✅ ${msg}`),
  warning: (msg) => console.log(`⚠️  ${msg}`),
  error: (msg) => console.error(`❌ ${msg}`)
};

/**
 * 디렉토리가 존재하지 않으면 생성
 */
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    log.info(`디렉토리 created: ${dirPath}`);
  }
}

/**
 * 파일명에서 안전한 이름 생성 (공백, 특수문자 제거)
 */
function sanitizeFileName(fileName) {
  return fileName
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9.-]/g, '')
    .toLowerCase();
}

/**
 * 마크다운 파일에서 이미지 참조 찾기
 */
function findImageReferences(content) {
  // ![alt](./path/to/image.jpg) 또는 ![alt](../images/image.png) 형태의 로컬 이미지 참조 찾기
  const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
  const matches = [];
  let match;

  while ((match = imageRegex.exec(content)) !== null) {
    const [fullMatch, altText, imagePath] = match;
    
    // 로컬 경로인지 확인 (http:// 또는 https://로 시작하지 않고, /images/posts/로 시작하지 않음)
    if (!imagePath.startsWith('http') && !imagePath.startsWith('/images/posts/')) {
      matches.push({
        fullMatch,
        altText,
        imagePath,
        isLocal: true
      });
    }
  }

  return matches;
}

/**
 * 이미지 파일 복사 및 경로 업데이트
 */
function processImageFile(markdownFilePath, imageRef) {
  const { imagePath, altText } = imageRef;
  
  // 마크다운 파일 기준으로 이미지 파일의 절대 경로 계산
  const markdownDir = path.dirname(markdownFilePath);
  const sourceImagePath = path.resolve(markdownDir, imagePath);
  
  // 이미지 파일이 존재하는지 확인
  if (!fs.existsSync(sourceImagePath)) {
    log.warning(`이미지 파일을 찾을 수 없습니다: ${sourceImagePath}`);
    return null;
  }

  // 이미지 파일 확장자 확인
  const ext = path.extname(sourceImagePath).toLowerCase();
  if (!IMAGE_EXTENSIONS.includes(ext)) {
    log.warning(`지원되지 않는 이미지 형식: ${ext}`);
    return null;
  }

  // 새 파일명 생성 (날짜 + 원본 파일명)
  const originalFileName = path.basename(sourceImagePath);
  const sanitizedFileName = sanitizeFileName(originalFileName);
  const timestamp = new Date().toISOString().split('T')[0];
  const newFileName = `${timestamp}-${sanitizedFileName}`;
  
  // 대상 경로
  const targetImagePath = path.join(PUBLIC_IMAGES_DIR, newFileName);
  
  // 이미지 파일 복사
  try {
    fs.copyFileSync(sourceImagePath, targetImagePath);
    log.success(`이미지 복사됨: ${originalFileName} → ${newFileName}`);
    
    // 새로운 마크다운 경로
    const newMarkdownPath = `/images/posts/${newFileName}`;
    
    return {
      oldReference: imageRef.fullMatch,
      newReference: `![${altText}](${newMarkdownPath})`,
      newPath: newMarkdownPath
    };
  } catch (error) {
    log.error(`이미지 복사 실패: ${error.message}`);
    return null;
  }
}

/**
 * 마크다운 파일 처리
 */
function processMarkdownFile(filePath) {
  log.info(`처리 중: ${path.relative(process.cwd(), filePath)}`);
  
  const content = fs.readFileSync(filePath, 'utf8');
  const imageRefs = findImageReferences(content);
  
  if (imageRefs.length === 0) {
    log.info('로컬 이미지 참조가 없습니다.');
    return false;
  }

  let updatedContent = content;
  let hasChanges = false;

  // 각 이미지 참조 처리
  for (const imageRef of imageRefs) {
    const result = processImageFile(filePath, imageRef);
    if (result) {
      updatedContent = updatedContent.replace(result.oldReference, result.newReference);
      hasChanges = true;
      log.success(`경로 업데이트: ${imageRef.imagePath} → ${result.newPath}`);
    }
  }

  // 파일 업데이트
  if (hasChanges) {
    fs.writeFileSync(filePath, updatedContent, 'utf8');
    log.success(`마크다운 파일 업데이트됨: ${path.basename(filePath)}`);
    return true;
  }

  return false;
}

/**
 * 디렉토리 재귀적으로 처리
 */
function processDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);
  let totalChanges = 0;

  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      totalChanges += processDirectory(fullPath);
    } else if (file.endsWith('.md')) {
      if (processMarkdownFile(fullPath)) {
        totalChanges++;
      }
    }
  }

  return totalChanges;
}

/**
 * Git 변경사항 커밋
 */
function commitChanges(changedFiles) {
  try {
    log.info('Git 변경사항 커밋 중...');
    
    // 변경된 파일들과 새로운 이미지들을 git에 추가
    execSync('git add .', { stdio: 'inherit' });
    
    // 커밋 메시지 생성
    const commitMessage = `feat: 이미지 자동 업로드 및 경로 업데이트

- ${changedFiles}개의 마크다운 파일에서 이미지 경로 업데이트
- 로컬 이미지를 public/images/posts/로 이동
- 자동화된 이미지 처리 완료

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>`;

    execSync(`git commit -m "${commitMessage.replace(/"/g, '\\"')}"`, { stdio: 'inherit' });
    log.success('Git 커밋 완료!');
    
    // 선택적으로 푸시 (사용자가 결정할 수 있도록 물어봄)
    console.log('\n푸시하시겠습니까? (y/N)');
    // 이 부분은 대화형이므로 스크립트에서는 제외하고 사용자가 수동으로 푸시하도록 안내
    log.info('변경사항을 푸시하려면: git push');
    
  } catch (error) {
    log.error(`Git 작업 실패: ${error.message}`);
  }
}

/**
 * 메인 함수
 */
function main() {
  log.info('🚀 이미지 자동 업로드 스크립트 시작');
  
  // public/images/posts 디렉토리 확인/생성
  ensureDirectoryExists(PUBLIC_IMAGES_DIR);
  
  // content 디렉토리 처리
  const changedFiles = processDirectory(CONTENT_DIR);
  
  if (changedFiles > 0) {
    log.success(`\n✨ 처리 완료! ${changedFiles}개의 파일이 업데이트되었습니다.`);
    commitChanges(changedFiles);
  } else {
    log.info('\n처리할 이미지가 없습니다.');
  }
  
  log.info('\n🎉 작업 완료!');
}

// 스크립트 직접 실행 시에만 main 함수 호출
if (require.main === module) {
  main();
}

module.exports = { processMarkdownFile, findImageReferences };