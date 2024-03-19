import React from 'react'
import styled from 'styled-components'
import { FlexAlign, RowBetween } from '../../../components/styled'
import { TextPrimary } from '../../../components/Text'
import { ACCEPT_ALL_PERMISSIONS } from '../../../constants/roles'

const Wrapper = styled.div`
    background-color: ${({ theme }) => theme.white};
    border-radius: 10px;
`

const RowHeader = styled(RowBetween)`
    padding: 11px 22px;
`

const RowItem = styled(RowBetween)`
    padding: 18px 22px;
    border-top: 1px solid ${({ theme }) => theme.border1};
`

const FirstColumn = styled.div`
    width: 100%;
    max-width: 170px;
    text-align: center;
`

const Text = styled(TextPrimary)`
    font-size: 12px;
    font-weight: 500;
    line-height: 20.4px;
`
const ToggleWrapper = styled(FlexAlign)`
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

const Permissions = ({ data, onChange, acceptAll, declineAll }) => {
    const permissionsKeys = Object.keys(data)

    return (
        <Wrapper>
            <PermissionsHeaderRow />
            {permissionsKeys.map((key) => (
                <PermissionsRow
                    key={key}
                    value={data[key]}
                    actionName={key}
                    onChange={onChange}
                    acceptAll={acceptAll}
                    declineAll={declineAll}
                />
            ))}
        </Wrapper>
    )
}

export const PermissionsHeaderRow = () => {
    return (
        <RowHeader>
            <FirstColumn>
                <Text>Action name</Text>
            </FirstColumn>
            <Text>Action</Text>
        </RowHeader>
    )
}
export const PermissionsRow = ({
    value,
    onChange,
    actionName,
    acceptAll,
    declineAll,
}) => {
    const onClick = () => {
        if (actionName === ACCEPT_ALL_PERMISSIONS) {
            onChange((prev) => {
                if (prev[actionName] === false) {
                    return acceptAll
                } else {
                    return declineAll
                }
            })
        } else {
            onChange((prev) => {
                if (prev[actionName] === true) {
                    return {
                        ...prev,
                        [actionName]: !prev[actionName],
                        [ACCEPT_ALL_PERMISSIONS]: false,
                    }
                } else {
                    return {
                        ...prev,
                        [actionName]: !prev[actionName],
                    }
                }
            })
        }
    }
    return (
        <RowItem>
            <FirstColumn>
                <Text>{actionName}</Text>
            </FirstColumn>
            <ToggleWrapper value={String(value)} onClick={onClick}>
                <Toggler />
            </ToggleWrapper>
        </RowItem>
    )
}

export default Permissions
