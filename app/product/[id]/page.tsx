import { getProductByParams } from '@/actions/getProductByParams'
import Center from '@/app/components/Center'
import ClientProduct from './ClientProduct'
import { getProductById } from '@/actions/getProductById'
import NullData from '@/app/components/NullData'

interface IParams {
	id: string
}

const Product = async ({ params }: { params: IParams }) => {
	const { id } = params
	const product = await getProductById(id)

	if (!product) {
		return <NullData title='Oops! Product with the given id does not exist' />
	}

	return (
		<div className='pt-20 mb-14'>
			<Center>
				<ClientProduct product={product} />
			</Center>
		</div>
	)
}

export default Product
