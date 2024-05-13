'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { FC } from 'react'
import { Product } from '@prisma/client'
import Featured from './Featured'
import Center from './Center'

interface FeaturedProductsProps {
	products: Product[]
}

const FeaturedProducts: FC<FeaturedProductsProps> = ({ products }) => {
	return (
		<Swiper
			modules={[Pagination, Navigation]}
			navigation={{
				prevEl: '.swiper-button-prev',
				nextEl: '.swiper-button-next'
			}}
			pagination={{ clickable: true }}
			spaceBetween={10}
			slidesPerView={1}
			autoHeight
			className="h-full w-full relative"
		>
			{products.length > 0 &&
				products.map(product => (
					<SwiperSlide key={product.id}>
						<Featured product={product} />
					</SwiperSlide>
				))}

			<div className="max-w-[1400px] mx-auto my-0 flex justify-center items-center">
				<div className="swiper-button-prev"></div>
				<div className="swiper-button-next"></div>
			</div>
		</Swiper>
	)
}

export default FeaturedProducts
