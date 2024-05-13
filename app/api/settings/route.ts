import prisma from '@/libs/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
	const searchParam = req.nextUrl.searchParams.get('name')

	const setting = await prisma.setting.findUnique({
		where: { name: searchParam as string },
		select: { values: true }
	})

	if (!setting) return NextResponse.json(null)

	return NextResponse.json(setting)
}
