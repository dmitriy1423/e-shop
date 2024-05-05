import prisma from '@/libs/prisma'

interface IParams {
	id?: string
}

export async function getCategoryByParams(params: IParams) {
	const { id } = params

	const category = await prisma.category.findUnique({
		where: { id },
		include: {
			parent: true,
			child: true,
			properties: true,
		},
	})

	if (!category) throw new Error('Category not found')

	return category
}
