import React from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'
import { Centered, Flex } from './styled'
import { Button } from './Button'

const Wrapper = styled(Centered)`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(26, 32, 63, 0.14);
    backdrop-filter: blur(4px);
    z-index: 999;
`

const CancelButton = styled(Button)`
    margin-top: 24px;
    width: 240px;
    height: 40px;
    font-size: 14px;
    font-weight: 600;
    line-height: 23.1px;
    background-color: ${({ theme }) => theme.error};
`

const ApproveButton = styled(CancelButton)`
    margin-top: 16px;
    width: 240px;
    height: 40px;
    border: 1px solid ${({ theme }) => theme.border2};
    background-color: transparent;
    color: ${({ theme }) => theme.textPrimary};
`

const WrapperContent = styled(Flex)`
    flex-direction: column;
    align-items: center;
    padding: 24px;
    background-color: ${({ theme }) => theme.white};
    border-radius: 14px;
`

const TitleText = styled.p`
    color: ${({ theme }) => theme.text2};
    font-size: 16px;
    font-weight: 500;
    line-height: 25.6px;
`

const Modal = ({ isOpen, closeModal, children }) => {
    const container = document.getElementById('portal')

    if (!isOpen) return null

    return container
        ? createPortal(
              <Wrapper onClick={closeModal}>{children}</Wrapper>,
              container
          )
        : null
}

export const ModalContent = ({ text, onCancel, onConfirm }) => {
    const handleClick = (e) => {
        e.stopPropagation()
    }

    return (
        <WrapperContent onClick={handleClick}>
            <TitleText>{text}</TitleText>
            <TitleText>
                NOTE : The restriction will stay only on the frontend level and
                not on the contract level.
            </TitleText>
            <CancelButton onClick={onCancel}>Cancel</CancelButton>
            <ApproveButton onClick={onConfirm}>Yes, I’m sure</ApproveButton>
        </WrapperContent>
    )
}

export default Modal
