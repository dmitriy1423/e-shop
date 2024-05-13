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
import { getSettingValue } from '@/actions/getSettingValue'
import FeaturedProducts from './components/FeaturedProducts'

export default async function Home() {
	const user = await getCurrentUser()
	const newProducts = await getNewProducts()
	const wishedNewProducts = await getWishedNewProducts(user?.email, newProducts)
	const featuredProductSetting = await getSettingValue('featuredProducts')
	const featuredProducts: Product[] = await getProducts(
		featuredProductSetting.values
	)

	return (
		<div className="pt-16">
			<FeaturedProducts products={featuredProducts} />
			<NewProducts
				products={newProducts}
				wishedProducts={wishedNewProducts?.map(i => i.productId)}
				user={user}
			/>
		</div>
	)
}
