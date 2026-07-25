import {carouselSlidesQuery} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/live'
import type { PortableTextBlock } from 'next-sanity'

import Link from 'next/link'

import Carousel from '@/app/components/Carousel/Carousel'
import BlogCard from './components/BlogCard/BlogCard'

type CarouselSlideQueryItem = {
  _id?: string
  title?: string | null
  imageUrl?: string | null
  mobileImageUrl?: string | null
  body?: PortableTextBlock[] | null
  url?: { current: string, buttonText?: string | "View" } | null
  order?: number | null
}

type PostQueryItem = {
  title: string
  slug: { current: string }
  excerpt: string
  coverImage?: {
    asset?: {
      _ref?: string
    }
    hotspot?: {
      x: number
      y: number
      width: number
      height: number
    }
    crop?: {
      top: number
      bottom: number
      left: number
      right: number
    }
    alt?: string
  } | null
}

export default async function Page() {
  const {data: slidesData} = await sanityFetch({
    query: carouselSlidesQuery,
  })

  const {data: postsData} = await sanityFetch({
    query: `*[_type == "post"]{title, excerpt, slug, coverImage, date, "author": author->{name}} | order(date desc, _createdAt desc)[0...4]`,
  })
  const posts = Array.isArray(postsData) ? (postsData as PostQueryItem[]) : []

  return (
    <>
      <Carousel slides={slidesData as CarouselSlideQueryItem[]} />
      <div className="blog-container py-6 px-4 md:pt-12 md:px-20">
        <div className="text-3xl font-bold">Blog Posts:</div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {posts.map((post) => (
            <BlogCard key={post.slug.current} title={post.title} slug={post.slug.current} excerpt={post.excerpt} coverImage={post.coverImage} />
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <Link
            href="/blog"
            className="text-lg hover:text-white transition-colors duration-200 px-4 py-2 rounded-sm text-white bg-blue-600"
          >
            View All Posts
          </Link>
        </div>
      </div>
    </>
  )
}
