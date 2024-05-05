'use client'

import { FC, PropsWithChildren } from 'react'
import styled from 'styled-components'

const StyledDiv = styled.div`
	max-width: 1400px;
	margin: 0 auto;
	padding: 0px 20px;
	position: relative;
`

const Center: FC<PropsWithChildren> = ({ children }) => {
	return <StyledDiv>{children}</StyledDiv>
}

export default Center
