import prisma from '@/libs/prisma'

export async function getProducts() {
	return await prisma.product.findMany({})
}
