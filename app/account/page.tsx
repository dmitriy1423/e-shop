import { getCurrentUser } from '@/actions/getCurrentUser'
import Center from '../components/Center'
import ClientAccount from './ClientAccount'
import { getSession } from 'next-auth/react'
import { getServerSession } from 'next-auth'

const Account = async () => {
	const user = await getCurrentUser()

	return (
		<div className="pt-24">
			<Center>
				<ClientAccount user={user} />
			</Center>
		</div>
	)
}

export default Account
