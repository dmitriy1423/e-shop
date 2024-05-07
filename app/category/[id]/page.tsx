import Center from '@/app/components/Center'
import ClientCategory from './ClientCategory'
import { getCategories } from '@/actions/getCategories'
import { getCategoryById } from '@/actions/getCategoryById'
import { getCategoryByParams } from '@/actions/getCategoryByParams'
import { getProductsByCategory } from '@/actions/getProductsByCategory'
import { getSubCategories } from '@/actions/getSubCategories'
import { getCurrentUser } from '@/actions/getCurrentUser'
import { getWishedProducts } from '@/actions/getWishedProducts'

interface IParams {
	id: string
}

const Category = async ({ params }: { params: IParams }) => {
	const user = await getCurrentUser()
	const category = await getCategoryByParams(params)
	const subCategories = await getSubCategories(category)
	const products = await getProductsByCategory(category.id)
	const wishedProducts = await getWishedProducts(user?.email)

	return (
		<div className="pt-24">
			<Center>
				<ClientCategory
					category={category}
					products={products}
					subCategories={subCategories}
					wishedProducts={wishedProducts?.map(p => p.productId)}
					user={user}
				/>
			</Center>
		</div>
	)
}

export default Category
