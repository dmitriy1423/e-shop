'use client'

import Button from '@/app/components/Button'
import ProductImages from '@/app/components/ProductImages'
import { CartProduct, useCartStore } from '@/store/cartStore'
import { Product } from '@prisma/client'
import Image from 'next/image'
import { FC } from 'react'
import { FaCartArrowDown, FaCartPlus } from 'react-icons/fa'
import { MdOutlineImage } from 'react-icons/md'

interface ClientProductProps {
	product: Product
}

const ClientProduct: FC<ClientProductProps> = ({ product }) => {
	const cart = useCartStore()

	return (
		<div>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-10 mt-10'>
				<ProductImages images={product.images} />
				<div>
					<h1 className='text-3xl font-bold mb-4'>{product.title}</h1>
					<p className='mb-5'>{product.description}</p>
					<div className='flex gap-5 items-center'>
						<span className='font-semibold text-2xl'>${product.price}</span>
						<div>
							{cart.cart.some(item => item.id === product.id) === true ? (
								<Button
									onClick={() => cart.removeFromCart(product.id)}
									label='Remove from cart'
									icon={FaCartArrowDown}
									outline
								/>
							) : (
								<Button
									onClick={() => cart.addToCart(product)}
									label='Add to cart'
									icon={FaCartPlus}
									primary
								/>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ClientProduct
