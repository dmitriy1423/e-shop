'use client'

import Link from 'next/link'
import styled from 'styled-components'
import Center from './Center'
import { useContext, useEffect, useState } from 'react'
import { useMediaQuery } from '@react-hook/media-query'
import { useCartStore } from '@/store/cartStore'
import Button from './Button'
import { MdClose, MdMenu } from 'react-icons/md'

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
const NavLink = styled(Link)`
	color: #aaaaaa;
	text-decoration: none;
`

const Header = () => {
	const cart = useCartStore()
	const [isMobileNavActive, setIsMobileNavActive] = useState(false)
	const isMdScreen = useMediaQuery('(min-width: 768px)')

	useEffect(() => {
		if (isMdScreen) {
			setIsMobileNavActive(false)
		}
	}, [isMdScreen])

	return (
		<div
			className='fixed bg-[#222] w-screen z-20'
			/* style={{
					backgroundColor: '#222',
				}} */
		>
			<Center>
				<div
					className={`flex md:justify-between py-5 ${
						isMobileNavActive ? 'flex-col gap-4 h-full' : ''
					}`}
					/* style={{
							backgroundColor: '#222',
						}} */
				>
					<Logo href={'/'}>Ecomm</Logo>
					<nav
						className={`gap-4 md:flex md:static md:p-0 z-20 ${
							isMobileNavActive ? 'flex flex-col p-0' : 'hidden'
						}`}
					>
						<NavLink
							href={'/'}
							onClick={() => {
								setIsMobileNavActive(false)
							}}
						>
							Home
						</NavLink>
						<NavLink
							href={'/products'}
							onClick={() => {
								setIsMobileNavActive(false)
							}}
						>
							All products
						</NavLink>
						<NavLink
							href={'/categories'}
							onClick={() => {
								setIsMobileNavActive(false)
							}}
						>
							Categories
						</NavLink>
						<NavLink
							href={'/'}
							onClick={() => {
								setIsMobileNavActive(false)
							}}
						>
							Account
						</NavLink>
						<NavLink
							href={'/cart'}
							onClick={() => {
								setIsMobileNavActive(false)
							}}
						>
							Cart ({cart.totalQuantity})
						</NavLink>
					</nav>
					<button
						onClick={() => setIsMobileNavActive(prev => !prev)}
						className='text-white absolute top-5 right-5 md:hidden z-30'
					>
						{isMobileNavActive ? <MdClose size={30} /> : <MdMenu size={30} />}
					</button>
				</div>
			</Center>
		</div>
	)
}

export default Header
