import prisma from '@/libs/prisma'

interface IParams {
	id?: string
}

export async function getProductByParams(params: IParams) {
	const { id } = params

	const product = await prisma.product.findUnique({
		where: { id },
	})

	if (!product) throw new Error('Product not found')

	return product
}
