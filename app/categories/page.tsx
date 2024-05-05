import { getCategories } from '@/actions/getCategories'
import { getProductsByCategory } from '@/actions/getProductsByCategory'
import { Product } from '@prisma/client'
import Center from '../components/Center'
import CategoriesClient from './CategoriesClient'

const Categories = async () => {
	const categories = await getCategories()
	const mainCategories = (await getCategories()).filter(
		c => c.parentId === null
	)
	const categoriesProducts: { [key: string]: Product[] } = {}
	for (const mainCategory of mainCategories) {
		const products = await getProductsByCategory(mainCategory.id)
		categoriesProducts[mainCategory.id] = products
	}

	return (
		<div className='pt-24'>
			<Center>
				<CategoriesClient
					mainCategories={mainCategories}
					categoriesProducts={categoriesProducts}
				/>
			</Center>
		</div>
	)
}

export default Categories
