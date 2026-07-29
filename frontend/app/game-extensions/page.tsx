import { client } from "@/sanity/lib/client";
import GameExtensionsClient from "./GameExtensionsClient";
import { unstable_cache } from "next/cache";


type GameExtensionGame = {
    id: string;
    name: string;
    coverUrl: string;
    extensions: {
        title: string;
        description: string;
        note: string;
        route: string;
    }[];
};

const GAME_QUERY = `*[_type == "gameExtensionGames" && isActive == true] | order(order asc){
        "id": _id,
        "name": gameName,
        "coverUrl": gameCoverImage.asset->url,
        "extensions": *[
            _type == "gameExtension" &&
            isActive == true &&
            references(^._id)
        ] | order(title asc) {
            title,
            "description": pt::text(description),
            note,
            route
        }
    }`

const options = { next: { revalidate: 60 * 10 } };

const getGameList = unstable_cache(
    async () => client.fetch<GameExtensionGame[]>(GAME_QUERY, {}, options),
    ["game-extension-game-list"],
    { revalidate: 60 * 10 }
);

export default async function GameExtensionsPage() {

    const gameList = await getGameList();
    return <GameExtensionsClient gameList={gameList} />
}