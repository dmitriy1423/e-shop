'use client'

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Center from '../components/Center'
import Input from '../components/Input'
import Button from '../components/Button'
import axios from 'axios'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Product } from '@prisma/client'
import { RevealWrapper } from 'next-reveal'
import ProductBox from '../components/ProductBox'
import Skeleton from 'react-loading-skeleton'

const Search = ({ searchTerm }: { searchTerm: string }) => {
	const {
		register,
		handleSubmit,
		getValues,
		setValue,
		watch,
		control,
		formState: { errors }
	} = useForm<FieldValues>({
		defaultValues: {
			search: ''
		}
	})

	const [isLoading, setIsLoading] = useState(false)
	const [products, setProducts] = useState<Product[]>([])

	const search: SubmitHandler<FieldValues> = async data => {
		setIsLoading(true)
		await axios
			.get(`/api/products?search=${data.search}`)
			.then(response => {
				setProducts(response.data)
			})
			.catch(error => {
				setProducts([])
			})
			.finally(() => {
				setIsLoading(false)
			})
	}

	return (
		<div className="pt-24">
			<Center>
				<h1 className="text-3xl font-bold">Поиск</h1>
				<form onSubmit={handleSubmit(search)} className="flex">
					<Input
						id="search"
						label="Search"
						register={register}
						errors={errors}
						required
						type="text"
					/>
					<button type="submit">Search</button>
				</form>
				{!isLoading && getValues('search') !== '' && products.length === 0 && (
					<h2 className="text-3xl font-bold">No products found</h2>
				)}
				{isLoading && <Skeleton count={5} />}
				{!isLoading && products.length > 0 && (
					<div className="grid gap-8 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
						{products.map((product, index) => (
							<RevealWrapper delay={index * 50} key={product.id}>
								<ProductBox product={product} />
							</RevealWrapper>
						))}
					</div>
				)}
			</Center>
		</div>
	)
}

export default Search
