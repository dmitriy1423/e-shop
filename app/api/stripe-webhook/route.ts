import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/libs/prisma'
import Stripe from 'stripe'
import { buffer } from 'micro'
import { headers } from 'next/headers'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
	apiVersion: '2024-04-10',
})

export async function POST(req: NextRequest, res: NextResponse) {
	const body = await req.text()
	const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!
	const sig = headers().get('stripe-signature') as string

	let event

	try {
		event = stripe.webhooks.constructEvent(
			body,
			sig,
			process.env.STRIPE_WEBHOOK_SECRET as string
		)
	} catch (err: any) {
		return NextResponse.json(`Webhook Error: ${err}`, {
			status: 400,
		})
	}

	switch (event.type) {
		case 'checkout.session.completed':
			const data = event.data.object
			const orderId = data.metadata?.orderId
			const paid = data.payment_status === 'paid'

			if (orderId && paid) {
				await prisma.order.update({
					where: { id: orderId },
					data: {
						paid: true,
					},
				})
			}
			break
		default:
			console.log(`Unhandled event type ${event.type}`)
	}

	return NextResponse.json({ received: true })
}

export const config = {
	api: { bodyParser: false },
}
