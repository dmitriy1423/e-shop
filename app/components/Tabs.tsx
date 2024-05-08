'use client'

import { FC } from 'react'

interface TabsProps {
	tabs: string[]
	active?: string
	onChange: (tabName: string) => void
}

const Tabs: FC<TabsProps> = ({ tabs, active, onChange }) => {
	return (
		<div className="flex gap-5">
			{tabs.map((tabName, index) => (
				<span
					key={index}
					onClick={() => {
						onChange(tabName)
					}}
					className={`text-3xl cursor-pointer ${
						tabName === active
							? 'text-black border-b-2 border-black'
							: 'text-gray-500'
					}`}
				>
					{tabName}
				</span>
			))}
		</div>
	)
}

export default Tabs
