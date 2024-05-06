'use client'

import Link from 'next/link'
import styled from 'styled-components'
import Center from './Center'
import { useContext, useEffect, useRef, useState } from 'react'
import { useMediaQuery } from '@react-hook/media-query'
import { useCartStore } from '@/store/cartStore'
import Button from './Button'
import { MdClose, MdMenu, MdSearch } from 'react-icons/md'

const StyledHeader = styled.header`
	background-color: #222;
`
const Logo = styled(Link)`
	color: #ffffff;
	text-decoration: none;
`
const Wrapper = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 20px 0;
`
const StyledNav = styled.nav`
	display: flex;
	gap: 15px;
`
/* const Link = styled(Link)`
	color: #aaaaaa;
	text-decoration: none;
` */

const Header = () => {
	const cart = useCartStore()
	const [isMobileNavActive, setIsMobileNavActive] = useState(false)
	const isMdScreen = useMediaQuery('(min-width: 768px)')

	useEffect(() => {
		if (isMobileNavActive) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'auto'
		}

		if (isMdScreen) {
			setIsMobileNavActive(false)
		}

		return () => {
			document.body.style.overflow = 'auto'
		}
	}, [isMobileNavActive, isMdScreen])

	return (
		<div className="fixed bg-[#222] w-screen z-20">
			<Center>
				<div
					className={`flex md:items-center justify-between py-5 ${
						isMobileNavActive ? 'flex-col gap-4 h-full' : ''
					}`}
				>
					<Logo href={'/'}>Ecomm</Logo>
					<nav
						className={`gap-4 md:flex md:static md:p-0 z-20 ${
							isMobileNavActive ? 'flex flex-col p-0' : 'hidden'
						}`}
					>
						<Link
							href={'/'}
							onClick={() => {
								setIsMobileNavActive(false)
							}}
						>
							Home
						</Link>
						<Link
							href={'/products'}
							onClick={() => {
								setIsMobileNavActive(false)
							}}
						>
							All products
						</Link>
						<Link
							href={'/categories'}
							onClick={() => {
								setIsMobileNavActive(false)
							}}
						>
							Categories
						</Link>
						<Link
							href={'/account'}
							onClick={() => {
								setIsMobileNavActive(false)
							}}
						>
							Account
						</Link>
						<Link
							href={'/cart'}
							onClick={() => {
								setIsMobileNavActive(false)
							}}
						>
							Cart ({cart.totalQuantity})
						</Link>
					</nav>
					<div className="flex items-center gap-4">
						<Link
							href={'/search'}
							onClick={() => {
								setIsMobileNavActive(false)
							}}
							className="text-[#aaa] hover:text-white flex items-center"
						>
							<MdSearch size={20} />
						</Link>

						<button
							onClick={() => setIsMobileNavActive(prev => !prev)}
							className={`text-[#aaa] hover:text-white md:hidden z-30 ${
								isMobileNavActive ? 'absolute top-5 right-5' : ''
							}`}
						>
							{isMobileNavActive ? <MdClose size={30} /> : <MdMenu size={30} />}
						</button>
					</div>
				</div>
			</Center>
			<div
				className={`bg-[#222] h-screen ${
					isMobileNavActive ? 'block' : 'hidden'
				}`}
			></div>
		</div>
	)
}

export default Header
