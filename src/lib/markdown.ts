import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkHtml from 'remark-html'
// import rehypeSlug from 'rehype-slug'
// import rehypeAutolinkHeadings from 'rehype-autolink-headings'
// import rehypeHighlight from 'rehype-highlight'
import { memoize, measurePerformance } from './performance'

const postsDirectory = path.join(process.cwd(), 'content')

// Remark 프로세서를 미리 설정하여 재사용
const remarkProcessor = remark()
  .use(remarkGfm)
  .use(remarkHtml, {
    sanitize: false
  })

export interface PostData {
  id: string
  title: string
  date: string
  tags: string[]
  excerpt: string
  content: string
  contentHtml: string
  category?: string
  fileNameDate?: string // 파일명에서 추출한 날짜
}

// 재귀적으로 모든 .md 파일을 찾는 함수
function getAllMarkdownFiles(dir: string): string[] {
  const files: string[] = []
  const items = fs.readdirSync(dir)
  
  for (const item of items) {
    const fullPath = path.join(dir, item)
    const stat = fs.statSync(fullPath)
    
    if (stat.isDirectory()) {
      files.push(...getAllMarkdownFiles(fullPath))
    } else if (item.endsWith('.md')) {
      files.push(fullPath)
    }
  }
  
  return files
}

// 파일 이름에서 날짜 부분을 추출하는 함수
function extractDateFromFileName(fileName: string): string | undefined {
  const match = fileName.match(/^(\d{4}-\d{2}-\d{2})-/)
  return match ? match[1] : undefined
}

// 파일 이름에서 날짜 부분을 제거하고 ID를 생성하는 함수
function getPostIdFromFileName(filePath: string): string {
  const fileName = path.basename(filePath, '.md')
  // YYYY-MM-DD- 형식의 날짜 부분을 제거
  const id = fileName.replace(/^\d{4}-\d{2}-\d{2}-/, '')
  const relativePath = path.relative(postsDirectory, filePath)
  const dirName = path.dirname(relativePath)
  
  // 디렉토리가 content 루트가 아닌 경우 경로 포함
  if (dirName !== '.') {
    return `${dirName}/${id}`.replace(/\\/g, '/')
  }
  
  return id
}

export function getAllPostIds() {
  const markdownFiles = getAllMarkdownFiles(postsDirectory)
  return markdownFiles.map((filePath) => {
    const id = getPostIdFromFileName(filePath)
    return {
      params: {
        id: id,
      },
    }
  })
}

// getAllPosts를 메모이제이션으로 최적화
const _getAllPostsCore = (): PostData[] => {
  const endMeasure = measurePerformance('getAllPosts')
  
  const markdownFiles = getAllMarkdownFiles(postsDirectory)
  const allPostsData = markdownFiles.map((filePath) => {
    const id = getPostIdFromFileName(filePath)
    const fileName = path.basename(filePath, '.md')
    const fileNameDate = extractDateFromFileName(fileName)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const matterResult = matter(fileContents)

    // frontmatter에 date가 없으면 파일명의 날짜를 사용
    const postDate = matterResult.data.date || fileNameDate || '1970-01-01'

    return {
      id,
      title: matterResult.data.title,
      date: postDate,
      tags: matterResult.data.tags || [],
      excerpt: matterResult.data.excerpt || '',
      content: matterResult.content,
      contentHtml: '', // Will be populated later
      category: matterResult.data.category,
      fileNameDate,
    }
  })

  // Sort posts by date (frontmatter date 우선, 없으면 파일명 날짜 사용)
  const sortedPosts = allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
  
  endMeasure()
  return sortedPosts
}

// 메모이제이션 적용 - 파일 시스템 변경을 감지하기 위해 디렉토리 수정 시간을 키로 사용
export const getAllPosts = memoize(_getAllPostsCore, () => {
  try {
    const stat = fs.statSync(postsDirectory)
    return `posts-${stat.mtime.getTime()}`
  } catch {
    return `posts-${Date.now()}`
  }
})

export async function getPostData(id: string): Promise<PostData> {
  // 모든 마크다운 파일을 검색하여 해당 ID와 일치하는 파일을 찾습니다
  const markdownFiles = getAllMarkdownFiles(postsDirectory)
  let fullPath: string | null = null
  
  for (const filePath of markdownFiles) {
    const fileId = getPostIdFromFileName(filePath)
    if (fileId === id) {
      fullPath = filePath
      break
    }
  }
  
  if (!fullPath) {
    throw new Error(`Post not found: ${id}`)
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)
  const fileName = path.basename(fullPath, '.md')
  const fileNameDate = extractDateFromFileName(fileName)

  // frontmatter에 date가 없으면 파일명의 날짜를 사용
  const postDate = matterResult.data.date || fileNameDate || '1970-01-01'

  // Use remark to convert markdown into HTML string with basic settings
  const endMarkdownMeasure = measurePerformance(`markdown-processing-${id}`)
  const processedContent = await remarkProcessor.process(matterResult.content)
  endMarkdownMeasure()

  const contentHtml = processedContent.toString()

  // 디버깅: 특정 포스트의 변환 결과 확인
  if (id.includes('figma') || id.includes('test-simple')) {
    console.log('=== MARKDOWN DEBUG ===')
    console.log('Post ID:', id)
    console.log('Original markdown:', matterResult.content.substring(0, 200) + '...')
    console.log('Converted HTML:', contentHtml.substring(0, 400) + '...')
    console.log('======================')
  }

  return {
    id,
    title: matterResult.data.title,
    date: postDate,
    tags: matterResult.data.tags || [],
    excerpt: matterResult.data.excerpt || '',
    content: matterResult.content,
    contentHtml,
    category: matterResult.data.category,
    fileNameDate,
  }
}

export function getAllTags(): string[] {
  const posts = getAllPosts()
  const allTags = posts.flatMap((post) => post.tags)
  return [...new Set(allTags)].sort()
}

export function getPostsByTag(tag: string): PostData[] {
  const posts = getAllPosts()
  return posts.filter((post) => post.tags.includes(tag))
}

export function getAllCategories(): string[] {
  const posts = getAllPosts()
  const categories = posts.map((post) => post.category).filter(Boolean)
  return [...new Set(categories)] as string[]
}

// 폴더 구조 기반으로 카테고리 정보를 가져오는 함수
export function getCategoriesFromFolders(): Array<{name: string, path: string, description: string, icon: string, count: number}> {
  const posts = getAllPosts()
  
  // 폴더별 포스트 개수 계산
  const folderCounts: {[key: string]: number} = {}
  posts.forEach(post => {
    const folder = post.id.includes('/') ? post.id.split('/')[0] : 'root'
    folderCounts[folder] = (folderCounts[folder] || 0) + 1
  })
  
  const categories = [
    {
      name: '개발',
      path: '/category/dev',
      description: '개발 관련 포스트',
      icon: '💻',
      count: folderCounts['dev'] || 0
    },
    {
      name: '팁',
      path: '/category/tip',
      description: '유용한 개발 팁',
      icon: '💡',
      count: folderCounts['tip'] || 0
    },
    {
      name: '책',
      path: '/category/book',
      description: '책 리뷰 및 추천',
      icon: '📚',
      count: folderCounts['book'] || 0
    }
  ]
  
  return categories.filter(cat => cat.count > 0) // 포스트가 있는 카테고리만 반환
}

export function getPostsByCategory(category: string): PostData[] {
  const posts = getAllPosts()
  return posts.filter((post) => post.category === category)
} 