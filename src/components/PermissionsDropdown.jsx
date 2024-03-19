import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    position: absolute;
    bottom: 0;
    left: 140px;
    width: 246px;
    max-width: 246px;
    overflow: hidden;
    background-color: ${({ theme }) => theme.white};
    border: 1px solid ${({ theme }) => theme.border1};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06), 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 14px;
    z-index: 2;
`

const RowItem = styled.div`
    width: 246px;
    padding: 8px 16px;
    font-weight: 500;
    font-size: 14px;
    line-height: 23.1px;
    color: ${({ theme }) => theme.textPrimary};
    cursor: pointer;
    text-align: left;

    :hover {
        background-color: ${({ theme }) => theme.bg4};
        color: ${({ theme }) => theme.textBlue};
    }
`

const PermissionsDropdown = ({ roles }) => {
    const handleClick = (e) => e.stopPropagation()

    const rolesNames = roles.map((role) => role.name)

    return (
        <Wrapper onClick={handleClick}>
            {rolesNames.length !== 0 &&
                rolesNames.map((name) => <RowItem key={name}>{name}</RowItem>)}
            {rolesNames.length === 0 && <RowItem>No permissions</RowItem>}
        </Wrapper>
    )
}

export default PermissionsDropdown
