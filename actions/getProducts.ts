import prisma from '@/libs/prisma'

export async function getProducts(ids?: string[]) {
	if (ids && ids.length > 0) {
		return await prisma.product.findMany({
			where: {
				id: {
					in: ids
				}
			}
		})
	}

	return await prisma.product.findMany({})
}
