import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/libs/prisma'
import { getCurrentUser } from '@/actions/getCurrentUser'

export async function GET(req: NextRequest, res: NextResponse) {
	const user = await getCurrentUser()
	if (user && user.email) {
		const wishedProducts = await prisma.wishedProduct.findMany({
			include: {
				product: true
			}
		})
		return NextResponse.json(wishedProducts)
	}

	return NextResponse.json(null)
}

export async function POST(req: NextRequest, res: NextResponse) {
	const user = await getCurrentUser()
	const body = await req.json()
	const { productId } = body

	if (user && user.email) {
		const wishedProduct = await prisma.wishedProduct.findUnique({
			where: {
				userEmail_productId: {
					userEmail: user?.email as string,
					productId: productId
				}
			}
		})
		if (wishedProduct) {
			await prisma.wishedProduct.delete({
				where: {
					userEmail_productId: {
						userEmail: user?.email as string,
						productId: productId
					}
				}
			})
		} else {
			await prisma.wishedProduct.create({
				data: {
					userEmail: user?.email as string,
					productId: productId
				}
			})
		}
	}

	return NextResponse.json(true)
}
