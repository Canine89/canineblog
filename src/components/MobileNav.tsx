'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

interface Category {
  name: string
  path: string
  description: string
  icon: string
  count: number
}

interface MobileNavProps {
  categories?: Category[]
  isHome?: boolean
}

const CAT_COLORS: Record<string, string> = {
  dev: '#D97757',
  study: '#6B8F71',
  book: '#C2956B',
  think: '#8B5E6B',
  'eng-dev': '#5E7FA3',
}

export function MobileNav({ categories = [], isHome = false }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && 
          menuRef.current && 
          !menuRef.current.contains(event.target as Node) &&
          buttonRef.current &&
          !buttonRef.current.contains(event.target as Node)) {
        closeMenu()
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        closeMenu()
        buttonRef.current?.focus()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        className={`p-2 transition-colors duration-150 focus:outline-none ${
          isOpen ? 'text-white z-50' : isHome ? 'text-white/70 hover:text-white' : 'text-gray-500 hover:text-pantone-ink'
        }`}
        aria-label={isOpen ? '메뉴 닫기' : '메뉴 열기'}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {isOpen && (
        <div 
          ref={menuRef}
          className="absolute right-0 top-full mt-2 w-64 bg-white border border-pantone-border shadow-xl z-50"
          role="menu"
        >
          {/* Color strip */}
          <div className="h-1.5 bg-pantone-blue" />
          
          <div className="px-4 pt-3 pb-1">
            <p className="pantone-label">PANTONE</p>
            <p className="text-[10px] text-gray-400">Navigation</p>
          </div>

          <Link href="/" onClick={closeMenu} className="block px-4 py-2.5 text-sm font-medium text-pantone-ink hover:bg-pantone-snow transition-colors" role="menuitem">
            홈
          </Link>

          {categories.length > 0 && (
            <div className="border-t border-pantone-border">
              <div className="px-4 pt-3 pb-1">
                <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-[0.15em]">카테고리</p>
              </div>
              {categories.map((category) => {
                const slug = category.path.split('/').pop() || ''
                const color = CAT_COLORS[slug] || '#94A3B8'
                return (
                  <Link
                    key={category.path}
                    href={category.path}
                    onClick={closeMenu}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-pantone-snow transition-colors"
                    role="menuitem"
                  >
                    <div className="w-4 h-4 flex-shrink-0" style={{ backgroundColor: color }} />
                    <span className="text-sm text-pantone-ink">{category.name}</span>
                    <span className="ml-auto text-[10px] text-gray-400">{category.count}</span>
                  </Link>
                )
              })}
            </div>
          )}
          
          <div className="border-t border-pantone-border">
            <Link href="/tags" onClick={closeMenu} className="block px-4 py-2.5 text-sm text-pantone-ink hover:bg-pantone-snow transition-colors" role="menuitem">
              태그
            </Link>
            <Link href="/books" onClick={closeMenu} className="block px-4 py-2.5 text-sm text-pantone-ink hover:bg-pantone-snow transition-colors" role="menuitem">
              편집한 도서
            </Link>
            <Link href="/about" onClick={closeMenu} className="block px-4 py-2.5 text-sm text-pantone-ink hover:bg-pantone-snow transition-colors" role="menuitem">
              소개
            </Link>
          </div>
          
          <div className="h-1.5 bg-pantone-blue" />
        </div>
      )}

      {isOpen && (
        <div
          className="fixed inset-x-0 bottom-0 top-16 bg-black/20 z-30"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </div>
  )
}
