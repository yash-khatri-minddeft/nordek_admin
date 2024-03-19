import styled from 'styled-components'

export const Flex = styled.div`
    display: flex;
`

export const FlexColumn = styled(Flex)`
    flex-direction: column;
`

export const FlexAlign = styled.div`
    display: flex;
    align-items: center;
`

export const Centered = styled(Flex)`
    justify-content: center;
    align-items: center;
`

export const RowBetween = styled(Flex)`
    width: 100%;
    align-items: center;
    justify-content: space-between;
`

export const AutoColumn = styled.div`
    display: grid;
    grid-auto-rows: auto;
    grid-row-gap: ${({ gap }) =>
        (gap === 'sm' && '8px') ||
        (gap === 'md' && '12px') ||
        (gap === 'xl' && '16px') ||
        (gap === 'lg' && '24px') ||
        gap};
    justify-items: ${({ justify }) => justify && justify};
`

export const Image = styled.img`
    cursor: pointer;
`

export const Icon = styled(Centered)`
    cursor: pointer;
    img {
        width: ${({ width }) => (width ? width : '15px')};
        height: ${({ height }) => (height ? height : '15px')};
    }
`

export const ErrorText = styled.p`
    color: ${({ theme }) => theme.error};
    font-size: 12px;
    margin: 0;
    font-weight: 500;
    line-height: 23.1px;
`

export const StyledSpan = styled.span`
    position: relative;
    display: inline-block;
    width: ${({ w }) => w};
`

export const SortableSpan = styled(StyledSpan)`
    cursor: pointer;
    user-select: none;
    img {
        position: absolute;
        right: -20px;
        top: 50%;
        transform: translateY(-50%);
        height: 20px;
        width: 20px;
    }
`
