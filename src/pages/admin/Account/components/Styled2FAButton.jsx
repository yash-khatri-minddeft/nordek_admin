import styled from 'styled-components'
import { Button } from '../../../../components/Button'

export const Styled2FAButton = styled(Button)`
    font-weight: 500;
    font-size: 14px;
    line-height: 23.1px;
    height: 40px;
    max-width: 128px;
    border-radius: 10px;

    :disabled {
        cursor: auto;
        background-color: ${({ theme }) => theme.bg3};
        color: ${({ theme }) => theme.black};
        :hover {
            opacity: 1;
        }
    }
`
