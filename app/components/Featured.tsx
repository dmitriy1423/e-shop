'use client'

import styled from 'styled-components'
import Center from './Center'
import Button from './Button'
import { MdAddCard } from 'react-icons/md'
import { FaCartArrowDown } from 'react-icons/fa'
import { Product } from '@prisma/client'
import { FC, useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCartStore } from '@/store/cartStore'
import NullData from './NullData'

const Bg = styled.div`
	background-color: #222222;
	color: #ffffff;
	padding-bottom: 50px;
`
const Title = styled.h1`
	font-size: 3rem;
	margin: 0;
	font-weight: normal;
`
const Desc = styled.p`
	color: #aaaaaa;
	font-size: 0.8rem;
`
const ColumnsWrapper = styled.div`
	display: grid;
	grid-template-columns: 1.1fr 0.9fr;
	gap: 40px;

	img {
		max-width: 100%;
	}
`
const Column = styled.div`
	display: flex;
	align-items: center;
`
const ButtonsWrapper = styled.div`
	display: flex;
	gap: 10px;
	margin-top: 25px;
`

interface FeaturedProps {
	product: Product
}

const Featured: FC<FeaturedProps> = ({ product }) => {
	/* const { addProduct } = useContext(CartContext)
	const addFeaturedToCart = () => {
		addProduct(product.id)
	} */
	const cart = useCartStore()

	if (!product) {
		return <NullData title='No product' />
	}

	return (
		<Bg>
			<Center>
				<div className='flex flex-col items-center md:grid md:grid-cols-2'>
					<Column>
						<div className='order-1 md:order-2'>
							<Title>{product.title}</Title>
							<Desc>{product.description}</Desc>
							<ButtonsWrapper>
								<Link
									href={`/product/${product.id}`}
									className='flex items-center border border-white rounded-lg px-2'
								>
									Read more
								</Link>
								<div className='max-w-[600px]'>
									<Button
										onClick={() => cart.addToCart(product)}
										label='Add to cart'
										icon={FaCartArrowDown}
										white
									/>
								</div>
							</ButtonsWrapper>
						</div>
					</Column>
					<div className='flex justify-center -order-1 md:order-1'>
						<Image
							src={product.images[0]}
							alt={product.title}
							width={250}
							height={250}
						/>
					</div>
				</div>
			</Center>
		</Bg>
	)
}

export default Featured
