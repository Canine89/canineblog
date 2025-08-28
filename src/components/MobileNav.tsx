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
}

export function MobileNav({ categories = [] }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  // Close menu when clicking outside
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
      // Prevent body scroll when menu is open
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
      {/* Hamburger Button */}
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        className={`p-2 rounded-md transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
          isOpen ? 'text-white z-50' : 'text-gray-600 hover:text-gray-900'
        }`}
        aria-label={isOpen ? '메뉴 닫기' : '메뉴 열기'}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div 
          ref={menuRef}
          className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 transform transition-all duration-200 ease-out opacity-100 scale-100"
          role="menu"
          aria-labelledby="mobile-menu-button"
        >
          <Link
            href="/"
            onClick={closeMenu}
            className="block px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-150 focus:outline-none focus:bg-gray-100"
            role="menuitem"
          >
            홈
          </Link>
          {/* 카테고리 섹션 */}
          {categories.length > 0 && (
            <>
              <div className="px-4 py-2">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">카테고리</div>
                {categories.map((category) => (
                  <Link
                    key={category.path}
                    href={category.path}
                    onClick={closeMenu}
                    className="block px-2 py-1 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded transition-colors duration-150 focus:outline-none focus:bg-gray-100"
                    role="menuitem"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-base">{category.icon}</span>
                        <span>{category.name}</span>
                      </div>
                      <span className="text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded font-medium">
                        {category.count}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
              
              <div className="border-t border-gray-200 my-2"></div>
            </>
          )}
          
          <Link
            href="/tags"
            onClick={closeMenu}
            className="block px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-150 focus:outline-none focus:bg-gray-100"
            role="menuitem"
          >
            태그
          </Link>
          <Link
            href="/books"
            onClick={closeMenu}
            className="block px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-150 focus:outline-none focus:bg-gray-100"
            role="menuitem"
          >
            편집한 도서
          </Link>
          <Link
            href="/about"
            onClick={closeMenu}
            className="block px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-150 focus:outline-none focus:bg-gray-100"
            role="menuitem"
          >
            소개 · 연락처
          </Link>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-x-0 bottom-0 top-16 bg-black bg-opacity-20 z-30 transition-opacity duration-200 ease-out"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </div>
  )
}