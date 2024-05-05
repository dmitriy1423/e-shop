'use client'

import Link from 'next/link'
import { FC } from 'react'

interface ButtonLinkProps {
	props?: any[]
}

const ButtonLink: FC<ButtonLinkProps> = ({ props }) => {
	return <Link {...props} />
}

export default ButtonLink
