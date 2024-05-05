'use client'

import { Product } from '@prisma/client'
import Image from 'next/image'
import { FC, useContext } from 'react'
import styled from 'styled-components'
import Button from './Button'
import { FaCartArrowDown } from 'react-icons/fa'
import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'
import { MdOutlineImage } from 'react-icons/md'

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
}

const ProductBox: FC<ProductBoxProps> = ({ product }) => {
	/* const { addProduct } = useContext(CartContext) */
	const cart = useCartStore()

	return (
		<ProductWrapper>
			<Link href={`/product/${product.id}`}>
				<WhiteBox>
					<div className='aspect-square overflow-hidden relative'>
						{product.images.length > 0 ? (
							<Image
								src={product.images[0]}
								alt={product.title}
								fill
								className='object-contain'
							/>
						) : (
							<MdOutlineImage className='w-full h-full' />
						)}
					</div>
				</WhiteBox>
			</Link>
			<div className='flex flex-col items-center gap-2'>
				<Link href={`/product/${product.id}`}>{product.title}</Link>
				<div className='flex flex-col w-full items-center justify-between sm:flex-row'>
					<Price>${product.price}</Price>
					<div className='w-full sm:w-auto'>
						<Button
							onClick={() => cart.addToCart(product)}
							label='Add to cart'
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
