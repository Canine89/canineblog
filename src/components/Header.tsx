'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { siteConfig } from '@/lib/config'
import { CategoryDropdown } from '@/components/CategoryDropdown'
import { MobileNav } from '@/components/MobileNav'
import { ThemeToggle } from '@/components/ThemeToggle'

interface Category {
  name: string
  path: string
  description: string
  icon: string
  count: number
}

const HERO_HEIGHT = 320

export function Header({ categories }: { categories: Category[] }) {
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (!isHomePage) return

    const onScroll = () => setScrolled(window.scrollY > HERO_HEIGHT)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHomePage])

  const coral = isHomePage && !scrolled

  return (
    <header
      suppressHydrationWarning
      className={`sticky top-0 z-50 transition-all duration-300 ${
        coral
          ? 'bg-pantone-blue'
          : 'bg-pantone-snow/95 dark:bg-[#1A1410]/95 backdrop-blur-sm border-b border-pantone-border dark:border-[#3D3228]'
      }`}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div suppressHydrationWarning className={`flex items-center justify-between ${coral ? 'h-14' : 'h-16'}`}>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              suppressHydrationWarning
              className={`text-lg sm:text-xl font-extrabold tracking-tight transition-colors ${
                coral
                  ? 'text-white hover:text-white/80'
                  : 'text-pantone-ink dark:text-[#E8E0D6] hover:text-pantone-blue'
              }`}
            >
              {siteConfig.title}
            </Link>
            <span
              suppressHydrationWarning
              className={`hidden sm:inline text-xs tracking-widest uppercase transition-colors ${
                coral ? 'text-white/40' : 'text-gray-400 dark:text-[#9A8E82]'
              }`}
            >
              by {siteConfig.author.name}
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors ${
                coral ? 'text-white/70 hover:text-white' : 'text-gray-500 dark:text-[#9A8E82] hover:text-pantone-ink dark:hover:text-[#E8E0D6]'
              }`}
            >
              홈
            </Link>
            <CategoryDropdown categories={categories} isHome={coral} />
            <Link
              href="/tags"
              className={`text-sm font-medium transition-colors ${
                coral ? 'text-white/70 hover:text-white' : 'text-gray-500 dark:text-[#9A8E82] hover:text-pantone-ink dark:hover:text-[#E8E0D6]'
              }`}
            >
              태그
            </Link>
            <Link
              href="/books"
              className={`text-sm font-medium transition-colors ${
                coral ? 'text-white/70 hover:text-white' : 'text-gray-500 dark:text-[#9A8E82] hover:text-pantone-ink dark:hover:text-[#E8E0D6]'
              }`}
            >
              편집한 도서
            </Link>
            <Link
              href="/about"
              className={`text-sm font-medium transition-colors ${
                coral ? 'text-white/70 hover:text-white' : 'text-gray-500 dark:text-[#9A8E82] hover:text-pantone-ink dark:hover:text-[#E8E0D6]'
              }`}
            >
              소개
            </Link>
            <ThemeToggle className={coral ? 'text-white/70' : 'text-gray-500 dark:text-[#9A8E82]'} />
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle className={coral ? 'text-white/70' : 'text-gray-500 dark:text-[#9A8E82]'} />
            <MobileNav categories={categories} isHome={coral} />
          </div>
        </div>
      </div>
    </header>
  )
}
