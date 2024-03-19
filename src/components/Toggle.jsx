import React from 'react'
import styled from 'styled-components'
import { FlexAlign } from './styled'

const Wrapper = styled(FlexAlign)`
    padding: 2px;
    justify-content: ${({ value }) =>
        value === 'true' ? 'flex-end' : 'flex-start'};
    width: 36px;
    height: 20px;
    background-color: ${({ theme, value }) =>
        value === 'true' ? theme.primary1 : theme.bg3};
    border-radius: 18px;
    cursor: pointer;
`

const Toggler = styled.div`
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.white};
`
const Toggle = ({ onChange, value }) => {
    const onClick = () => {
        onChange(!value)
    }

    return (
        <Wrapper value={String(value)} onClick={onClick}>
            <Toggler />
        </Wrapper>
    )
}

export default Toggle
