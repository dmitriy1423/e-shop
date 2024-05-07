import type { Metadata } from 'next'
import { Inter, Roboto } from 'next/font/google'
import '../styles/globals.css'
import 'react-loading-skeleton/dist/skeleton.css'
import Header from './components/Header'
import LoaderContext from './components/Loader'
import { Toaster } from 'react-hot-toast'

const roboto = Roboto({
	subsets: ['latin', 'cyrillic'],
	weight: ['100', '300', '400', '500', '700', '900']
})

export const metadata: Metadata = {
	title: 'Ecomm',
	description: 'Ecomm - shop digit'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={`${roboto.className}`}>
				<LoaderContext />
				<Toaster />
				<Header />
				{children}
			</body>
		</html>
	)
}
