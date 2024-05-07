'use client'

import { SafeUser } from '@/types'
import Button from '../components/Button'
import { ChangeEvent, FC, useEffect, useState } from 'react'
import { signIn, signOut } from 'next-auth/react'
import { RevealWrapper } from 'next-reveal'
import Input from '../components/Input'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import axios from 'axios'
import toast from 'react-hot-toast'
import Skeleton from 'react-loading-skeleton'
import ProductBox from '../components/ProductBox'
import { Product, WishedProduct } from '@prisma/client'

interface ClientAccountProps {
	user: SafeUser | null
	wishedProducts?: WishedExtended[] | null
	wishedProductsIds?: string[] | null
}

export type WishedExtended = WishedProduct & {
	product: Product
}

const ClientAccount: FC<ClientAccountProps> = ({ user, wishedProducts }) => {
	const [isLoadingAddress, setIsLoadingAddress] = useState(false)
	const [isLoadingWished, setIsLoadingWished] = useState(false)
	const [wishedProductsList, setWishedProductsList] = useState<
		WishedExtended[]
	>(wishedProducts || [])

	const {
		register,
		handleSubmit,
		setValue,
		getValues,
		control,
		formState: { errors }
	} = useForm<FieldValues>({
		defaultValues: {
			name: '',
			email: '',
			city: '',
			postalCode: '',
			streetAddress: '',
			country: ''
		}
	})

	const saveAddress: SubmitHandler<FieldValues> = async data => {
		await axios.put('/api/address', data).then(response => {
			console.log(response.data)
			toast.success('Address updated')
		})
	}

	useEffect(() => {
		if (user) {
			setIsLoadingAddress(true)
			axios
				.get('/api/address')
				.then(response => {
					setValue('name', response.data.name)
					setValue('email', response.data.email)
					setValue('city', response.data.city)
					setValue('postalCode', response.data.postalCode)
					setValue('streetAddress', response.data.streetAddress)
					setValue('country', response.data.country)
				})
				.finally(() => setIsLoadingAddress(false))

			setIsLoadingWished(true)
			axios
				.get('/api/wishlist')
				.then(response => {
					setWishedProductsList(response.data)
				})
				.finally(() => setIsLoadingWished(false))
		}
	}, [user])

	useEffect(() => {
		if (user) {
			setIsLoadingWished(true)
			axios
				.get('/api/wishlist')
				.then(response => {
					setWishedProductsList(response.data)
				})
				.finally(() => setIsLoadingWished(false))
		}
	}, [user])

	const productRemovedFromWishlist = (id: string) => {
		console.log('----------')
		setWishedProductsList(products => {
			return [...products.filter(p => p.productId !== id)]
		})
	}

	return (
		<>
			<div className="grid grid-cols-1 md:grid-cols-12 gap-10 my-10">
				<RevealWrapper className="md:col-span-7" delay={0}>
					<div className="bg-white p-4 md:p-8 text-center rounded-lg">
						<h2 className="text-2xl font-bold">Wishlist</h2>
						{!user && <div>Login to view wishlist</div>}
						{user && isLoadingWished ? (
							<Skeleton count={1} height={200} />
						) : (
							<>
								{user && wishedProductsList?.length > 0 ? (
									<div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
										{wishedProductsList?.map((wished, index) => (
											<RevealWrapper delay={index * 50} key={wished.id}>
												<ProductBox
													product={wished.product}
													key={wished.productId}
													wished={!!wished.product.id}
													user={user}
													onRemoveFromWishlist={() =>
														productRemovedFromWishlist(wished.productId)
													}
												/>
											</RevealWrapper>
										))}
									</div>
								) : (
									<>{user && <div>No wishlist</div>}</>
								)}
							</>
						)}
					</div>
				</RevealWrapper>
				<RevealWrapper className="md:col-span-5" delay={100}>
					<div className="bg-white p-4 md:p-8 text-center rounded-lg">
						<h2 className="text-2xl font-bold">Account details</h2>
						{isLoadingAddress ? (
							<Skeleton count={4} height={68} />
						) : (
							<form
								onSubmit={handleSubmit(saveAddress)}
								className="flex flex-col gap-2 mb-2"
							>
								<Input
									id="name"
									label="Name"
									register={register}
									errors={errors}
									type="text"
									required
								/>
								<Input
									id="email"
									label="Email"
									register={register}
									errors={errors}
									type="email"
									required
								/>
								<div className="flex flex-row gap-2">
									<Input
										id="city"
										label="City"
										register={register}
										errors={errors}
										type="text"
										required
									/>
									<Input
										id="postalCode"
										label="Postal Code"
										register={register}
										errors={errors}
										type="text"
										required
									/>
								</div>
								<Input
									id="streetAddress"
									label="Street Address"
									register={register}
									errors={errors}
									type="text"
									required
								/>
								<Input
									id="country"
									label="Country"
									register={register}
									errors={errors}
									type="text"
									required
								/>
								<button
									type="submit"
									className="bg-black text-white rounded-lg p-3"
								>
									Save
								</button>
								<hr />
							</form>
						)}
						<div className="max-w-[150px]">
							{!user && (
								<Button
									label="Login"
									primary
									onClick={() =>
										signIn('google', {
											callbackUrl: process.env.NEXTAUTH_URL
										})
									}
								/>
							)}
							{user && (
								<Button
									label="Logout"
									primary
									onClick={() =>
										signOut({
											callbackUrl: process.env.NEXTAUTH_URL
										})
									}
								/>
							)}
						</div>
					</div>
				</RevealWrapper>
			</div>
		</>
	)
}

export default ClientAccount
