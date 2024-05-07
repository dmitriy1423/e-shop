'use client'

import ProductBox from '@/app/components/ProductBox'
import { SafeUser } from '@/types'
import { Category, Product, Property } from '@prisma/client'
import axios from 'axios'
import { RevealWrapper } from 'next-reveal'
import { ChangeEvent, FC, useEffect, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'

type ExtendedCategory = Category & {
	parent?: Category | null
	child?: Category[] | null
	properties?: Property[] | null
}

interface ClientCategoryProps {
	category: ExtendedCategory
	products: Product[]
	subCategories: ExtendedCategory[]
	wishedProducts?: string[] | null
	user: SafeUser | null
}

const ClientCategory: FC<ClientCategoryProps> = ({
	category,
	products,
	subCategories,
	wishedProducts,
	user
}) => {
	const [filtersValues, setFiltersValues] = useState<{ [key: string]: string }>(
		{}
	)
	const [sort, setSort] = useState<
		'price-asc' | 'price-desc' | 'create-desc' | 'create-asc'
	>('price-desc')

	const [filteredProducts, setFilteredProducts] = useState<Product[]>(products)
	const [isLoading, setIsLoading] = useState(false)

	const handleFilterChange = (filterName: string, filterValue: string) => {
		setFiltersValues(prevValues => ({
			...prevValues,
			[filterName]: filterValue
		}))
	}

	const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
		const sortValue = e.target.value as
			| 'price-asc'
			| 'price-desc'
			| 'create-desc'
			| 'create-asc'
		setSort(sortValue)
	}

	useEffect(() => {
		let updatedProducts = [...products]

		// Фильтрация по значениям
		Object.keys(filtersValues).forEach(filterName => {
			const filterValue = filtersValues[filterName]
			if (filterValue !== 'all') {
				updatedProducts = updatedProducts.filter(product => {
					if (
						typeof product.properties === 'object' &&
						product.properties !== null
					) {
						const properties = product.properties as Record<string, string>
						return properties[filterName] === filterValue
					} else {
						return false
					}
				})
			}
		})

		// Сортировка
		updatedProducts.sort((a: Product, b: Product) => {
			if (sort === 'price-asc' || sort === 'price-desc') {
				const sortKey = sort.split('-')[0] as keyof Product
				const priceA = Number(a[sortKey])
				const priceB = Number(b[sortKey])

				if (sort === 'price-asc') {
					return priceA - priceB
				} else {
					return priceB - priceA
				}
			} else if (sort === 'create-desc' || sort === 'create-asc') {
				if (sort === 'create-desc') {
					return (
						new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
					)
				} else {
					return (
						new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
					)
				}
			}

			return 0
		})

		setFilteredProducts(updatedProducts)
	}, [filtersValues, sort, products])

	return (
		<>
			<div className="flex items-center justify-between">
				<h1 className="text-3xl font-bold mb-4">{category.name}</h1>
				<div className="flex items-center gap-4">
					{category?.properties?.map(prop => (
						<div
							key={prop.id}
							className="flex items-center gap-1 bg-gray-300 py-1 px-2 rounded-md"
						>
							<span>{prop.name}:</span>
							<select
								onChange={e => handleFilterChange(prop.name, e.target.value)}
								value={filtersValues[prop.name]}
								className="bg-transparent border-0"
							>
								<option value="all">All</option>
								{prop.values.map(val => (
									<option key={val} value={val}>
										{val}
									</option>
								))}
							</select>
						</div>
					))}
					<div className="flex items-center gap-1 bg-gray-300 py-1 px-2 rounded-md">
						<span>Sort:</span>
						<select
							onChange={handleSortChange}
							value={sort}
							className="bg-transparent border-0"
						>
							<option value="price-asc">price, lowest first</option>
							<option value="price-desc">price, highest first</option>
							<option value="create-desc">Newest first</option>
							<option value="create-asc">Oldest first</option>
						</select>
					</div>
				</div>
			</div>
			{filteredProducts.length > 0 ? (
				<div className="grid gap-8 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
					{filteredProducts.map((product, index) => (
						<RevealWrapper delay={index * 50} key={product.id}>
							<ProductBox
								product={product}
								key={product.id}
								wished={wishedProducts?.includes(product.id)}
								user={user}
							/>
						</RevealWrapper>
					))}
				</div>
			) : (
				<div className="text-3xl font-bold text-center">No products</div>
			)}
		</>
	)
}

export default ClientCategory
