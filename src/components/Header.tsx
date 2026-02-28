'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { siteConfig } from '@/lib/config'
import { CategoryDropdown } from '@/components/CategoryDropdown'
import { MobileNav } from '@/components/MobileNav'

interface Category {
  name: string
  path: string
  description: string
  icon: string
  count: number
}

export function Header({ categories }: { categories: Category[] }) {
  const pathname = usePathname()
  const isHome = pathname === '/'

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        isHome
          ? 'bg-pantone-blue'
          : 'bg-white/95 backdrop-blur-sm border-b border-pantone-border'
      }`}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between ${isHome ? 'h-14' : 'h-16'}`}>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className={`text-lg sm:text-xl font-extrabold tracking-tight transition-colors ${
                isHome
                  ? 'text-white hover:text-white/80'
                  : 'text-pantone-ink hover:text-pantone-blue'
              }`}
            >
              {siteConfig.title}
            </Link>
            <span
              className={`hidden sm:inline text-xs tracking-widest uppercase ${
                isHome ? 'text-white/40' : 'text-gray-400'
              }`}
            >
              by {siteConfig.author.name}
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors ${
                isHome
                  ? 'text-white/70 hover:text-white'
                  : 'text-gray-500 hover:text-pantone-ink'
              }`}
            >
              홈
            </Link>
            <CategoryDropdown categories={categories} isHome={isHome} />
            <Link
              href="/tags"
              className={`text-sm font-medium transition-colors ${
                isHome
                  ? 'text-white/70 hover:text-white'
                  : 'text-gray-500 hover:text-pantone-ink'
              }`}
            >
              태그
            </Link>
            <Link
              href="/books"
              className={`text-sm font-medium transition-colors ${
                isHome
                  ? 'text-white/70 hover:text-white'
                  : 'text-gray-500 hover:text-pantone-ink'
              }`}
            >
              편집한 도서
            </Link>
            <Link
              href="/about"
              className={`text-sm font-medium transition-colors ${
                isHome
                  ? 'text-white/70 hover:text-white'
                  : 'text-gray-500 hover:text-pantone-ink'
              }`}
            >
              소개
            </Link>
          </nav>

          <div className="flex items-center md:hidden">
            <MobileNav categories={categories} isHome={isHome} />
          </div>
        </div>
      </div>
    </header>
  )
}
