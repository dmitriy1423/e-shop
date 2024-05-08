import { getProducts } from '@/actions/getProducts'
import Featured from './components/Featured'
import Header from './components/Header'
import { getProductById } from '@/actions/getProductById'
import NewProducts from './components/NewProducts'
import { getNewProducts } from '@/actions/getNewProducts'
import { Product } from '@prisma/client'
import Center from './components/Center'
import { getCurrentUser } from '@/actions/getCurrentUser'
import { getWishedNewProducts } from '@/actions/getWishedNewProducts'

export default async function Home() {
	const user = await getCurrentUser()
	const featuredProduct = await getProductById('66339fbed4366a020200d20f')
	const newProducts = await getNewProducts()
	const wishedNewProducts = await getWishedNewProducts(user?.email, newProducts)

	return (
		<div className="pt-8">
			<Featured product={featuredProduct} />
			<NewProducts
				products={newProducts}
				wishedProducts={wishedNewProducts?.map(i => i.productId)}
				user={user}
			/>
		</div>
	)
}
