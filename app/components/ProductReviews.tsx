'use client'

import { Rating } from '@mui/material'
import { Product, Review } from '@prisma/client'
import { FC, useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Input from './Input'
import TextArea from './TextArea'
import Button from './Button'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Skeleton from 'react-loading-skeleton'

interface ProductReviewsProps {
	product: Product
}

const ProductReviews: FC<ProductReviewsProps> = ({ product }) => {
	const router = useRouter()
	const [reviews, setReviews] = useState<Review[]>([])
	const [isReviewsLoading, setIsReviewsLoading] = useState(false)

	const {
		register,
		setValue,
		handleSubmit,
		reset,
		getValues,
		formState: { errors }
	} = useForm<FieldValues>({
		defaultValues: {
			rating: 0
		}
	})

	const setCustomValue = (id: string, value: any) => {
		setValue(id, value, {
			shouldTouch: true,
			shouldDirty: true,
			shouldValidate: true
		})
	}

	const submitReview: SubmitHandler<FieldValues> = async data => {
		axios
			.post('/api/reviews', { ...data, productId: product.id })
			.then(response => {
				toast.success('ok')
				setValue('rating', 0)
				setValue('title', '')
				setValue('comment', '')
				loadReviews()
			})
	}

	const loadReviews = () => {
		setIsReviewsLoading(true)
		axios
			.get(`/api/reviews?productId=${product.id}`)
			.then(response => {
				setReviews(response.data)
			})
			.finally(() => setIsReviewsLoading(false))
	}

	useEffect(() => {
		loadReviews()
	}, [])

	return (
		<div>
			<h2 className="text-3xl font-bold mb-2">Reviews</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
				<div>
					<div className="bg-white p-5 rounded-lg flex flex-col gap-2">
						<h3 className="text-2xl font-bold mt-2">Add review</h3>
						<Rating
							onChange={(event, newValue) => {
								setCustomValue('rating', newValue)
							}}
						/>
						<Input
							register={register}
							errors={errors}
							id="title"
							label="Title"
							required
						/>
						<TextArea
							register={register}
							errors={errors}
							id="comment"
							label="Comment"
							required
						/>
						<Button
							primary
							label="Rate Product"
							onClick={handleSubmit(submitReview)}
						/>
					</div>
				</div>
				<div>
					<div className="bg-white p-5 text-center rounded-lg">
						<h3 className="text-2xl font-bold mt-2">All reviews</h3>
						{isReviewsLoading ? (
							<Skeleton />
						) : reviews.length > 0 ? (
							reviews.map(review => (
								<div key={review.id} className="border">
									<div className="flex justify-between">
										<div>
											<Rating value={review.rating} readOnly />
										</div>
										<div>
											<time className="text-sm font-bold text-gray-400">
												{new Date(review.createdAt).toLocaleString()}
											</time>
										</div>
									</div>
									<h3 className="font-bold text-2xl text-left">
										{review.title}
									</h3>
									<p className="text-left">{review.comment}</p>
								</div>
							))
						) : (
							<p>No reviews</p>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProductReviews
