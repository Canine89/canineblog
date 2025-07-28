'use client'

import React, { useState } from 'react'
import Link from 'next/link'

const categories = [
  {
    name: '개발',
    path: '/category/dev',
    description: '개발 관련 포스트'
  },
  {
    name: '팁',
    path: '/category/tip', 
    description: '유용한 개발 팁'
  },
  {
    name: '책',
    path: '/category/book',
    description: '책 리뷰 및 추천'
  }
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              <Link href="/" className="hover:text-blue-600 transition-colors">
                My Blog
              </Link>
            </h1>
          </div>
          
          {/* 데스크톱 네비게이션 */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-500 hover:text-gray-900 transition-colors">
              홈
            </Link>
            
            {/* 카테고리 드롭다운 */}
            <div className="relative">
              <button
                className="text-gray-500 hover:text-gray-900 transition-colors flex items-center"
                onMouseEnter={() => setActiveDropdown('categories')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                카테고리
                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {activeDropdown === 'categories' && (
                <div 
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                  onMouseEnter={() => setActiveDropdown('categories')}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {categories.map((category) => (
                    <Link
                      key={category.path}
                      href={category.path}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <div className="font-medium">{category.name}</div>
                      <div className="text-xs text-gray-500">{category.description}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            <Link href="/blog" className="text-gray-500 hover:text-gray-900 transition-colors">
              블로그
            </Link>
            <Link href="/about" className="text-gray-500 hover:text-gray-900 transition-colors">
              소개
            </Link>
          </div>
          
          {/* 모바일 메뉴 버튼 */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 hover:text-gray-900 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* 모바일 메뉴 */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/" className="block px-3 py-2 text-gray-500 hover:text-gray-900 transition-colors">
                홈
              </Link>
              <div className="px-3 py-2">
                <div className="text-gray-500 font-medium mb-2">카테고리</div>
                {categories.map((category) => (
                  <Link
                    key={category.path}
                    href={category.path}
                    className="block px-3 py-1 text-sm text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
              <Link href="/blog" className="block px-3 py-2 text-gray-500 hover:text-gray-900 transition-colors">
                블로그
              </Link>
              <Link href="/about" className="block px-3 py-2 text-gray-500 hover:text-gray-900 transition-colors">
                소개
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
} 