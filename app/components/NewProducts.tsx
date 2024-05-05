'use client'

import { Product } from '@prisma/client'
import { FC } from 'react'
import styled from 'styled-components'
import Center from './Center'
import ProductBox from './ProductBox'

const ProductsGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	gap: 30px;
`

interface NewProductsProps {
	products: Product[]
}

const NewProducts: FC<NewProductsProps> = ({ products }) => {
	return (
		<Center>
			<h2 className='text-3xl mt-7 mb-5 font-bold'>New Arrivals</h2>
			<div className='grid gap-8 grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
				{products.length > 0 &&
					products.map(product => (
						<ProductBox product={product} key={product.id} />
					))}
			</div>
		</Center>
	)
}

export default NewProducts
