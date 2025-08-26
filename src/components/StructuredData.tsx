import { siteConfig } from '@/lib/config'

export interface StructuredDataProps {
  type: 'website' | 'article' | 'blog'
  title: string
  description: string
  url: string
  datePublished?: string
  dateModified?: string
  tags?: string[]
  category?: string
}

export function StructuredData({
  type,
  title,
  description,
  url,
  datePublished,
  dateModified,
  tags,
  category
}: StructuredDataProps) {
  const baseStructuredData = {
    '@context': 'https://schema.org',
    '@type': type === 'website' ? 'WebSite' : type === 'blog' ? 'Blog' : 'BlogPosting',
    name: title,
    description: description,
    url: url,
    author: {
      '@type': 'Person',
      name: siteConfig.author.name,
      email: siteConfig.author.email,
      jobTitle: 'IT Book Editor & Developer',
      worksFor: {
        '@type': 'Organization',
        name: '골든래빗 출판사'
      },
      sameAs: Object.values(siteConfig.author.social)
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.title,
      url: siteConfig.site.url,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.site.url}/og-image.jpg`
      }
    },
    inLanguage: 'ko-KR'
  }

  // Article-specific structured data
  if (type === 'article') {
    Object.assign(baseStructuredData, {
      headline: title,
      datePublished: datePublished,
      dateModified: dateModified || datePublished,
      keywords: tags?.join(', '),
      articleSection: category,
      wordCount: description.length > 100 ? 'substantial' : 'brief',
      image: {
        '@type': 'ImageObject',
        url: `${siteConfig.site.url}/og-image.jpg`,
        width: 1200,
        height: 630
      }
    })
  }

  // Website-specific structured data
  if (type === 'website') {
    Object.assign(baseStructuredData, {
      '@type': 'WebSite',
      alternateName: '편집자P 블로그',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteConfig.site.url}/search?q={search_term_string}`
        },
        'query-input': 'required name=search_term_string'
      }
    })
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(baseStructuredData, null, 2)
      }}
    />
  )
}

// Organization structured data for the main site
export function OrganizationStructuredData() {
  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.title,
    alternateName: '편집자P 블로그',
    url: siteConfig.site.url,
    logo: `${siteConfig.site.url}/og-image.jpg`,
    description: siteConfig.description,
    email: siteConfig.author.email,
    sameAs: Object.values(siteConfig.author.social),
    founder: {
      '@type': 'Person',
      name: siteConfig.author.name,
      jobTitle: 'IT Book Editor & Developer'
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'KR',
      addressLocality: 'South Korea'
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(organizationData, null, 2)
      }}
    />
  )
}