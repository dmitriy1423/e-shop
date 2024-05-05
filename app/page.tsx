import { getProducts } from '@/actions/getProducts'
import Featured from './components/Featured'
import Header from './components/Header'
import { getProductById } from '@/actions/getProductById'
import NewProducts from './components/NewProducts'
import { getNewProducts } from '@/actions/getNewProducts'
import { Product } from '@prisma/client'
import Center from './components/Center'

export default async function Home() {
	const featuredProduct = await getProductById('66339fbed4366a020200d20f')
	const newProducts = await getNewProducts()

	return (
		<div className='pt-8'>
			<Featured product={featuredProduct} />
			<NewProducts products={newProducts} />
		</div>
	)
}
