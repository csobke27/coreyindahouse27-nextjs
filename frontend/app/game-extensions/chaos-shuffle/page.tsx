import ChaosShuffleClient from "./ChaosShuffleClient";
import { client } from "@/sanity/lib/client";
import { unstable_cache } from "next/cache";
import type { PortableTextBlock } from 'next-sanity'

type DbdCharacter = {
    _id: string;
    name: string;
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
    perkImage: string;
}

const SURVIVOR_QUERY = `*[_type == "dbdCharacter" && type == "survivor"] | order(name asc){
        _id,
        name
    }`

const SURVIVOR_PERK_QUERY = `*[_type == "dbdPerk" && type == "survivor"]{
        _id,
        perkName,
        description,
        type,
        character->{_id, name},
        perkImage
    }`

const KILLER_QUERY = `*[_type == "dbdCharacter" && type == "killer"] | order(name asc){
        _id,
        name
    }`

const KILLER_PERK_QUERY = `*[_type == "dbdPerk" && type == "killer"]{
        _id,
        perkName,
        description,
        type,
        character->{_id, name},
        perkImage
    }`

const options = { next: { revalidate: 60 * 60 } };

const getSurvivorList = unstable_cache(
    async () => client.fetch<DbdCharacter[]>(SURVIVOR_QUERY, {}, options),
    ["chaos-shuffle-survivor-list"],
    { revalidate: 60 * 60 }
);

const getSurvivorPerks = unstable_cache(
    async () => client.fetch<DbdPerk[]>(SURVIVOR_PERK_QUERY, {}, options),
    ["chaos-shuffle-survivor-perks"],
    { revalidate: 60 * 60 }
);

const getKillerList = unstable_cache(
    async () => client.fetch<DbdCharacter[]>(KILLER_QUERY, {}, options),
    ["chaos-shuffle-killer-list"],
    { revalidate: 60 * 60 }
);

const getKillerPerks = unstable_cache(
    async () => client.fetch<DbdPerk[]>(KILLER_PERK_QUERY, {}, options),
    ["chaos-shuffle-killer-perks"],
    { revalidate: 60 * 60 }
);

export default async function ChaosShufflePage() {

    const [survivorList, survivorPerks, killerList, killerPerks] = await Promise.all([
        getSurvivorList(),
        getSurvivorPerks(),
        getKillerList(),
        getKillerPerks(),
    ]);

    return <ChaosShuffleClient survivorList={survivorList} survivorPerks={survivorPerks} killerList={killerList} killerPerks={killerPerks} />
}