'use client'

import { FC, PropsWithChildren, MouseEvent } from 'react'
import { IconType } from 'react-icons'
import styled, { css } from 'styled-components'

/* export const ButtonStyle = css`
	border: 0;
	padding: 5px 15px;
	border-radius: 5px;
	cursor: pointer;
	display: inline-flex;
	align-items: center;
	text-decoration: none;
	font-family: 'Poppins', sans-serif;
	font-weight: 500;
	svg {
		height: 16px;
		margin-right: 5px;
	}
	${props =>
		props.block &&
		css`
			display: block;
			width: 100%;
		`}
	${props =>
		props.white &&
		!props.outline &&
		css`
			background-color: #fff;
			color: #000;
		`}
  ${props =>
		props.white &&
		props.outline &&
		css`
			background-color: transparent;
			color: #fff;
			border: 1px solid #fff;
		`}
  ${props =>
		props.black &&
		!props.outline &&
		css`
			background-color: #000;
			color: #fff;
		`}
  ${props =>
		props.black &&
		props.outline &&
		css`
			background-color: transparent;
			color: #000;
			border: 1px solid #000;
		`}
  ${props =>
		props.primary &&
		!props.outline &&
		css`
			background-color: ${primary};
			border: 1px solid ${primary};
			color: #fff;
		`}
  ${props =>
		props.primary &&
		props.outline &&
		css`
			background-color: transparent;
			border: 1px solid ${primary};
			color: ${primary};
		`}
  ${props =>
		props.size === 'l' &&
		css`
			font-size: 1.2rem;
			padding: 10px 20px;
			svg {
				height: 20px;
			}
		`}
`

const StyledButton = styled.button`
	${ButtonStyle}
` */

/* interface PrimaryBtnProps {
	size?: 'large'
	primary?: boolean
	outline?: boolean
}

const Button: FC<PropsWithChildren<PrimaryBtnProps>> = ({
	children,
	size,
	primary,
	outline,
}) => {
	return (
		<button
			className={`flex items-center gap-2 px-4 py-1 rounded-md border border-1 ${
				size === 'large' ? 'text-lg px-15 py-3' : ''
			} ${
				primary === true
					? 'bg-blue-600 border-blue-600 text-white'
					: 'bg-white text-black'
			} ${outline && 'bg-transparent'}`}
		>
			{children}
		</button>
	)
}

export default Button */

interface ButtonProps {
	label?: string
	disabled?: boolean
	primary?: boolean
	outline?: boolean
	white?: boolean
	small?: boolean
	custom?: string
	icon?: IconType
	onClick?: (e: MouseEvent<HTMLButtonElement>) => void
}

const Button: FC<ButtonProps> = ({
	label,
	disabled,
	primary,
	outline,
	white,
	small,
	custom,
	icon: Icon,
	onClick,
}) => {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			/* className={`disabled:opacity-70 disabled:cursor-not-allowed rounded-md hover:opacity-80 transition border-primary font-bold flex items-center justify-center gap-2 ${
				outline ? 'bg-transparent' : 'bg-primary'
			} ${outline ? 'text-primary' : 'text-white'} 
				 ${small ? 'text-sm font-light' : 'text-md font-semibold'} ${
				small ? 'py-1 px-2 border-[1px]' : 'py-3 px-4 border-2'
			} ${custom ? custom : ''}`} */
			className={`border w-full disabled:opacity-70 disabled:cursor-not-allowed rounded-md hover:opacity-80 transition flex items-center justify-center gap-2 ${
				primary ? 'bg-primary text-white' : ''
			} ${white ? 'bg-white text-black border-white' : 'text-primary'} ${
				outline ? 'bg-transparent text-primary border-primary' : ''
			} ${small ? 'text-sm font-normal px-2 py-1' : 'font-bold px-3 py-2'} ${
				custom ? custom : ''
			}`}
		>
			{Icon && <Icon size={20} />}
			{label}
		</button>
	)
}

export default Button
