import prisma from '@/libs/prisma'
import { Product } from '@prisma/client'

export async function getWishedNewProducts(
	userEmail: string | null | undefined,
	newProducts: Product[]
) {
	if (!userEmail) {
		return null
	}

	return await prisma.wishedProduct.findMany({
		where: { userEmail },
		take: 4,
		orderBy: {
			updatedAt: 'desc'
		}
	})
}
