'use client'

import { useState } from 'react'

interface SocialShareProps {
  title: string
  url: string
  excerpt?: string
}

export function SocialShare({ title, url, excerpt }: SocialShareProps) {
  const [showTooltip, setShowTooltip] = useState<string | null>(null)

  const shareText = excerpt || title
  const encodedTitle = encodeURIComponent(title)
  const encodedUrl = encodeURIComponent(url)
  const encodedText = encodeURIComponent(shareText)

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    threads: `https://www.threads.net/intent/post?text=${encodedTitle}%20${encodedUrl}`,
    copy: url
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setShowTooltip('copy')
      setTimeout(() => setShowTooltip(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleShare = (platform: string) => {
    if (platform === 'copy') {
      handleCopyLink()
    } else {
      window.open(shareLinks[platform as keyof typeof shareLinks], '_blank', 'width=600,height=400')
    }
  }

  return (
    <div className="flex items-center space-x-3">
      <span className="text-sm text-gray-600 font-medium">공유:</span>
      
      <div className="flex items-center space-x-2">
        {/* Twitter */}
        <button
          onClick={() => handleShare('twitter')}
          className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-blue-50 hover:text-blue-600 text-gray-600 transition-colors"
          title="Twitter에서 공유"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </button>

        {/* Facebook */}
        <button
          onClick={() => handleShare('facebook')}
          className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-blue-50 hover:text-blue-600 text-gray-600 transition-colors"
          title="Facebook에서 공유"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </button>

        {/* LinkedIn */}
        <button
          onClick={() => handleShare('linkedin')}
          className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-blue-50 hover:text-blue-600 text-gray-600 transition-colors"
          title="LinkedIn에서 공유"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </button>

        {/* Threads */}
        <button
          onClick={() => handleShare('threads')}
          className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-purple-50 hover:text-purple-600 text-gray-600 transition-colors"
          title="Threads에서 공유"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.781 3.632 2.695 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.744-1.757-.569-.656-1.412-.989-2.515-.989-.906 0-1.724.335-2.337.959-.613.624-.92 1.452-.875 2.366l-2.041-.02c-.09-1.547.583-2.971 1.892-4.005C7.275 4.020 8.8 3.497 10.6 3.497c1.70 0 3.188.656 4.199 1.851.858 1.014 1.336 2.384 1.428 4.088-.024-.039-.047-.079-.072-.117-.628-1.059-1.56-1.798-2.775-2.201-.97-.322-2.026-.415-3.146-.277-1.863.23-2.988 1.043-3.35 2.416-.177.67-.067 1.314.31 1.815.822 1.096 2.68 1.029 3.82.67.665-.21 1.43-.67 1.85-1.264.420-.594.668-1.336.668-2.199 0-.265-.018-.523-.052-.773 1.026.507 1.425 1.257 1.425 2.696 0 1.543-.593 2.755-1.761 3.606-1.168.85-2.814 1.284-4.897 1.284z"/>
          </svg>
        </button>

        {/* Copy Link */}
        <div className="relative">
          <button
            onClick={() => handleShare('copy')}
            className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
            title="링크 복사"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </button>
          
          {showTooltip === 'copy' && (
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded">
              복사됨!
            </div>
          )}
        </div>
      </div>
    </div>
  )
}