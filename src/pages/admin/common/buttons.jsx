import styled from 'styled-components'
import { Button } from '../../../components/Button'
import { Centered } from '../../../components/styled'

export const SaveButton = styled(Button)`
    width: 100%;
    max-width: 240px;
    margin-left: 16px;
`

export const CancelButton = styled(Centered)`
    width: 100%;
    max-width: 240px;
    color: ${({ theme }) => theme.white};
    border-radius: 14px;
    font-size: 18px;
    font-weight: 600;
    line-height: 27px;
    padding: 16px;
    margin-left: 0;
    border: 1px solid ${({ theme }) => theme.border2};
    background-color: transparent;
    color: ${({ theme }) => theme.textPrimary};
    cursor: pointer;

    :hover {
        opacity: 0.7;
    }
`
