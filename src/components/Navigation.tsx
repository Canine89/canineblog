'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

const categories = [
  {
    name: '개발',
    path: '/category/dev',
    description: '개발 관련 포스트',
    icon: '💻'
  },
  {
    name: '팁',
    path: '/category/tip',
    description: '유용한 개발 팁',
    icon: '💡'
  },
  {
    name: '책',
    path: '/category/book',
    description: '책 리뷰 및 추천',
    icon: '📚'
  }
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* 로고 */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2 text-lg font-semibold text-gray-900 hover:text-gray-700 transition-colors">
              <span className="text-xl">📝</span>
              <span>편집자P의 편집실</span>
            </Link>
          </div>

          {/* 데스크톱 메뉴 */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">
              홈
            </Link>
            
            {/* 카테고리 드롭다운 */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'categories' ? null : 'categories')}
                className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors flex items-center space-x-1"
              >
                <span>카테고리</span>
                <svg 
                  className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'categories' ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {activeDropdown === 'categories' && (
                <div
                  className="absolute right-0 mt-1 w-56 bg-white rounded-md shadow-lg border border-gray-200 z-50 animate-in fade-in slide-in-from-top-1 duration-200"
                >
                  <div className="py-2">
                    {categories.map((category) => (
                      <Link
                        key={category.path}
                        href={category.path}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={() => setActiveDropdown(null)}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-lg">{category.icon}</span>
                          <div>
                            <div className="font-medium">{category.name}</div>
                            <div className="text-xs text-gray-500 mt-1">{category.description}</div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link href="/about" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">
              소개
            </Link>
            
            <Link href="/books" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">
              출간 도서
            </Link>

          </div>

          {/* 모바일 메뉴 버튼 */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 p-2 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className="text-gray-700 hover:text-gray-900 block px-3 py-3 text-base font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              홈
            </Link>
            
            <div className="px-3 py-2">
              <div className="text-gray-500 font-medium mb-2 text-sm">카테고리</div>
              {categories.map((category) => (
                <Link
                  key={category.path}
                  href={category.path}
                  className="block px-3 py-2 text-sm text-gray-700 hover:text-gray-900 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{category.icon}</span>
                    <div>
                      <div className="font-medium">{category.name}</div>
                      <div className="text-xs text-gray-500 mt-1">{category.description}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <Link
              href="/about"
              className="text-gray-700 hover:text-gray-900 block px-3 py-3 text-base font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              소개
            </Link>
            
            <Link
              href="/books"
              className="text-gray-700 hover:text-gray-900 block px-3 py-3 text-base font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              출간 도서
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
} 