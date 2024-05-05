import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/libs/prisma'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
	apiVersion: '2024-04-10',
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
					name: product.title,
				},
			},
		})
	}

	const order = await prisma.order.create({
		data: {
			line_items,
			name,
			email,
			city,
			postalCode,
			streetAddress,
			country,
			paid: false,
		},
	})

	const session = await stripe.checkout.sessions.create({
		line_items,
		mode: 'payment',
		customer_email: email,
		success_url: process.env.NEXTAUTH_URL + '/cart?success=true',
		cancel_url: process.env.NEXTAUTH_URL + '/cart?cancelled=true',
		metadata: { orderId: order.id },
	})

	return NextResponse.json({
		url: session.url,
	})

	/* return NextResponse.json(line_items) */
}
