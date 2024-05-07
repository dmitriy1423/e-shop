import { getCurrentUser } from '@/actions/getCurrentUser'
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/libs/prisma'

export async function GET(req: NextRequest) {
	const user = await getCurrentUser()
	if (user && user.email) {
		const address = await prisma.address.findUnique({
			where: { userEmail: user?.email as string }
		})
		return NextResponse.json(address)
	}
	return NextResponse.json(null)
}

export async function PUT(req: NextRequest, res: NextResponse) {
	const body = await req.json()
	const user = await getCurrentUser()
	const { name, email, city, postalCode, streetAddress, country } = body

	if (user && user.email) {
		const address = await prisma.address.findUnique({
			where: { userEmail: user?.email as string }
		})

		if (address) {
			await prisma.address.update({
				where: { id: address.id },
				data: {
					name,
					email,
					city,
					postalCode,
					streetAddress,
					country
				}
			})
			return NextResponse.json(address)
		} else {
			const address = await prisma.address.create({
				data: {
					userEmail: user?.email,
					name,
					email,
					city,
					postalCode,
					streetAddress,
					country
				}
			})
			return NextResponse.json(address)
		}
	}

	return null
}
