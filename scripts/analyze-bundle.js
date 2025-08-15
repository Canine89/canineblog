const fs = require('fs');
const path = require('path');

/**
 * Next.js 빌드 결과 분석 스크립트
 */

async function analyzeBuildOutput() {
  const buildDir = path.join(__dirname, '../.next');
  
  if (!fs.existsSync(buildDir)) {
    console.log('❌ 빌드 디렉토리가 없습니다. 먼저 `npm run build`를 실행하세요.');
    return;
  }

  console.log('🔍 번들 크기 분석 시작...\n');

  // 정적 파일 크기 분석
  analyzeStaticFiles();
  
  // 청크 파일 분석
  analyzeChunks();
  
  // 페이지별 번들 크기 분석
  analyzePages();
  
  // 성능 권장사항
  performanceRecommendations();
}

function analyzeStaticFiles() {
  const staticDir = path.join(__dirname, '../.next/static');
  
  if (!fs.existsSync(staticDir)) return;
  
  console.log('📊 정적 파일 분석:');
  console.log('=' .repeat(50));
  
  const jsDir = path.join(staticDir, 'chunks');
  const cssDir = path.join(staticDir, 'css');
  
  if (fs.existsSync(jsDir)) {
    const jsFiles = getFileSizes(jsDir, '.js');
    console.log('\n🟨 JavaScript 파일:');
    jsFiles.forEach(file => {
      const sizeKB = (file.size / 1024).toFixed(2);
      const status = file.size > 244 * 1024 ? '⚠️' : '✅';
      console.log(`  ${status} ${file.name}: ${sizeKB} KB`);
    });
  }
  
  if (fs.existsSync(cssDir)) {
    const cssFiles = getFileSizes(cssDir, '.css');
    console.log('\n🟦 CSS 파일:');
    cssFiles.forEach(file => {
      const sizeKB = (file.size / 1024).toFixed(2);
      const status = file.size > 50 * 1024 ? '⚠️' : '✅';
      console.log(`  ${status} ${file.name}: ${sizeKB} KB`);
    });
  }
}

function analyzeChunks() {
  const chunksDir = path.join(__dirname, '../.next/static/chunks');
  
  if (!fs.existsSync(chunksDir)) return;
  
  console.log('\n\n📦 청크 분석:');
  console.log('=' .repeat(50));
  
  const chunkFiles = getFileSizes(chunksDir, '.js');
  const totalSize = chunkFiles.reduce((sum, file) => sum + file.size, 0);
  
  console.log(`\n총 청크 크기: ${(totalSize / 1024 / 1024).toFixed(2)} MB\n`);
  
  // 큰 청크 파일들 식별
  const largeChunks = chunkFiles.filter(file => file.size > 100 * 1024);
  if (largeChunks.length > 0) {
    console.log('🔥 큰 청크 파일들 (>100KB):');
    largeChunks.forEach(file => {
      const sizeKB = (file.size / 1024).toFixed(2);
      console.log(`  📦 ${file.name}: ${sizeKB} KB`);
    });
  }
}

function analyzePages() {
  const pagesDir = path.join(__dirname, '../.next/server/pages');
  
  if (!fs.existsSync(pagesDir)) return;
  
  console.log('\n\n📄 페이지별 분석:');
  console.log('=' .repeat(50));
  
  function analyzePageDir(dir, prefix = '') {
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        analyzePageDir(fullPath, `${prefix}${item}/`);
      } else if (item.endsWith('.js') || item.endsWith('.html')) {
        const sizeKB = (stat.size / 1024).toFixed(2);
        const route = `${prefix}${item.replace(/\.(js|html)$/, '')}`;
        const status = stat.size > 50 * 1024 ? '⚠️' : '✅';
        console.log(`  ${status} /${route}: ${sizeKB} KB`);
      }
    });
  }
  
  analyzePageDir(pagesDir);
}

function performanceRecommendations() {
  console.log('\n\n💡 성능 최적화 권장사항:');
  console.log('=' .repeat(50));
  
  const recommendations = [
    '✅ 이미지 최적화: WebP 형식 사용 고려',
    '✅ 코드 스플리팅: 동적 import() 사용',
    '✅ 트리 셰이킹: 사용하지 않는 코드 제거',
    '✅ 폰트 최적화: next/font 사용',
    '✅ 번들 분석기: @next/bundle-analyzer 추가 고려',
    '✅ 서비스 워커: PWA 캐싱 전략 적용'
  ];
  
  recommendations.forEach(rec => console.log(`  ${rec}`));
  
  console.log('\n📊 추가 분석 도구:');
  console.log('  • npm install --save-dev @next/bundle-analyzer');
  console.log('  • npm install --save-dev webpack-bundle-analyzer');
  console.log('  • https://nextjs.org/docs/advanced-features/analyzing-bundles');
}

function getFileSizes(dir, extension) {
  const files = [];
  
  function traverse(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    items.forEach(item => {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        traverse(fullPath);
      } else if (item.endsWith(extension)) {
        files.push({
          name: path.relative(dir, fullPath),
          size: stat.size,
          path: fullPath
        });
      }
    });
  }
  
  traverse(dir);
  
  // 크기 순으로 정렬
  return files.sort((a, b) => b.size - a.size);
}

// 스크립트 실행
if (require.main === module) {
  analyzeBuildOutput().catch(console.error);
}

module.exports = { analyzeBuildOutput };
