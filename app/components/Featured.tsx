'use client'

import { useCartStore } from '@/store/cartStore'
import { Product } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { FaCartArrowDown } from 'react-icons/fa'
import { MdOutlineImage } from 'react-icons/md'
import styled from 'styled-components'
import Button from './Button'
import Center from './Center'
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
	const cart = useCartStore()

	if (!product) {
		return <NullData title="No product" />
	}

	return (
		<Bg>
			<Center>
				<div className="flex flex-col items-center justify-center md:px-14 md:grid md:grid-cols-2">
					<Column>
						<div className="order-1 md:order-2">
							{/* <RevealWrapper origin={'left'} delay={0}> */}
							<Title>{product.title}</Title>
							<Desc>{product.description}</Desc>
							<ButtonsWrapper>
								<Link
									href={`/product/${product.id}`}
									className="flex items-center border border-white rounded-lg px-2"
								>
									Read more
								</Link>
								<div className="max-w-[600px]">
									<Button
										onClick={() => cart.addToCart(product)}
										label="Add to cart"
										icon={FaCartArrowDown}
										white
									/>
								</div>
							</ButtonsWrapper>
							{/* </RevealWrapper> */}
						</div>
					</Column>
					<div
						className={`flex justify-center -order-1 md:order-1 ${
							!!product.images[0] === false && 'aspect-square'
						}`}
					>
						{/* <RevealWrapper delay={0}> */}
						{!!product.images[0] ? (
							<Image
								src={product.images[0]}
								alt={product.title}
								width={250}
								height={250}
							/>
						) : (
							<MdOutlineImage
								className="w-full h-full"
								width={250}
								height={250}
							/>
						)}
						{/* </RevealWrapper> */}
					</div>
				</div>
			</Center>
		</Bg>
	)
}

export default Featured
