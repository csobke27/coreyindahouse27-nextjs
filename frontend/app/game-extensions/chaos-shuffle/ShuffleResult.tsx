import { useState } from "react";

import Image from '@/app/components/SanityImage'
import NextImage from 'next/image'
import CustomPortableText from '@/app/components/PortableText'
import type { PortableTextBlock } from 'next-sanity'
// import { set } from "date-fns";

interface ShuffleResultProps {
    playerName: string;
    perks: DbdPerk[];
}

type SanityImageValue = {
    asset?: {
        _ref?: string;
    };
    hotspot?: {
        x: number;
        y: number;
    };
    crop?: {
        top: number;
        bottom: number;
        left: number;
        right: number;
    };
    alt?: string;
}

type DbdPerk = {
    _id: string;
    perkName: string;
    description: PortableTextBlock[];
    type: string;
    character: {
        _id: string;
        name: string;
    } | null;
    perkImage: string | SanityImageValue;
}

interface ShuffleResultProps {
    playerName: string;
    perks: DbdPerk[];
    visible: boolean;
}

export function ShuffleResult({ playerName, perks, visible }: ShuffleResultProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [selectedPerk, setSelectedPerk] = useState<DbdPerk | null>(null);

    
    const displayPerkDetails = (perk: DbdPerk) => {
        if(selectedPerk?._id === perk._id) {
            setIsMenuOpen((prev) => !prev)
            console.log("Closing menu");
        } else {
            setSelectedPerk(perk);
            setIsMenuOpen(true);
            console.log("Opening menu for perk:", perk);
        }
    }

    const renderPerkImage = (perk: DbdPerk) => {
        if (typeof perk.perkImage === 'string') {
            if (perk.perkImage.startsWith('image-')) {
                return (
                    <Image
                        id={perk.perkImage}
                        alt={perk.perkName}
                        width={240}
                        height={160}
                        loading="eager"
                        fetchPriority="high"
                        mode="cover"
                        className="w-full h-32 object-cover mb-2 rounded"
                    />
                );
            }

            return (
                <NextImage
                    src={perk.perkImage}
                    alt={perk.perkName}
                    width={240}
                    height={160}
                    priority
                    loading="eager"
                    className="w-full h-32 object-cover mb-2 rounded"
                />
            );
        }

        if (!perk.perkImage?.asset?._ref) {
            return null;
        }

        return (
            <Image
                id={perk.perkImage.asset._ref}
                alt={perk.perkImage.alt || perk.perkName}
                width={256}
                height={256}
                loading="eager"
                fetchPriority="high"
                crop={perk.perkImage.crop}
                hotspot={perk.perkImage.hotspot}
                mode="cover"
                className="w-full h-full mb-2 rounded"
            />
        );
    }

    return (
        <>
        <div
            className="max-w-7xl mx-auto px-4 text-center mb-6"
            style={
                visible
                    ? {opacity: 0, animation: 'shuffleResultFadeIn 350ms ease-out 200ms forwards'}
                    : {opacity: 0}
            }
        >
            <h1 className="text-2xl font-bold mb-2 text-white">{playerName}&apos;s Perks:</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
                {perks.map((perk) => (
                    <div onClick={() => displayPerkDetails(perk)} key={perk._id} className={`aspect-1/1 p-4 rounded-lg object-cover items-center ${selectedPerk?._id === perk._id && isMenuOpen ? 'border-4 border-blue-500' : 'border-2 border-[rgba(255,255,255,0.2)]'} cursor-pointer bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.2)] transition-colors`}>
                        {renderPerkImage(perk)}
                        <h2 className="text-lg font-bold text-white">{perk.perkName}</h2>
                    </div>
                ))}
            </div>
            <div className={`bg-[#232323] text-white mobile-menu w-full overflow-hidden transition-[max-height,opacity,padding] duration-300 ease-in-out ${
                isMenuOpen
                    ? 'max-h-[70vh] opacity-100 px-4 pt-3 pb-3 pointer-events-auto'
                    : 'max-h-0 opacity-0 px-4 pt-0 pb-0 pointer-events-none'
                }`}
                aria-hidden={!isMenuOpen}>
                {selectedPerk && (
                    <div className="text-left">
                        <h3 className="text-xl font-bold mb-1">{selectedPerk.perkName}</h3>
                        <h5 className="font-semibold mb-3 italic">{selectedPerk.character?.name || 'General'} Perk</h5>
                        <div className="prose prose-invert max-w-none text-sm">
                            <CustomPortableText value={selectedPerk.description} />
                        </div>
                    </div>
                )}
            </div>
            <style jsx>{`
                @keyframes shuffleResultFadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(12px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
        </>
    )
}