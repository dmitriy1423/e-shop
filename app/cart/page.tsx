import { getCurrentUser } from '@/actions/getCurrentUser'
import React from 'react'
import CartClient from './CartClient'
import Center from '../components/Center'

const Cart = async () => {
	const user = await getCurrentUser()

	return (
		<div className="pt-24">
			<Center>
				<CartClient user={user} />
			</Center>
		</div>
	)
}

export default Cart
