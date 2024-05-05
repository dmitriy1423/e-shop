import { PrismaClient } from '@prisma/client'

declare global {
	var prisma: PrismaClient | undefined
}

const client = globalThis.prisma || createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalThis.prisma = client

export default client

function createPrismaClient() {
	if (process.env.DATABASE_URL) {
		return new PrismaClient({
			datasources: {
				db: {
					url: process.env.DATABASE_URL,
				},
			},
		})
	} else {
		return new PrismaClient()
	}
}
