import prisma from '@/libs/prisma'
import { Category } from '@prisma/client'

export async function getSubCategories(category: Category) {
	const subCategories = await prisma.category.findMany({
		where: {
			parentId: category.id,
		},
		include: {
			parent: true,
			child: true,
			product: true,
			properties: true,
		},
	})

	if (!subCategories) throw new Error('SubCategories not found')

	return subCategories
}
