import Center from '@/app/components/Center'
import ClientCategory from './ClientCategory'
import { getCategories } from '@/actions/getCategories'
import { getCategoryById } from '@/actions/getCategoryById'
import { getCategoryByParams } from '@/actions/getCategoryByParams'
import { getProductsByCategory } from '@/actions/getProductsByCategory'
import { getSubCategories } from '@/actions/getSubCategories'

interface IParams {
	id: string
}

const Category = async ({ params }: { params: IParams }) => {
	const category = await getCategoryByParams(params)
	const subCategories = await getSubCategories(category)
	const products = await getProductsByCategory(category.id)

	return (
		<div className='pt-24'>
			<Center>
				<ClientCategory
					category={category}
					products={products}
					subCategories={subCategories}
				/>
			</Center>
		</div>
	)
}

export default Category
