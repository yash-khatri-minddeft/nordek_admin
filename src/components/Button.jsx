import styled from 'styled-components'

export const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
    border: none;
    background-color: ${({ theme }) => theme.primary1};
    color: ${({ theme }) => theme.white};
    border-radius: 14px;
    font-size: 18px;
    font-weight: 600;
    line-height: 27px;
    padding: 16px;

    :hover {
        opacity: 0.9;
        cursor: pointer;
    }
`
