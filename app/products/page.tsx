import { getProducts } from '@/actions/getProducts'
import Center from '../components/Center'
import ClientProducts from './ClientProducts'

const Products = async () => {
	const products = await getProducts()

	return (
		<div className='pt-24'>
			<Center>
				<ClientProducts products={products} />
			</Center>
		</div>
	)
}

export default Products
