import prisma from '@/libs/prisma'

export async function getCategories() {
	const categories = await prisma.category.findMany({})
	return categories
}
