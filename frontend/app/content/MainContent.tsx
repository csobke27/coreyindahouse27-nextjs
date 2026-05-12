'use client';

import { useState } from "react";
import ContentSlide from "./ContentSlide";

type MainContentProps = {
    youtubeSubscribers: string | null,
    videoId: string,
    videoTitle: string
}

export default function MainContent({youtubeSubscribers, videoId, videoTitle}: MainContentProps) {
    const [activeSlide, setActiveSlide] = useState<number | null>(null);

    function handleSlideClick(index:number) {
        setActiveSlide(index === activeSlide ? null : index);
    }

    return (
        <div className="slider flex flex-col md:flex-row items-start gap-4 md:gap-0">
            <ContentSlide
                isActive={activeSlide === 0}
                onClick={() => handleSlideClick(0)}
                bgClass="bg-[#ff0000]"
                iconClass="fa-brands fa-youtube"
                label="YouTube"
                position="top"
            >
                <p className="name text-white">Subscribe to my YouTube channel for gaming videos and live streams!</p>
                <p className="description text-white">Subscribers: {youtubeSubscribers ?? 'Unavailable'}</p>
                <p className="description text-white font-bold text-2xl mt-4">{videoTitle}</p>
                <iframe className="my-4 px-4 rounded-lg block mx-auto aspect-video max-w-[85%]"  src={`https://www.youtube.com/embed/${videoId}`} title="YouTube video player" frameBorder="0" allow="encrypted-media; picture-in-picture" allowFullScreen></iframe>
                <a href="https://www.youtube.com/@CoreyInDaHouse27?sub_confirmation=1" target="_blank" className="mb-4 px-4 py-2 bg-[#007bff] text-white rounded-lg hover:bg-[#007bff]/90 transition-colors duration-300 inline-block">
                  Visit YouTube Channel
                </a>
            </ContentSlide>

            <ContentSlide
                isActive={activeSlide === 1}
                onClick={() => handleSlideClick(1)}
                bgClass="bg-[#9146FF]"
                iconClass="fa-brands fa-twitch"
                label="Twitch"
                position="top"
            >
                <p className="name text-white">Follow my Twitch channel for live gaming, jumpscares, and humorous content!</p>
                <iframe className="my-4 px-4 rounded-lg block mx-auto aspect-video max-w-[85%]" src={`https://player.twitch.tv/?channel=coreyindahouse27&parent=localhost`} title="Twitch stream player" allowFullScreen></iframe>
                <a href="https://twitch.tv/CoreyInDaHouse27" target="_blank" className="mb-4 px-4 py-2 bg-[#007bff] text-white rounded-lg hover:bg-[#007bff]/90 transition-colors duration-300 inline-block">
                  Visit Twitch Channel
                </a>
            </ContentSlide>
        </div>
    )
}