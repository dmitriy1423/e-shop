import prisma from '@/libs/prisma'

export async function getProductById(id: string) {
	try {
		const product = await prisma.product.findUnique({
			where: { id },
		})

		if (!product) throw new Error('Product not found')

		return product
	} catch (error: any) {
		return error
	}
}
