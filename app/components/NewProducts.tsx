'use client'

import { Product, WishedProduct } from '@prisma/client'
import { FC } from 'react'
import styled from 'styled-components'
import Center from './Center'
import ProductBox from './ProductBox'
import { RevealWrapper } from 'next-reveal'
import { SafeUser } from '@/types'

const ProductsGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	gap: 30px;
`

interface NewProductsProps {
	products: Product[]
	wishedProducts?: string[] | null
	user: SafeUser | null
}

const NewProducts: FC<NewProductsProps> = ({
	products,
	wishedProducts,
	user
}) => {
	console.log(wishedProducts)
	return (
		<Center>
			<h2 className="text-3xl mt-7 mb-5 font-bold">New Arrivals</h2>
			<div className="grid gap-8 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
				{products.length > 0 &&
					products.map((product, index) => (
						<RevealWrapper delay={index * 50} key={product.id}>
							<ProductBox
								product={product}
								wished={wishedProducts?.includes(product.id)}
								user={user}
							/>
						</RevealWrapper>
					))}
			</div>
		</Center>
	)
}

export default NewProducts
