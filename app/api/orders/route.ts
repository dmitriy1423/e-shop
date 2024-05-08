import { getCurrentUser } from '@/actions/getCurrentUser'
import prisma from '@/libs/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, res: NextResponse) {
	const user = await getCurrentUser()
	if (user) {
		const orders = await prisma.order.findMany({
			where: { userEmail: user?.email as string }
		})
		return NextResponse.json(orders)
	}
}
