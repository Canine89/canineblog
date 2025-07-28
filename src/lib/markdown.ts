import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeHighlight from 'rehype-highlight'

const postsDirectory = path.join(process.cwd(), 'content')

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

export function getAllPosts(): PostData[] {
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
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

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

  // Use remark to convert markdown into HTML string with enhanced processing
  const processedContent = await remark()
    .use(remarkGfm)
    .use(html, { sanitize: false })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: 'append',
      properties: {
        className: ['anchor'],
      },
    })
    .use(rehypeHighlight)
    .process(matterResult.content)

  const contentHtml = processedContent.toString()

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

export function getPostsByCategory(category: string): PostData[] {
  const posts = getAllPosts()
  return posts.filter((post) => post.category === category)
} 