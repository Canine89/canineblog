'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { withLocale } from '@/lib/locale-path'
import type { Locale } from '@/i18n/config'

interface Category {
  name: string
  path: string
  description: string
  icon: string
  count: number
}

interface CategoryDropdownProps {
  categories: Category[]
  isHome?: boolean
  locale: Locale
}

const CAT_COLORS: Record<string, string> = {
  dev: '#E8734A',
  study: '#74A892',
  book: '#C4956A',
  think: '#A3677E',
  'eng-dev': '#4B7BA6',
}

export function CategoryDropdown({
  categories,
  isHome = false,
  locale,
}: CategoryDropdownProps) {
  const { t } = useTranslation('common')
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`text-sm font-medium transition-colors flex items-center gap-1 ${
          isHome ? 'text-white/70 hover:text-white' : 'text-gray-500 dark:text-[#9A8E82] hover:text-pantone-ink dark:hover:text-[#E8E0D6]'
        }`}
      >
        <span>{t('nav.category')}</span>
        <svg 
          className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-[#2E2820] border border-pantone-border dark:border-[#3D3228] shadow-xl z-50 animate-in fade-in slide-in-from-top-1 duration-200">
          {/* Mini swatch strip */}
          <div className="flex h-2">
            {categories.map((category) => {
              const slug = category.path.split('/').pop() || ''
              return (
                <div
                  key={slug}
                  className="flex-1"
                  style={{ backgroundColor: CAT_COLORS[slug] || '#94A3B8' }}
                />
              )
            })}
          </div>
          <div className="px-4 pt-3 pb-1">
            <p className="pantone-label">PANTONE</p>
            <p className="mt-0.5 text-[10px] text-gray-400 dark:text-[#9A8E82]">
              {t('nav.categoryCollection')}
            </p>
          </div>
          <div className="py-1">
            {categories.map((category) => {
              const slug = category.path.split('/').pop() || ''
              const color = CAT_COLORS[slug] || '#94A3B8'
              return (
                <Link
                  key={category.path}
                  href={withLocale(locale, category.path)}
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-pantone-snow dark:hover:bg-[#252019] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <div
                    className="w-5 h-5 flex-shrink-0"
                    style={{ backgroundColor: color }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-pantone-ink dark:text-[#E8E0D6]">{category.name}</div>
                    <div className="text-[10px] text-gray-400 dark:text-[#9A8E82]">{category.description}</div>
                  </div>
                  <span className="text-[10px] text-gray-400 dark:text-[#9A8E82] font-medium">
                    {category.count}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
