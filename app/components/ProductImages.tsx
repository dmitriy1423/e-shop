'use client'

import Image from 'next/image'
import { FC, useState } from 'react'
import { MdOutlineImage } from 'react-icons/md'

interface ProductImagesProps {
	images: string[]
}

const ProductImages: FC<ProductImagesProps> = ({ images }) => {
	const [activeImage, setActiveImage] = useState(images?.[0])

	return (
		<div className='bg-white p-5 text-center rounded-lg'>
			<div className='aspect-square overflow-hidden relative'>
				{images.length > 0 ? (
					<Image
						src={activeImage}
						fill
						alt={'image of product'}
						className='max-w-full object-contain'
					/>
				) : (
					<MdOutlineImage className='w-full h-full' />
				)}
			</div>
			<div className='flex flex-row justify-center gap-2 flex-wrap'>
				{images.map((image, index) => (
					<div
						onClick={() => setActiveImage(image)}
						key={index}
						className={`cursor-pointer aspect-square overflow-hidden relative border border-1 border-gray-200 rounded-md ${
							image === activeImage ? 'border-red-400' : 'opacity-70'
						}`}
					>
						<Image
							width={50}
							height={50}
							src={image}
							alt={`${index + 1} image of product`}
							className='w-full h-full object-contain'
						/>
					</div>
				))}
			</div>
		</div>
	)
}

export default ProductImages
