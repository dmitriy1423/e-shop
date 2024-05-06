import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/libs/prisma'

export async function GET(req: NextRequest) {
	const searchParam = req.nextUrl.searchParams.get('search')

	if (searchParam) {
		const searchTerms = searchParam.split(/\s+/)
		const searchConditions = searchTerms.map(term => ({
			title: {
				contains: term,
				mode: 'insensitive'
			}
		}))

		const products = await prisma.product.findMany({
			where: {
				OR: searchConditions as []
			}
		})

		if (products) {
			return NextResponse.json(products)
		}
	}

	return null
}

/* export async function GET(req: NextRequest) {
	const searchParam = req.nextUrl.searchParams.get('search')

	if (searchParam) {
		try {
			const searchTerms = searchParam.split(/\s+/)
			const searchConditions = searchTerms.map(term => ({
				title: {
					contains: term,
					mode: 'insensitive'
				}
			}))

			const products = await prisma.product.findMany({
				where: {
					OR: searchConditions as []
				}
			})

			if (products.length > 0) {
				return NextResponse.json(products)
			} else {
				return null
			}
		} catch (error) {
			console.error('Error retrieving products:', error)
			return NextResponse.json(
				{ error: 'Internal Server Error' },
				{ status: 500 }
			)
		}
	} else {
		return NextResponse.json(
			{ error: 'Missing search parameter' },
			{ status: 400 }
		)
	}
} */
