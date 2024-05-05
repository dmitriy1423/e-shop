import prisma from '@/libs/prisma'

export async function getProductsByCategory(categoryId: string) {
	const childCategories = await prisma.category.findMany({
		where: {
			OR: [{ id: categoryId }, { parent: { id: categoryId } }],
		},
		select: {
			id: true,
		},
	})

	const categoryIds = childCategories.map(category => category.id)

	const products = await prisma.product.findMany({
		where: {
			OR: [{ categoryId: { in: categoryIds } }],
		},
		include: {
			category: true,
		},
	})

	if (!products) throw new Error('Product not found')

	return products
}
