
import Link from 'next/link'
import Image from '@/app/components/SanityImage'

type SanityImageValue = {
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
}

export default function BlogCard({
  title,
  slug,
  excerpt,
  coverImage,
}: {
  title: string
  slug: string
  excerpt: string
  coverImage?: SanityImageValue | null
}) {
  return (
    <div className="blog-card border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
        {coverImage?.asset?._ref && (
          <Image
            id={coverImage.asset._ref}
            alt={coverImage.alt || title}
            className="rounded-lg w-full mb-4"
            // width={1024}
            // height={538}
            mode="cover"
            hotspot={coverImage.hotspot}
            crop={coverImage.crop}
          />
        )}
        <div className="p-4">
            <h2 className="text-xl font-bold mb-2">{title}</h2>
            <p className="text-gray-700 mb-4">{excerpt}</p>
            <Link href={`/blog/${slug}`} className="text-blue-600 hover:underline">
            Read More
            </Link>
        </div>
    </div>
  )
}