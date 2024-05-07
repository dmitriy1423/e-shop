import { PrismaAdapter } from '@next-auth/prisma-adapter'
import NextAuth, { AuthOptions, getServerSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import prisma from '@/libs/prisma'

export const authOptions: AuthOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		CredentialsProvider({
			name: 'credentials',
			credentials: {
				email: { label: 'email', type: 'text' },
				password: { label: 'password', type: 'password' }
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					throw new Error('Invalid credentials')
				}

				const user = await prisma.user.findUnique({
					where: {
						email: credentials.email
					}
				})

				if (!user || !user?.password) {
					throw new Error('Invalid credentials')
				}

				const isCorrectPassword = await bcrypt.compare(
					credentials.password,
					user.password
				)

				if (!isCorrectPassword) {
					throw new Error('Invalid credentials')
				}

				return user
			}
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_FRONT_ID as string,
			clientSecret: process.env.GOOGLE_FRONT_SECRET as string
		})
	],

	session: {
		strategy: 'jwt'
	},

	secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
