import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/libs/prisma'

export async function GET({ params }: { params: any }) {
	const { category } = params
	return NextResponse.json({ message: 'hh' })
}
