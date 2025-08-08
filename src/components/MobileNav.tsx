'use client'

import { useState } from 'react'
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

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <div className="relative">
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
        aria-label="메뉴 열기"
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
        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50" 
             style={{
               backgroundColor: '#ffffff',
               color: '#4B5563'
             }}>
          <Link
            href="/"
            onClick={closeMenu}
            className="block px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            style={{ color: '#4B5563' }}
          >
            홈
          </Link>
          {/* 카테고리 섹션 */}
          {categories.length > 0 && (
            <>
              <div className="px-4 py-2">
                <div className="text-xs font-medium text-gray-500 mb-2" style={{ color: '#6B7280' }}>카테고리</div>
                {categories.map((category) => (
                  <Link
                    key={category.path}
                    href={category.path}
                    onClick={closeMenu}
                    className="block px-2 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded transition-colors"
                    style={{ color: '#4B5563' }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-base">{category.icon}</span>
                        <span>{category.name}</span>
                      </div>
                      <span className="text-xs bg-gray-100 px-1.5 py-0.5 rounded text-gray-500" 
                            style={{ backgroundColor: '#F3F4F6', color: '#6B7280' }}>
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
            className="block px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            style={{ color: '#4B5563' }}
          >
            태그
          </Link>
          <Link
            href="/books"
            onClick={closeMenu}
            className="block px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            style={{ color: '#4B5563' }}
          >
            편집한 도서
          </Link>
          <Link
            href="/about"
            onClick={closeMenu}
            className="block px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            style={{ color: '#4B5563' }}
          >
            소개
          </Link>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-40"
          onClick={closeMenu}
        />
      )}
    </div>
  )
}