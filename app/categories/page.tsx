import { getCategories } from '@/actions/getCategories'
import { getProductsByCategory } from '@/actions/getProductsByCategory'
import { Product } from '@prisma/client'
import Center from '../components/Center'
import CategoriesClient from './CategoriesClient'
import { getWishedProducts } from '@/actions/getWishedProducts'
import { getCurrentUser } from '@/actions/getCurrentUser'

const Categories = async () => {
	const categories = await getCategories()
	const user = await getCurrentUser()
	const wishedProducts = await getWishedProducts(user?.email)
	const mainCategories = (await getCategories()).filter(
		c => c.parentId === null
	)
	const categoriesProducts: { [key: string]: Product[] } = {}
	for (const mainCategory of mainCategories) {
		const products = await getProductsByCategory(mainCategory.id)
		categoriesProducts[mainCategory.id] = products
	}

	return (
		<div className="pt-24">
			<Center>
				<CategoriesClient
					mainCategories={mainCategories}
					categoriesProducts={categoriesProducts}
					wishedProducts={wishedProducts?.map(i => i.productId)}
					user={user}
				/>
			</Center>
		</div>
	)
}

export default Categories
