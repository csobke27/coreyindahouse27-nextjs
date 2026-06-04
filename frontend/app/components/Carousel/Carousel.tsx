"use client"

import Link from 'next/link'
import {useState, useRef} from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperInstance } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import type { PortableTextBlock } from 'next-sanity'
import PortableText from '@/app/components/PortableText'


// import required modules
import {Autoplay, Pagination, Navigation} from 'swiper/modules'
import styles from './Carousel.module.css'

type CarouselSlideQueryItem = {
  _id?: string
  title?: string | null
  imageUrl?: string | null
  mobileImageUrl?: string | null
  body?: PortableTextBlock[] | null
  url?: {current?: string | null; buttonText?: string | null} | null
  order?: number | null
}

export default function Carousel({ slides }: { slides: CarouselSlideQueryItem[] }) {
  const autoplayDelayMs = 5000
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null)
  const progressCircle = useRef<SVGSVGElement | null>(null)
  const progressContent = useRef<HTMLSpanElement | null>(null)

  const setPausedDisplay = () => {
    progressCircle.current?.style.setProperty('--progress', '1')

    if (progressContent.current) {
      progressContent.current.textContent = '||'
    }
  }

  const setRunningDisplay = (time = autoplayDelayMs, progress = 0) => {
    progressCircle.current?.style.setProperty('--progress', String(1 - progress))

    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`
    }
  }

  const onAutoplayTimeLeft = (_swiper: SwiperInstance, time: number, progress: number) => {
    setRunningDisplay(time, progress)
  }

  const toggleAutoplay = () => {
    if (!swiper?.autoplay) return

    if (swiper.autoplay.running) {
      swiper.autoplay.stop()
      setPausedDisplay()
      
      return
    }

    swiper.autoplay.start()
    setRunningDisplay()
  }

  return (
    <div className={styles.carouselRoot}>
      {/* <button type="button" className={styles.toggleButton} onClick={toggleAutoplay}>
        {isAutoplayRunning ? 'Pause autoplay' : 'Start autoplay'}
      </button> */}
      <Swiper
        onSwiper={(instance) => {
          setSwiper(instance)

          if (instance.autoplay.running) {
            setRunningDisplay()
            return
          }

          setPausedDisplay()
        }}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: autoplayDelayMs,
          disableOnInteraction: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        onAutoplayStart={() => {
          setRunningDisplay()
        }}
        onAutoplayStop={() => {
          setPausedDisplay()
        }}
        className={`${styles.mySwiper} lg:aspect-[1920/610] aspect-[5/6]`}
      >
        {slides.map((slide, index) => (
            <SwiperSlide key={slide._id ?? `${slide.order ?? index}`}>
                <div className="hidden lg:block w-full h-full flex">
                    <div
                        className="bg-cover bg-center w-full h-full flex items-center justify-center text-2xl font-bold"
                        style={{backgroundImage: `url(${slide.imageUrl || ''})`}}
                    >
                        <div className="bg-[rgba(0,0,0,0.6)] bg-opacity-75 px-4 py-2 rounded text-white mx-[20%]">
                            <div className="slide-title text-3xl text-center pb-4">{slide.title}</div>
                            <div className="slide-body text-center text-lg px-8">
                                {slide.body && <PortableText value={slide.body} className="" />}
                            </div>
                            {slide.url?.current && (
                                <div className="flex justify-center mt-4">
                                    <Link href={slide.url.current} className="text-lg  hover:text-white transition-colors duration-200 px-4 py-2 rounded-sm text-white bg-blue-600">{slide.url.buttonText}</Link>
                                </div> 
                            )}
                        </div> 
                        
                    </div>
                </div>

                <div className="block lg:hidden w-full h-full flex grid grid-flow-col grid-rows-5">
                    <div
                        className="row-span-2 bg-cover bg-center w-full h-full flex items-center justify-center font-bold"
                        style={{backgroundImage: `url(${slide.mobileImageUrl || slide.imageUrl})`}}
                    >
                    </div>
                    <div className="row-span-3 py-2  justify-center gap-2 px-4">
                        <div className="slide-title text-3xl text-center pb-2">{slide.title}</div>
                        <div className="slide-body text-lg px-8">
                            {slide.body && <PortableText value={slide.body} className="" />}
                        </div>
                        {slide.url?.current && (
                            <div className="flex justify-center mt-4">
                                <Link href={slide.url.current} className="text-lg font-medium hover:text-white transition-colors duration-200 px-4 py-2 rounded-sm text-white bg-blue-600">{slide.url.buttonText}</Link>
                            </div> 
                        )}
                    </div>
                </div>
            </SwiperSlide>
        ))}
        <div onClick={toggleAutoplay} className={styles.autoplayProgress} slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20" />
          </svg>
          <span ref={progressContent} />
        </div>
      </Swiper>
    </div>
  )
}
