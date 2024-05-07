import { getProducts } from '@/actions/getProducts'
import Center from '../components/Center'
import ClientProducts from './ClientProducts'
import { getCurrentUser } from '@/actions/getCurrentUser'
import { getWishedProducts } from '@/actions/getWishedProducts'

const Products = async () => {
	const user = await getCurrentUser()
	const products = await getProducts()
	const wishedProducts = await getWishedProducts(user?.email)

	return (
		<div className="pt-24">
			<Center>
				<ClientProducts
					products={products}
					wishedProducts={wishedProducts?.map(p => p.productId)}
					user={user}
				/>
			</Center>
		</div>
	)
}

export default Products
