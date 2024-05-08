'use client'

import { Order } from '@prisma/client'
import { FC } from 'react'

interface OrderLineProps {
	order: Order
}

const OrderLine: FC<OrderLineProps> = ({ order }) => {
	return (
		<div className="flex gap-5 items-center my-3 py-3 border-b border-[#ddd]">
			<div className="text-left">
				<time className="font-bold text-[#555}">
					{new Date(order.createdAt).toLocaleString()}
				</time>
				<div className="text-sm text-[#888]">
					{order.name}
					<br />
					{order.email}
					<br />
					{order.streetAddress}
					<br />
					{order.postalCode} {order.city}, {order.country}
				</div>
			</div>
			<div>
				{order.line_items?.map(item => (
					<div key={item.price_data.product_data.name}>
						<span className="text-[#888]">{item.quantity}</span> x{' '}
						{item.price_data.product_data.name}
					</div>
				))}
			</div>
		</div>
	)
}

export default OrderLine
