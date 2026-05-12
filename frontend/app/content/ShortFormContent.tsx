'use client';

import { useState } from "react";
import ContentSlide from "./ContentSlide";

export default function ShortFormContent() {
    const [activeSlide, setActiveSlide] = useState<number | null>(null);

    function handleSlideClick(index:number) {
        setActiveSlide(index === activeSlide ? null : index);
    }

    return (
        <div className="slider flex flex-col md:flex-row items-start gap-4 md:gap-0">
            <ContentSlide
                isActive={activeSlide === 0}
                onClick={() => handleSlideClick(0)}
                bgClass="bg-[#000000]"
                iconClass="fa-brands fa-tiktok"
                label="TikTok"
            >
                <p className="name text-white">Subscribe to my TikTok for short-form videos and updates!</p>
                <a href="https://tiktok.com/@coreyindahouse27" target="_blank" className="mt-4 px-4 py-2 bg-[#69C9D0] text-white rounded-lg hover:bg-[#69C9D0]/90 transition-colors duration-300 inline-block">
                  Visit TikTok Profile
                </a>
            </ContentSlide>

            <ContentSlide
                isActive={activeSlide === 1}
                onClick={() => handleSlideClick(1)}
                bgClass="bg-[#3b5998]"
                iconClass="fa-brands fa-facebook"
                label="Facebook"
            >
                <p className="name text-white">Follow my Facebook page for the latest updates and community interactions!</p>
                <a href="https://www.facebook.com/Coreyindahouse27" target="_blank" className="mt-4 px-4 py-2 bg-[#69C9D0] text-white rounded-lg hover:bg-[#69C9D0]/90 transition-colors duration-300 inline-block">
                  Visit Facebook Page
                </a>
            </ContentSlide>

            <ContentSlide
                isActive={activeSlide === 2}
                onClick={() => handleSlideClick(2)}
                bgClass="bg-[linear-gradient(45deg,#f09433_0%,#e6683c_25%,#dc2743_50%,#cc2366_75%,_#bc1888_100%)]"
                iconClass="fa-brands fa-instagram"
                label="Instagram"
            >
                <p className="name text-white">Subscribe to my Instagram for photos, stories, and more!</p>
                <a href="https://www.instagram.com/Coreyindahouse27" target="_blank" className="mt-4 px-4 py-2 bg-[#bc1888] text-white rounded-lg hover:bg-[#6d004b]/90 transition-colors duration-300 inline-block">
                  Visit Instagram Profile
                </a>
            </ContentSlide>

            <ContentSlide
                isActive={activeSlide === 3}
                onClick={() => handleSlideClick(3)}
                bgClass="bg-[#000000]"
                iconClass="fa-brands fa-x-twitter"
                label="Twitter / X"
            >
                <p className="name text-white">Follow my X page for the latest updates and community interactions!</p>
                <a href="https://x.com/dahouse27" target="_blank" className="mt-4 px-4 py-2 bg-[#69C9D0] text-white rounded-lg hover:bg-[#69C9D0]/90 transition-colors duration-300 inline-block">
                  Visit X Profile
                </a>
            </ContentSlide>
        </div>
    )
}