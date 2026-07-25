'use client'

import {useState} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {usePathname} from 'next/navigation'

import styles from './Header.module.css'

type NavigationItem = {
  name: string
  href: string
  current?: boolean
}

type HeaderClientProps = {
  siteTitle: string
  navigation: NavigationItem[]
}

export default function HeaderClient({siteTitle, navigation}: HeaderClientProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev)
  }

  return (
    <div className={`py-5 flex flex-col w-full ${styles.headerNavbar} px-4 text-slate-200`}>
      <nav className="w-full flex items-center justify-between">
        <Link
          href="/"
          className="font-bold text-xl tracking-wide hover:tracking-widest transition-all ease-in-out duration-700 flex items-center space-x-2 pr-4"
        >
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={45}
            height={45}
            className="d-inline-block align-text-top"
          />
          <span className="text-black">{siteTitle}</span>
        </Link>

        <div className="hidden md:flex items-center">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-md font-medium hover:text-white transition-colors duration-200 px-4 py-2 rounded-sm ${
                pathname === item.href ? 'text-white bg-purple-600' : 'text-black'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <button
          type="button"
          onClick={toggleMenu}
          className="md:hidden flex items-center relative z-20 touch-manipulation"
          aria-label="Toggle mobile menu"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={!isMenuOpen ? 2 : 3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      <div
        id="mobile-menu"
        className={`mobile-menu w-full md:hidden overflow-hidden transition-[max-height,opacity,padding] duration-300 ease-in-out ${
          isMenuOpen
            ? 'max-h-[70vh] opacity-100 px-4 pt-3 pb-3 pointer-events-auto'
            : 'max-h-0 opacity-0 px-4 pt-0 pb-0 pointer-events-none'
        }`}
        aria-hidden={!isMenuOpen}
      >
        <div className="flex flex-col items-center space-y-2 text-md">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => {
                setIsMenuOpen(false)
              }}
              className={`block w-full text-center font-medium text-md py-2 rounded-sm hover:text-white transition-colors duration-200 ${
                pathname === item.href ? 'text-white bg-purple-600' : 'text-black'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}