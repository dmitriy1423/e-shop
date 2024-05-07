'use client'

import { Category, Product } from '@prisma/client'
import { FC } from 'react'
import ProductBox from '../components/ProductBox'
import Link from 'next/link'
import { RevealWrapper } from 'next-reveal'
import { SafeUser } from '@/types'

interface CategoriesClientProps {
	mainCategories: Category[]
	categoriesProducts: { [key: string]: Product[] }
	wishedProducts?: string[] | null
	user: SafeUser | null
}

const CategoriesClient: FC<CategoriesClientProps> = ({
	mainCategories,
	categoriesProducts,
	wishedProducts,
	user
}) => {
	return (
		<>
			<h1 className="font-bold text-3xl mb-5">All categories</h1>
			{mainCategories.map(category => (
				<div key={category.id}>
					{categoriesProducts[category.id].length > 0 && (
						<>
							<div className="flex items-center gap-5 mb-3">
								<h2 className="text-2xl font-semibold">{category.name}</h2>
								<Link href={`/category/${category.id}`} className="underline">
									Show all {category.name}
								</Link>
							</div>
							<div className="grid gap-8 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mb-6">
								{categoriesProducts[category.id].map(
									(product: Product, index) => (
										<RevealWrapper delay={index * 50} key={product.id}>
											<ProductBox
												key={product.id}
												product={product}
												wished={wishedProducts?.includes(product.id)}
												user={user}
											/>
										</RevealWrapper>
									)
								)}
								<RevealWrapper
									delay={categoriesProducts[category.id].length * 50}
								>
									<Link
										href={`/category/${category.id}`}
										className="flex items-center justify-center h-full text-gray-500 bg-gray-200 rounded-lg"
									>
										Show all &rarr;
									</Link>
								</RevealWrapper>
							</div>
						</>
					)}
				</div>
			))}
		</>
	)
}

export default CategoriesClient
