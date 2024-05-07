'use client'

import { useCartStore } from '@/store/cartStore'
import Image from 'next/image'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Button from '../components/Button'
import Center from '../components/Center'
import Input from '../components/Input'
import { FC, useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { RevealWrapper } from 'next-reveal'
import Skeleton from 'react-loading-skeleton'
import { SafeUser } from '@/types'

interface CartClientProps {
	user: SafeUser | null
}

const CartClient: FC<CartClientProps> = ({ user }) => {
	const cart = useCartStore()
	const [isSuccess, setIsSuccess] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

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
			country: '',
			products: cart.cart
		}
	})

	useEffect(() => {
		setValue('products', cart.cart)
	}, [cart.cart])

	useEffect(() => {
		if (typeof window === 'undefined') return

		if (window.location.href.includes('success')) {
			setIsSuccess(true)
			cart.clearCart()
		}

		if (user) {
			axios
				.get('/api/address')
				.then(response => {
					if (user) setIsLoading(true)
					console.log(response.data)
					setValue('name', response.data.name)
					setValue('email', response.data.email)
					setValue('city', response.data.city)
					setValue('postalCode', response.data.postalCode)
					setValue('streetAddress', response.data.streetAddress)
					setValue('country', response.data.country)
				})
				.finally(() => setIsLoading(false))
		}
	}, [user])

	const total = cart.cart.reduce((acc, product) => {
		acc += product.price * product.quantity
		return acc
	}, 0)

	const createPayment: SubmitHandler<FieldValues> = async data => {
		await axios.post('/api/checkout', data).then(result => {
			if (result.data.url) {
				window.location = result.data.url
			}
		})
	}

	if (isSuccess) {
		return (
			<div className="pt-24">
				<Center>
					<div
						className="grid gap-10"
						style={{
							gridTemplateColumns: '1.2fr 0.8fr'
						}}
					>
						<div className="bg-white rounded-lg p-8">
							<h1 className="text-3xl font-bold">Thanks for your order!</h1>
							<p>We will email you when your order will be sent</p>
						</div>
					</div>
				</Center>
			</div>
		)
	}

	return (
		<div className="pt-24">
			<Center>
				<div className="grid gap-10 grid-cols-1 md:grid-cols-12 mb-8">
					<RevealWrapper delay={0} className={'md:col-span-7'}>
						<div className="bg-white rounded-lg p-4 md:p-8">
							<h2 className="text-2xl font-bold">Cart</h2>
							{cart.cart.length > 0 ? (
								<>
									<table className="w-full">
										<thead>
											<tr>
												<th>Product</th>
												<th>Quantity</th>
												<th>Price</th>
												<th>Total</th>
											</tr>
										</thead>
										<tbody>
											{cart.cart.map(product => (
												<tr key={product.id} className="">
													<td>
														<div className="flex items-center justify-center relative aspect-square shadow-md rounded-md max-w-[100px] max-h-[100px] p-2">
															<Link href={`/product/${product.id}`}>
																<Image
																	src={product.images[0]}
																	width={100}
																	height={100}
																	alt={product.title}
																	className="object-contain"
																/>
															</Link>
														</div>
														<Link href={`/product/${product.id}`}>
															<span className="">{product.title}</span>
														</Link>
														<div className="max-w-[200px]">
															<Button
																label="Remove from cart"
																small
																onClick={() => cart.removeFromCart(product.id)}
															/>
														</div>
													</td>
													<td className="h-full">
														<div className="flex flex-col max-w-[35px] md:flex-row items-center justify-center gap-2 md:max-w-[80px]">
															<Button
																label="-"
																small
																onClick={() =>
																	cart.decreaseQuantity(product.id)
																}
															/>
															<span>{product.quantity}</span>
															<Button
																label="+"
																small
																onClick={() =>
																	cart.increaseQuantity(product.id)
																}
															/>
														</div>
													</td>
													<td>${product.price}</td>
													<td>${product.price * product.quantity}</td>
												</tr>
											))}
											<tr>
												<td>Total:</td>
												<td></td>
												<td>${total}</td>
											</tr>
										</tbody>
									</table>
								</>
							) : (
								<div>Your cart is empty</div>
							)}
						</div>
					</RevealWrapper>

					{!!cart.cart.length && (
						<RevealWrapper delay={200} className={'md:col-span-5'}>
							<div className="bg-white rounded-lg p-4 md:p-8">
								<h2 className="text-2xl font-bold">Order information</h2>
								{isLoading ? (
									<Skeleton count={5} height={68} />
								) : (
									<form
										onSubmit={handleSubmit(createPayment)}
										className="flex flex-col gap-2"
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
										<input {...register('products')} type="hidden" />

										{/* <Button primary label='Continue to payment' /> */}
										<button
											type="submit"
											className="bg-black text-white rounded-lg p-3"
										>
											Continue to checkout
										</button>
									</form>
								)}
							</div>
						</RevealWrapper>
					)}
				</div>
			</Center>
		</div>
	)
}

export default CartClient
