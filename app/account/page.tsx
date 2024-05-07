import { getCurrentUser } from '@/actions/getCurrentUser'
import Center from '../components/Center'
import ClientAccount from './ClientAccount'
import { getSession } from 'next-auth/react'
import { getServerSession } from 'next-auth'
import { getWishedProducts } from '@/actions/getWishedProducts'

const Account = async () => {
	const user = await getCurrentUser()
	const wishedProducts = await getWishedProducts(user?.email)

	return (
		<div className="pt-24">
			<Center>
				<ClientAccount
					user={user}
					wishedProducts={wishedProducts}
					wishedProductsIds={wishedProducts?.map(w => w.productId)}
				/>
			</Center>
		</div>
	)
}

export default Account
