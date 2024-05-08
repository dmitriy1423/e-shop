import { getCurrentUser } from '@/actions/getCurrentUser'
import Center from '../components/Center'
import ClientSearch from './ClientSearch'
import { getWishedProducts } from '@/actions/getWishedProducts'

const Search = async () => {
	const user = await getCurrentUser()
	const wishedProducts = await getWishedProducts(user?.email)

	return (
		<div className="pt-24">
			<Center>
				<ClientSearch
					user={user}
					wishedProducts={wishedProducts?.map(p => p.productId)}
				/>
			</Center>
		</div>
	)
}

export default Search
