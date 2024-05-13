import prisma from '@/libs/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
	const searchParam = req.nextUrl.searchParams.get('productId')

	const reviews = await prisma.review.findMany({
		where: { productId: searchParam as string },
		orderBy: { createdAt: 'desc' }
	})

	if (!reviews) return NextResponse.json(null)

	return NextResponse.json(reviews)
}

export async function POST(req: NextRequest, res: NextResponse) {
	const body = await req.json()
	const { rating, title, comment, productId } = body

	const review = await prisma.review.create({
		data: { title, comment, rating, productId }
	})

	return NextResponse.json(review)
}
