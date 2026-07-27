'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperInstance } from 'swiper'
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import styles from './styles.module.css';

// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';

type Game = {
    id: string
    name: string
    coverUrl: string
    extensions: {
        title: string
        description: string
        route: string
        note?: string
    }[]
}

export default function GameExtensionsClient({ gameList }: { gameList: Game[] }) {

    const games = gameList ?? []

    const [selectedGame, setSelectedGame] = useState<Game | null>(() => games[0] ?? null)
    const [isSwiperReady, setIsSwiperReady] = useState(false)

    function handleSlideChange(swiper: SwiperInstance) {
        setSelectedGame(games[swiper.activeIndex])
    }

    return (
        <div className="py-12">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <h1 className="text-4xl font-bold ">Game Extensions</h1>
                <p className="mt-4 text-md">Explore the various game extensions I offer to enhance your gaming experience.</p>
                <div className="my-8 relative">
                    {!isSwiperReady && (
                        <div className="h-[430px] flex items-center justify-center rounded-lg border border-gray-300 bg-white/70">
                            <div className="text-sm font-medium text-gray-700">
                                Loading game carousel...
                            </div>
                        </div>
                    )}
                    <Swiper
                        effect={"coverflow"}
                        grabCursor={true}
                        centeredSlides={true}
                        slidesPerView="auto"
                        coverflowEffect={{
                            rotate: 20,
                            stretch: 0,
                            depth: 350,
                            modifier: 1,
                            slideShadows: true
                        }}
                        pagination={true}
                        modules={[EffectCoverflow, Pagination]}
                        className={`${styles.mySwiper} ${isSwiperReady ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'} transition-opacity duration-200`}
                        onSwiper={(swiper) => {
                            setIsSwiperReady(true)
                            setSelectedGame(games[swiper.activeIndex] ?? games[0] ?? null)
                        }}
                        onSlideChange={(slide) => handleSlideChange(slide)}
                    >
                        {games.map((game: Game) => (
                            <SwiperSlide className={styles['swiper-slide']} key={game.id}>
                                <div className={styles['swiper-slide']} id={game.id}>
                                    <div className={styles.picture}>
                                        <Image className={styles['game-cover']} width={260} height={360} src={game.coverUrl} alt={game.name} />
                                    </div>
                                    <div className="py-6 text-center px-5">
                                        <h3 className="font-weight-[600] text-[20px] font-bold">{game.name}</h3>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <div className={`${isSwiperReady ? 'block' : 'hidden'} my-4`}>
                    {selectedGame && selectedGame.extensions.length > 0 ? (
                        <ul className="space-y-2 border-4 border-gray-300 rounded-lg">
                            {selectedGame.extensions.map((extension, index) => (
                                <li className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-200'} p-6`} key={index}>
                                    <h4 className="font-weight-[600] text-[24px] font-bold mb-5">{extension.title}</h4>
                                    <p className="text-left mb-5">{extension.description}</p>
                                    {extension.note && (
                                        <p className="text-left mb-5"><em>{extension.note}</em></p>
                                    )}
                                    <Link href={extension.route} className="text-md font-medium hover:text-white transition-colors duration-200 px-4 py-2 rounded-sm text-white bg-blue-600">Use Extension</Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-center font-bold text-[24px]">No extensions available for this game.</p>
                    )}
                </div>
            </div>
        </div>
    )
}