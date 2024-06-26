import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/libs/prisma'
import Stripe from 'stripe'
import { getCurrentUser } from '@/actions/getCurrentUser'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
	apiVersion: '2024-04-10'
})

export async function POST(req: NextRequest, res: NextResponse) {
	const body = await req.json()
	const { name, email, city, postalCode, streetAddress, country, products } =
		body

	let line_items = []
	for (const product of products) {
		line_items.push({
			quantity: product.quantity,
			price_data: {
				currency: 'USD',
				unit_amount: product.price * product.quantity,
				product_data: {
					name: product.title
				}
			}
		})
	}

	const user = await getCurrentUser()

	const order = await prisma.order.create({
		data: {
			userEmail: user?.email as string,
			line_items,
			name,
			email,
			city,
			postalCode,
			streetAddress,
			country,
			paid: false
		}
	})

	const shippingFeeSetting = await prisma.setting.findUnique({
		where: { name: 'shippingFee' }
	})

	const session = await stripe.checkout.sessions.create({
		line_items,
		mode: 'payment',
		customer_email: email,
		success_url: process.env.NEXTAUTH_URL + '/cart?success=true',
		cancel_url: process.env.NEXTAUTH_URL + '/cart?cancelled=true',
		metadata: { orderId: order.id },
		allow_promotion_codes: true,
		shipping_options: [
			{
				shipping_rate_data: {
					display_name: 'shipping fee',
					type: 'fixed_amount',
					fixed_amount: {
						amount: Number(shippingFeeSetting?.values[0]),
						currency: 'USD'
					}
				}
			}
		]
	})

	return NextResponse.json({
		url: session.url
	})
}
