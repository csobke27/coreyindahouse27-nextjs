import {NextResponse} from 'next/server'
import { route } from 'sanity/router'

export async function GET() {
  const games = [
    {id: 1, name: 'Fortnite', coverUrl: '/images/game-covers/fortnite.jpg', extensions: []},
    {id: 2, name: 'Dead By Daylight', coverUrl: '/images/game-covers/dead by daylight.jpg', extensions: [
        {
            title: 'Alphabet Challenge',
            description: 'Type in a four-letter word and receive a perk that starts with each letter.',
            note: 'For example, typing in "FAST" might give you the perks "Finesse", "Adrenaline", "Sprint Burst", and "Tenacity".',
            route: '/game-extensions/alphabet-challenge'
        },
        {
            title: 'Chaos Shuffle',
            description: 'Get a randomized set of Dead by Daylight perks to swap to before loading into your next match.',
            note: 'This is available for both survivors and killers.',
            route: '/game-extensions/chaos-shuffle'
        }
    ]},
    {id: 3, name: 'Phasmophobia', coverUrl: '/images/game-covers/phasmophobia.png', extensions: []},
  ]

  return NextResponse.json(games)
}
