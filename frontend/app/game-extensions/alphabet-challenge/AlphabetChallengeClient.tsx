'use client'

// import { CharacterForm } from "./CharacterForm";
// import { ShuffleResult } from "./ShuffleResult";
import { useState } from "react";

import type { PortableTextBlock } from 'next-sanity'
import { useLayoutHeights } from "../useLayoutHeights";
import { ShuffleResult } from "../chaos-shuffle/ShuffleResult";

import { sleep } from "@/app/universal/universalFunctions";

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

interface ChaosShuffleClientProps {
    // survivorList: DbdCharacter[];
    survivorPerks: DbdPerk[];
    // killerList: DbdCharacter[];
    killerPerks: DbdPerk[];
}

type PlayerType = "survivor" | "killer";

type AlphabetChallengeFormValues = {
    playerType: PlayerType;
    shouldShuffle: boolean;
    word: string;
}

const FORM_FIELDS = {
    playerType: "player-type",
    shuffleOption: "shuffle-option",
    word: "insert-word",
} as const;

function parseAlphabetChallengeFormData(formData: FormData): AlphabetChallengeFormValues {
    const rawPlayerType = formData.get(FORM_FIELDS.playerType);
    const rawWord = formData.get(FORM_FIELDS.word);

    if (rawPlayerType !== "survivor" && rawPlayerType !== "killer") {
        throw new Error("Missing or invalid player type.");
    }

    if (typeof rawWord !== "string") {
        throw new Error("Missing challenge word.");
    }

    return {
        playerType: rawPlayerType,
        shouldShuffle: formData.get(FORM_FIELDS.shuffleOption) === "shuffle",
        word: rawWord.trim().slice(0, 4).toUpperCase(),
    };
}



export default function AlphabetChallengeClient({ survivorPerks, killerPerks }: ChaosShuffleClientProps) {

    const [isProcessing, setIsProcessing] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);

    const [perkOptions, setPerkOptions] = useState<{letter: string, validPerks: DbdPerk[] }[]>([]);
    const [perksForChallenge, setPerksForChallenge] = useState<DbdPerk[]>([]);

    useLayoutHeights();

    const clearPerkOptions = () => {
        setPerkOptions([]);
    };

    const clearPerksForChallenge = () => {
        setPerksForChallenge([]);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        setIsProcessing(true);
        try {
            await sleep(2000);
            clearPerkOptions();
            clearPerksForChallenge();
            const formData = new FormData(form);
            const values = parseAlphabetChallengeFormData(formData);
            // console.log("form values:", values);
            const letters = values.word.split("");
            const validPerks = getValidPerksForLetters(values.playerType, letters);
            // console.log("valid perks:", validPerks);
            setPerkOptions(validPerks);
            if(values.shouldShuffle){
                const randomPerks = getRandomPerks(validPerks);
                // console.log("random perks:", randomPerks);
                if(randomPerks.length === letters.length) {
                    setPerksForChallenge(randomPerks);
                }
            }
        } finally {
            setIsProcessing(false);
        }
    };

    const getValidPerksForLetters = (playerType: PlayerType, letters: string[]): {letter: string, validPerks: DbdPerk[] }[] => {
        const allPerkList = playerType === "survivor" ? survivorPerks : killerPerks;
        const validPerksForLetters: {letter: string, validPerks: DbdPerk[] }[] = [];
        for (const letter of letters) {
            const matchingPerks = allPerkList.filter((perk) => perk.perkName.toUpperCase().startsWith(letter));
            validPerksForLetters.push({ letter, validPerks: matchingPerks });
        }
        return validPerksForLetters;
    };

    const getRandomPerks = (availablePerks: {letter: string, validPerks: DbdPerk[] }[]) => {
        const randomPerks: DbdPerk[] = [];
        for (const [index, { letter, validPerks }] of availablePerks.entries()) {
            // Remove already selected perks from the validPerks array to avoid duplicates
            for(const perk of randomPerks){
                const index = validPerks.indexOf(perk);
                if(index !== -1){
                    validPerks.splice(index, 1);
                }
            }
            if (validPerks.length > 0) {
                const randomIndex = Math.floor(Math.random() * validPerks.length);
                randomPerks.push(validPerks[randomIndex]);
            } else {
                alert(`No valid perks found for letter "${letter}" in the ${index + 1}${indexSuffix(index)} spot of your word. Please try a different word.`);
                break;
            }
        }
        return randomPerks;
    };

    const indexSuffix = (index: number) => {
        const suffixes = ["st", "nd", "rd"];
        return suffixes[index] || "th";
    }

    const handleFormStateChange = (e: React.FormEvent<HTMLFormElement>) => {
        setIsFormValid(e.currentTarget.checkValidity());
    }
    

    return (
        <div className="bg-[url('/images/dbd-alphabet-backdrop.png')] bg-fixed bg-no-repeat bg-cover bg-center">
            <div className="py-12 full-height">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold text-white">Alphabet Challenge</h1>
                </div>
                <div className="flex justify-center px-4 my-10">
                    <div className="form-container w-full max-w-[60rem] border-2 border-[#630000] rounded-lg bg-[#9da4a4] px-4 py-5">
                        <p className="text-left mb-5">Use this form to customize your game experience:</p>
                        <p className="text-left">First, select if you are playing as a Survivor or a Killer.</p>
                        <p className="text-left">Next, choose whether you want a random loadout or the option to select your own.</p>
                        <p className="text-left mb-5">Lastly, insert a word (or up to 4 random letters) that will be used in the challenge. Each letter will correspond to a specific perk for the player to use.</p>

                        <form
                            className="flex flex-col items-center justify-center"
                            name="alphabet-challenge-form"
                            onSubmit={handleSubmit}
                            onInput={handleFormStateChange}
                            onChange={handleFormStateChange}
                        >
                            <label htmlFor="player-type" className="text-left block mb-2 font-bold justify-center flex">Select Player Type:</label>
                            <div className="button-container flex flex-col md:flex-row items-center justify-center mb-5 gap-2 md:gap-0">
                                <div className="flex items-center justify-start w-28 md:w-auto md:mr-4">
                                    <input type="radio" id="survivor" name={FORM_FIELDS.playerType} value="survivor" defaultChecked className="mr-2" />
                                    <label htmlFor="survivor" className="md:mr-4">Survivor</label>
                                </div>
                                <div className="flex items-center justify-start w-28 md:w-auto">
                                    <input type="radio" id="killer" name={FORM_FIELDS.playerType} value="killer" className="mr-2" />
                                    <label htmlFor="killer">Killer</label>
                                </div>
                            </div>

                            <label htmlFor="shuffle-option" className="text-left block mb-2 font-bold justify-center flex">Shuffle Option:</label>
                            <div className="row-span-3 relative flex items-center justify-center rounded-md mb-5">
                                <label className="relative inline-flex cursor-pointer items-center">
                                    <input name={FORM_FIELDS.shuffleOption} id="shuffle-option" type="checkbox" value="shuffle" className="peer sr-only" />
                                    <div className="peer h-6 w-11 rounded-full bg-gray-300 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNENEQ0RDgiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS14Ij48cGF0aCBkPSJNMTggNiA2IDE4Ii8+PHBhdGggZD0ibTYgNiAxMiAxMiIvPjwvc3ZnPg==')] peer-checked:bg-green-500 peer-checked:after:flex peer-checked:after:translate-x-full peer-checked:after:justify-center peer-checked:after:border-white peer-checked:after:content-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMyMkM1NUUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1jaGVjayI+PHBvbHlsaW5lIHBvaW50cz0iMjAgNiA5IDE3IDQgMTIiLz48L3N2Zz4=')]"></div>
                                    <span className="ml-3">Shuffle</span>
                                </label>
                            </div>
                            {/* Possible future option: Adding the character form to select which survivors/killers the player has and does not have */}
                            {/* <CharacterForm
                                id={player.id}
                                name={player.name}
                                playerType="survivor"
                                ownedSurvivors={player.ownedSurvivors}
                                unownedSurvivors={player.unownedSurvivors}
                                onMoveToUnowned={handleMoveToUnowned}
                                onMoveToOwned={handleMoveToOwned}
                                onNameChange={(playerId, newName) => playerNameChange(playerId, "survivor", newName)}
                            /> */}

                            <label htmlFor="insert-word" className="text-left block mb-2 font-bold justify-center flex">Insert word (up to 4 letters):</label>
                            <div className="button-container justify-center flex mb-5">
                                <input type="text" id="insert-word" name={FORM_FIELDS.word} required maxLength={4} className="text-center border-2 invalid:border-[#630000] rounded-lg px-2 py-1" />
                            </div>

                            <div className="justify-center flex mb-5">
                                <button disabled={isProcessing || !isFormValid} type="submit" className="bg-[radial-gradient(circle,#174f61,#0c1e30)] hover:bg-[radial-gradient(circle,#1e5a6b,#0c1e30)] text-white font-bold py-2 px-4 rounded transition-all duration-300 mb-5 disabled:bg-[radial-gradient(circle,#174f61,rgba(12,30,48,0.5))] disabled:hover:bg-[radial-gradient(circle,#1e5a6b,rgba(12,30,48,0.5))]">
                                    {isProcessing ? (
                                        <>
                                            <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                                            Processing…
                                        </>
                                    ) : (
                                        "Get Perks"
                                    )}
                                </button>
                            </div>
                        </form>
                        

                        
                    </div>
                </div>
                {perksForChallenge.length > 0 && <ShuffleResult perks={perksForChallenge} visible={!isProcessing} />}
            </div>
        </div>
    )
}