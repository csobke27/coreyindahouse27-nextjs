import GameExtensionsClient from "./GameExtensionsClient";

export default async function GameExtensionsPage() {
    // try {
    //     const response = await fetch('/api/gameList')
    //     const data = await response.json()
    //     console.log(data)
    // } catch (error) {
    //     console.error('Error fetching games:', error)
    // }

    return <GameExtensionsClient />
}