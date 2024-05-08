'use client'

import { Product } from '@prisma/client'
import { FC } from 'react'
import ProductBox from '../components/ProductBox'
import { RevealWrapper } from 'next-reveal'
import { SafeUser } from '@/types'

interface ClientProductsProps {
	products: Product[]
	wishedProducts?: string[] | null
	user: SafeUser | null
}

const ClientProducts: FC<ClientProductsProps> = ({
	products,
	wishedProducts,
	user
}) => {
	return (
		<div>
			<h1 className="text-3xl font-bold mb-4">All products</h1>
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
		</div>
	)
}

export default ClientProducts
