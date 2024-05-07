import prisma from '@/libs/prisma'
import { Product } from '@prisma/client'

export async function getWishedProducts(userEmail: string | null | undefined) {
	if (!userEmail) {
		return null
	}

	return await prisma.wishedProduct.findMany({
		where: { userEmail },
		include: {
			product: true
		}
	})
}
