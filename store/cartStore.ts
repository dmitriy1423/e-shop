import { Product } from '@prisma/client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type CartProduct = {
	id: string
	title: string
	price: number
	images: string[]
	quantity: number
}

type CartState = {
	cart: CartProduct[]
	totalQuantity: number
	addToCart: (item: Product) => void
	increaseQuantity: (id: string) => void
	decreaseQuantity: (id: string) => void
	removeFromCart: (id: string) => void
	clearCart: () => void
}

export const useCartStore = create<CartState>()(
	persist(
		set => ({
			cart: [],
			totalQuantity: 0,

			addToCart: item =>
				set(state => {
					const existingItemIndex = state.cart.findIndex(
						cartItem => cartItem.id === item.id
					)

					if (existingItemIndex !== -1) {
						const updatedCart = [...state.cart]
						updatedCart[existingItemIndex].quantity++
						return {
							cart: updatedCart,
							totalQuantity: state.totalQuantity + 1,
						}
					} else {
						return {
							cart: [...state.cart, { ...item, quantity: 1 }],
							totalQuantity: state.totalQuantity + 1,
						}
					}
				}),

			increaseQuantity: id =>
				set(state => {
					const updatedCart = state.cart.map(cartItem =>
						cartItem.id === id
							? { ...cartItem, quantity: cartItem.quantity + 1 }
							: cartItem
					)
					return {
						cart: updatedCart,
						totalQuantity: state.totalQuantity + 1,
					}
				}),

			decreaseQuantity: id =>
				set(state => {
					const existingItem = state.cart.find(cartItem => cartItem.id === id)
					if (!existingItem || existingItem.quantity === 1) {
						return state
					}
					const updatedCart = state.cart.map(cartItem =>
						cartItem.id === id
							? { ...cartItem, quantity: cartItem.quantity - 1 }
							: cartItem
					)
					return {
						cart: updatedCart,
						totalQuantity: state.totalQuantity - 1,
					}
				}),

			removeFromCart: id =>
				set(state => {
					const updatedCart = state.cart.filter(cartItem => cartItem.id !== id)
					const removedQuantity =
						state.cart.find(cartItem => cartItem.id === id)?.quantity || 0
					return {
						cart: updatedCart,
						totalQuantity: state.totalQuantity - removedQuantity,
					}
				}),

			clearCart: () => set({ cart: [], totalQuantity: 0 }),
		}),
		{ name: 'cart-store' }
	)
)
