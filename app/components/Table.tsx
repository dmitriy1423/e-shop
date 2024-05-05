'use client'

import { FC, PropsWithChildren } from 'react'

const Table: FC<PropsWithChildren> = ({ children }) => {
	return <table className='w-full'>{children}</table>
}

export default Table
