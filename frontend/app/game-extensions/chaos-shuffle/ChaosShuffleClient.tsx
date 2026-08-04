'use client'

import { CharacterForm } from "./CharacterForm";
import { ShuffleResult } from "./ShuffleResult";
import { useState } from "react";

import type { PortableTextBlock } from 'next-sanity'
import { useLayoutHeights } from "../useLayoutHeights";

type DbdCharacter = {
    _id: string;
    name: string;
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

interface ChaosShuffleClientProps {
    survivorList: DbdCharacter[];
    survivorPerks: DbdPerk[];
    killerList: DbdCharacter[];
    killerPerks: DbdPerk[];
}

type SurvivorPlayer = {
    id: string;
    name: string;
    ownedSurvivors: DbdCharacter[];
    unownedSurvivors: DbdCharacter[];
    perks: DbdPerk[];
    visible: boolean;
}

type KillerPlayer = {
    id: string;
    name: string;
    ownedKillers: DbdCharacter[];
    unownedKillers: DbdCharacter[];
    perks: DbdPerk[];
    visible: boolean;
}



export default function ChaosShuffleClient({ survivorList, survivorPerks, killerList, killerPerks }: ChaosShuffleClientProps) {
    console.log("number of perks:", survivorPerks.length, killerPerks.length);
    const maxSurvivors = 4;
    const maxKillers = 1;

    const [survivorPlayers, setSurvivorPlayers] = useState<SurvivorPlayer[]>([]);

    const [killerPlayers, setKillerPlayers] = useState<KillerPlayer[]>([]);

    const [isProcessing, setIsProcessing] = useState(false);

    useLayoutHeights();
    
    function handleAddPlayer(playerType: "survivor" | "killer") {
        // Logic to add a player to the shuffle configuration
        let maxPlayers = 0;
        let playerArray: SurvivorPlayer[] | KillerPlayer[] = [];
        if(playerType === "survivor"){
            playerArray = survivorPlayers;
            maxPlayers = maxSurvivors;
        } else if(playerType === "killer"){
            playerArray = killerPlayers;
            maxPlayers = maxKillers;
        }
        if(playerArray.length < maxPlayers){
            if(playerType === "survivor"){
                const newSurvivorPlayer: SurvivorPlayer = {
                    id: `survivor-${playerArray.length + 1}`,
                    name: `Survivor ${playerArray.length + 1}`,
                    ownedSurvivors: survivorList,
                    unownedSurvivors: [],
                    perks: [],
                    visible: false
                };
                setSurvivorPlayers([...survivorPlayers, newSurvivorPlayer]);
            } else if(playerType === "killer"){
                const newKillerPlayer: KillerPlayer = {
                    id: `killer-${playerArray.length + 1}`,
                    name: `Killer ${playerArray.length + 1}`,
                    ownedKillers: killerList,
                    unownedKillers: [],
                    perks: [],
                    visible: false
                };
                setKillerPlayers([...killerPlayers, newKillerPlayer]);
            }
        } else {
            alert(`You can only add up to ${maxPlayers} ${playerType}(s).`);
        }
    }

    const playerNameChange = (playerId: string, playerType: "survivor" | "killer", newName: string) => {
        if(playerType === "survivor"){
            setSurvivorPlayers((prevPlayers) =>
                prevPlayers.map((player) => {
                    if (player.id === playerId) {
                        return { ...player, name: newName };
                    }
                    return player;
                })
            );
        } else if(playerType === "killer"){
            setKillerPlayers((prevPlayers) =>
                prevPlayers.map((player) => {
                    if (player.id === playerId) {
                        return { ...player, name: newName };
                    }
                    return player;
                })
            );
        }
    }

    const handleMoveToUnowned = (playerId: string, characterId: string, playerType: "survivor" | "killer") => {
        if (playerType === "survivor") {
            setSurvivorPlayers((prevPlayers) =>
                prevPlayers.map((player) => {
                    if (player.id !== playerId) {
                        return player;
                    }

                    const survivorToMove = player.ownedSurvivors.find((survivor) => survivor._id === characterId);

                    if (!survivorToMove) {
                        return player;
                    }

                    return {
                        ...player,
                        ownedSurvivors: player.ownedSurvivors.filter((survivor) => survivor._id !== characterId),
                        unownedSurvivors: [...player.unownedSurvivors, survivorToMove].sort((a, b) => a.name.localeCompare(b.name)),
                    };
                })
            );
            return;
        }

        setKillerPlayers((prevPlayers) =>
            prevPlayers.map((player) => {
                if (player.id !== playerId) {
                    return player;
                }

                const killerToMove = player.ownedKillers.find((killer) => killer._id === characterId);

                if (!killerToMove) {
                    return player;
                }

                return {
                    ...player,
                    ownedKillers: player.ownedKillers.filter((killer) => killer._id !== characterId),
                    unownedKillers: [...player.unownedKillers, killerToMove].sort((a, b) => a.name.localeCompare(b.name)),
                };
            })
        );
    }

    const handleMoveToOwned = (playerId: string, characterId: string, playerType: "survivor" | "killer") => {
        if (playerType === "survivor") {
            setSurvivorPlayers((prevPlayers) =>
                prevPlayers.map((player) => {
                    if (player.id !== playerId) {
                        return player;
                    }

                    const survivorToMove = player.unownedSurvivors.find((survivor) => survivor._id === characterId);

                    if (!survivorToMove) {
                        return player;
                    }

                    return {
                        ...player,
                        ownedSurvivors: [...player.ownedSurvivors, survivorToMove].sort((a, b) => a.name.localeCompare(b.name)),
                        unownedSurvivors: player.unownedSurvivors.filter((survivor) => survivor._id !== characterId),
                    };
                })
            );
            return;
        }

        setKillerPlayers((prevPlayers) =>
            prevPlayers.map((player) => {
                if (player.id !== playerId) {
                    return player;
                }

                const killerToMove = player.unownedKillers.find((killer) => killer._id === characterId);

                if (!killerToMove) {
                    return player;
                }

                return {
                    ...player,
                    ownedKillers: [...player.ownedKillers, killerToMove].sort((a, b) => a.name.localeCompare(b.name)),
                    unownedKillers: player.unownedKillers.filter((killer) => killer._id !== characterId),
                };
            })
        );
    }

    const reindexPlayers = <T extends { id: string; name: string }>(players: T[]) => {
        return players.map((player) => ({
            ...player,
            // name: `${type === "survivor" ? "Survivor" : "Killer"} ${index + 1}`,
        }));
    }

    const removePlayer = (playerToRemove: SurvivorPlayer | KillerPlayer) => {
        if(playerToRemove.id.includes("survivor")){
            const survivors = survivorPlayers.filter((player) => player.id !== playerToRemove.id);
            setSurvivorPlayers(reindexPlayers(survivors));
        } else if(playerToRemove.id.includes("killer")){
            const killers = killerPlayers.filter((player) => player.id !== playerToRemove.id);
            setKillerPlayers(reindexPlayers(killers));
        }
    }

    const pickRandomPerks = (perks: DbdPerk[], count: number): DbdPerk[] => {
        const shuffled = [...perks];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled.slice(0, count);
    }

    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    const getShufflePerks = async () => {
        const PER_PLAYER_DELAY_MS = 1000;

        clearPerks();
        setIsProcessing(true);

        await sleep(2000);

        for (const player of survivorPlayers) {
            const availablePerks = survivorPerks.filter((perk) =>
                perk.character === null || player.ownedSurvivors.some((survivor) => survivor._id === perk.character?._id)
            );

            setSurvivorPlayers((prev) =>
                prev.map((currentPlayer) =>
                    currentPlayer.id === player.id
                        ? { ...currentPlayer, perks: pickRandomPerks(availablePerks, 4), visible: true }
                        : currentPlayer
                )
            );

            await sleep(PER_PLAYER_DELAY_MS);
        }

        for (const player of killerPlayers) {
            const availablePerks = killerPerks.filter((perk) =>
                perk.character === null || player.ownedKillers.some((killer) => killer._id === perk.character?._id)
            );

            setKillerPlayers((prev) =>
                prev.map((currentPlayer) =>
                    currentPlayer.id === player.id
                        ? { ...currentPlayer, perks: pickRandomPerks(availablePerks, 4), visible: true }
                        : currentPlayer
                )
            );

            await sleep(PER_PLAYER_DELAY_MS);
        }

        setIsProcessing(false);
        
    }

    const clearPerks = () => {
        setSurvivorPlayers((prev) => prev.map((player) => ({ ...player, perks: [], visible: false })));
        setKillerPlayers((prev) => prev.map((player) => ({ ...player, perks: [], visible: false })));
    }

    return (
        <div className="bg-[url('/images/dbd-forest-background.jpg')] bg-fixed bg-no-repeat bg-cover bg-center">
            <div className="py-12 full-height">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold text-white">Chaos Shuffle</h1>
                </div>
                <div className="flex justify-center px-4 my-10">
                    <div className="shuffle-container w-full max-w-[60rem] border-2 border-[#630000] rounded-lg bg-[#9da4a4] px-4 py-5">
                        <p className="text-left mb-5">Use this form to customize your game experience:</p>
                        <div className="text-left mb-5">
                            <span className="font-bold">Survivors:</span> click “Add Survivor” to add up to 4 survivors. 
                            For each survivor, you can select which survivors they own and which they do not own. Any perks tied to an unowned survivor will be excluded from the shuffle.
                        </div>
                        <div className="text-left mb-5">
                            <span className="font-bold">Killers:</span> click “Add Killer” to add a killer. You can select which killers they own and which they do not own. Any perks tied to an unowned killer will be excluded from the shuffle.
                        </div>
                        <p className="text-left">Once you have added your survivors and/or killer, click the “Shuffle Perks” button to receive a randomized set of perks to swap to before loading into your next match.</p>
                        <p className="text-left mb-5"><span className="font-bold italic">Note:</span> DBD perks may change overtime making the descriptions in this tool potentially outdated. Perk descriptions are based on Prestige 3 status and controls are based on PC gameplay.</p>
                        <div className="button-container justify-center flex mb-5">
                            <button disabled={survivorPlayers.length >= maxSurvivors || isProcessing} onClick={() => handleAddPlayer("survivor")} className={`bg-[radial-gradient(circle,#175716,#0c300c)] hover:bg-[radial-gradient(circle,#1e6b1e,#0c300c)] text-white font-bold py-2 px-4 rounded transition-all duration-300 mr-4 disabled:bg-[radial-gradient(circle,#175716,rgba(12,48,12,0.5))] disabled:hover:bg-[radial-gradient(circle,#1e6b1e,rgba(12,48,12,0.5))] ${isProcessing ? 'cursor-not-allowed opacity-50' : ''}`}>
                                Add Survivor
                            </button>
                            <button disabled={killerPlayers.length >= maxKillers || isProcessing} onClick={() => handleAddPlayer("killer")} className={`bg-[radial-gradient(circle,#631717,#300c0c)] hover:bg-[radial-gradient(circle,#6b1e1e,#300c0c)] text-white font-bold py-2 px-4 rounded transition-all duration-300 mr-4 disabled:bg-[radial-gradient(circle,#631717,rgba(48,12,12,0.5))] disabled:hover:bg-[radial-gradient(circle,#6b1e1e,rgba(48,12,12,0.5))] ${isProcessing ? 'cursor-not-allowed opacity-50' : ''}`}>
                                Add Killer
                            </button>
                        </div>
                        {survivorPlayers.map((player) => (
                            <div key={player.id}>
                                <CharacterForm
                                    key={player.id}
                                    id={player.id}
                                    name={player.name}
                                    playerType="survivor"
                                    ownedSurvivors={player.ownedSurvivors}
                                    unownedSurvivors={player.unownedSurvivors}
                                    onMoveToUnowned={handleMoveToUnowned}
                                    onMoveToOwned={handleMoveToOwned}
                                    onNameChange={(playerId, newName) => playerNameChange(playerId, "survivor", newName)}
                                />
                                <div className="justify-center flex mb-5">
                                    <button disabled={isProcessing} onClick={() => removePlayer(player)} className={`bg-[radial-gradient(circle,#631717,#ff0000)] hover:bg-[radial-gradient(circle,#6b1e1e,#d81d1d)] text-white font-bold py-2 px-4 rounded transition-all duration-300 ${isProcessing ? 'cursor-not-allowed opacity-50' : ''}`}>
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}

                        {killerPlayers.map((player) => (
                            <div key={player.id}>
                                <CharacterForm
                                    key={player.id}
                                    id={player.id}
                                    name={player.name}
                                    playerType="killer"
                                    ownedSurvivors={player.ownedKillers}
                                    unownedSurvivors={player.unownedKillers}
                                    onMoveToUnowned={handleMoveToUnowned}
                                    onMoveToOwned={handleMoveToOwned}
                                    onNameChange={(playerId, newName) => playerNameChange(playerId, "killer", newName)}
                                />
                                <div className="justify-center flex mb-5">
                                    <button disabled={isProcessing} onClick={() => removePlayer(player)} className={`bg-[radial-gradient(circle,#631717,#ff0000)] hover:bg-[radial-gradient(circle,#6b1e1e,#d81d1d)] text-white font-bold py-2 px-4 rounded transition-all duration-300 ${isProcessing ? 'cursor-not-allowed opacity-50' : ''}`}>
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}

                        <div className="justify-center flex mb-5">
                            <button disabled={(survivorPlayers.length === 0 && killerPlayers.length === 0) || isProcessing} onClick={getShufflePerks} className="bg-[radial-gradient(circle,#174f61,#0c1e30)] hover:bg-[radial-gradient(circle,#1e5a6b,#0c1e30)] text-white font-bold py-2 px-4 rounded transition-all duration-300 mb-5 disabled:bg-[radial-gradient(circle,#174f61,rgba(12,30,48,0.5))] disabled:hover:bg-[radial-gradient(circle,#1e5a6b,rgba(12,30,48,0.5))]">
                                {isProcessing ? (
                                    <>
                                        <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                                        Processing…
                                    </>
                                ) : (
                                    "Shuffle Perks"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="px-4 my-10">
                    {survivorPlayers.map((player) => (
                        <div key={player.id}>
                            {player.perks.length > 0 && <ShuffleResult playerName={player.name} perks={player.perks} visible={player.visible} />}
                        </div>
                    ))}
                    {killerPlayers.map((player) => (
                        <div key={player.id}>
                            {player.perks.length > 0 && <ShuffleResult playerName={player.name} perks={player.perks} visible={player.visible} />}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

