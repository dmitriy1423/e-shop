import prisma from '@/libs/prisma'

export async function getCategoryById(id: string) {
	try {
		const category = await prisma.category.findUnique({
			where: { id },
		})

		if (!category) throw new Error('Category not found')

		return category
	} catch (error: any) {
		return error
	}
}
