import prisma from '@/libs/prisma'

export async function getNewProducts() {
	return await prisma.product.findMany({
		take: 4,
		orderBy: {
			updatedAt: 'desc',
		},
	})
}
