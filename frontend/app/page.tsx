import {carouselSlidesQuery} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/live'
import type { PortableTextBlock } from 'next-sanity'

import Carousel from '@/app/components/Carousel/Carousel'

type CarouselSlideQueryItem = {
  _id?: string
  title?: string | null
  imageUrl?: string | null
  mobileImageUrl?: string | null
  body?: PortableTextBlock[] | null
  url?: { current: string, buttonText?: string | "View" } | null
  order?: number | null
}

export default async function Page() {
  const {data: slidesData} = await sanityFetch({
    query: carouselSlidesQuery,
  })
  console.log("slidesData", slidesData)

  // const slides = Array.isArray(slidesData)
  //   ? (slidesData as CarouselSlideQueryItem[])
  //       .map((slide) => (typeof slide?.title === 'string' ? slide.title : null))
  //       .filter((title): title is string => Boolean(title))
  //   : []

  return (
    <>
      <Carousel slides={slidesData as CarouselSlideQueryItem[]} />
    </>
  )
}
