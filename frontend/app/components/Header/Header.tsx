import { settingsQuery } from '@/sanity/lib/queries'
import { sanityFetch } from '@/sanity/lib/live'

import HeaderClient from './HeaderClient'

const navigation = [
  { name: 'About', href: '/about', current: false },
  { name: 'Blog', href: '/blog', current: false },
  { name: 'Content', href: '/content', current: false },
  { name: 'Merch', href: '/merch', current: false },
  { name: 'Game Extensions', href: '/game-extensions', current: false },
]

export default async function Header() {
  const { data: settings } = await sanityFetch({
    query: settingsQuery,
  })

  return <HeaderClient siteTitle={settings?.title || 'CoreyInDaHouse27'} navigation={navigation} />
}
