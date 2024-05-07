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

interface ClientAccountProps {
	user: SafeUser | null
}

const ClientAccount: FC<ClientAccountProps> = ({ user }) => {
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
		setIsLoading(true)
		axios
			.get('/api/address')
			.then(response => {
				console.log(response.data)
				setValue('name', response.data.name)
				setValue('email', response.data.email)
				setValue('city', response.data.city)
				setValue('postalCode', response.data.postalCode)
				setValue('streetAddress', response.data.streetAddress)
				setValue('country', response.data.country)
			})
			.finally(() => setIsLoading(false))
	}, [])

	return (
		<>
			<div className="grid grid-cols-1 md:grid-cols-12 gap-10 my-10">
				<RevealWrapper className="md:col-span-7" delay={0}>
					<div className="bg-white p-4 md:p-8 text-center rounded-lg">
						<h2 className="text-2xl font-bold">Wishlist</h2>
					</div>
				</RevealWrapper>
				<RevealWrapper className="md:col-span-5" delay={100}>
					<div className="bg-white p-4 md:p-8 text-center rounded-lg">
						<h2 className="text-2xl font-bold">Account details</h2>
						{isLoading ? (
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
