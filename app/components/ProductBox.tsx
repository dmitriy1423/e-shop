'use client'

import { Product } from '@prisma/client'
import Image from 'next/image'
import { FC, useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import Button from './Button'
import { FaCartArrowDown, FaHeart, FaRegHeart } from 'react-icons/fa'
import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'
import { MdOutlineHeartBroken, MdOutlineImage } from 'react-icons/md'
import { motion } from 'framer-motion'
import { FaHeartCirclePlus } from 'react-icons/fa6'
import axios from 'axios'
import { SafeUser } from '@/types'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const ProductWrapper = styled.div``

const WhiteBox = styled.div`
	background-color: #ffffff;
	padding: 20px;
	text-align: center;
	border-radius: 10px;
`
const Title = styled(Link)`
	font-weight: normal;
	font-size: 1rem;
	margin: 0;
`
const ProductInfoBox = styled.div`
	margin-top: 5px;
`
const PriceRow = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-top: 2px;
`
const Price = styled.div`
	font-size: 1.5rem;
	font-weight: 700;
`

interface ProductBoxProps {
	product: Product
	wished?: boolean
	user: SafeUser | null
	onRemoveFromWishlist?: (id: string) => void
}

const ProductBox: FC<ProductBoxProps> = ({
	product,
	wished,
	user,
	onRemoveFromWishlist = (id: string) => {}
}) => {
	const cart = useCartStore()
	const router = useRouter()
	const [isWished, setIsWished] = useState(wished)

	const addToWishlist = (e: any) => {
		e.preventDefault()
		e.stopPropagation()
		const nextVal = !isWished
		if (nextVal === false && onRemoveFromWishlist) {
			onRemoveFromWishlist(product.id)
		}
		axios
			.post('/api/wishlist', {
				productId: product.id
			})
			.then(response => {})
		setIsWished(nextVal)
	}

	return (
		<ProductWrapper>
			<button
				onClick={e => {
					addToWishlist(e)
					if (!user) {
						toast(
							'Войдите или зарегистрируйтесь, чтобы добавлять товары в избранное'
						)
						router.push('/account')
					}
				}}
				className={`text-black absolute top-5 right-5 z-20 p-2 hover:text-red-500 ${
					isWished === true ? 'text-red-500' : ''
				}`}
			>
				{isWished === true ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
			</button>
			<Link href={`/product/${product.id}`}>
				<WhiteBox>
					<div className="aspect-square overflow-hidden relative">
						{product.images.length > 0 ? (
							<Image
								src={product.images[0]}
								alt={product.title}
								fill
								className="object-contain"
							/>
						) : (
							<MdOutlineImage className="w-full h-full" />
						)}
					</div>
				</WhiteBox>
			</Link>
			<div className="flex flex-col items-center gap-2">
				<Link href={`/product/${product.id}`}>{product.title}</Link>
				<div className="flex flex-col w-full items-center justify-between sm:flex-row">
					<Price>${product.price}</Price>
					<div className="w-full sm:w-auto">
						<Button
							onClick={() => {
								cart.addToCart(product)
							}}
							label="Add to cart"
							small
							outline
						/>
					</div>
				</div>
			</div>
		</ProductWrapper>
	)
}

export default ProductBox
