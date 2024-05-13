import prisma from '@/libs/prisma'

export async function getSettingValue(name: string) {
	const setting = await prisma.setting.findUnique({
		where: { name }
	})

	if (!setting) throw new Error('Setting not found')

	return setting
}
