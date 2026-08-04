import AlphabetChallengeClient from "./AlphabetChallengeClient";
import { client } from "@/sanity/lib/client";
import { unstable_cache } from "next/cache";
import type { PortableTextBlock } from 'next-sanity'

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

const SURVIVOR_PERK_QUERY = `*[_type == "dbdPerk" && type == "survivor"]{
        _id,
        perkName,
        description,
        type,
        character->{_id, name},
        perkImage
    }`

const KILLER_PERK_QUERY = `*[_type == "dbdPerk" && type == "killer"]{
        _id,
        perkName,
        description,
        type,
        character->{_id, name},
        perkImage
    }`

const options = { next: { revalidate: 60 * 10 } };

const getSurvivorPerks = unstable_cache(
    async () => client.fetch<DbdPerk[]>(SURVIVOR_PERK_QUERY, {}, options),
    ["chaos-shuffle-survivor-perks"],
    { revalidate: 60 * 10 }
);

const getKillerPerks = unstable_cache(
    async () => client.fetch<DbdPerk[]>(KILLER_PERK_QUERY, {}, options),
    ["chaos-shuffle-killer-perks"],
    { revalidate: 60 * 10 }
);

export default async function ChaosShufflePage() {

    const [survivorPerks, killerPerks] = await Promise.all([
        getSurvivorPerks(),
        getKillerPerks(),
    ]);

    return <AlphabetChallengeClient survivorPerks={survivorPerks} killerPerks={killerPerks} />
}