import React from 'react'
import styled from 'styled-components'
import { TEXT } from '../theme'
import InfoIcon from '../assets/svg/info.svg'
import CloseIcon from '../assets/svg/close.svg'
import { AutoColumn, Centered, Flex, Icon } from './styled'

const Wrapper = styled.div`
    width: 100%;
    max-width: 308px;
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 24px;
    background-color: ${({ theme }) => theme.white};
    border: 1px solid ${({ theme }) => theme.primary1};
    box-shadow: 0 4px 44px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
`

const IconWrapper = styled(Centered)`
    img {
        width: 30px;
        height: 30px;
    }
`

const Close = styled(Icon)`
    position: absolute;
    top: 9px;
    right: 9px;
    img {
        width: 24px;
        height: 24px;
    }
`

const TextWrapper = styled(AutoColumn)`
    margin-left: 16px;
`

const CopyWindow = ({ onClose, text = 'Address copied successfully' }) => {
    return (
        <Wrapper>
            <Close onClick={onClose}>
                <img src={CloseIcon} alt="close" />
            </Close>
            <Flex>
                <IconWrapper>
                    <img src={InfoIcon} alt="info" />
                </IconWrapper>
                <TextWrapper>
                    <TEXT.primary
                        ontWeight={700}
                        fontSize={18}
                        lineHeight="27px"
                    >
                        Information
                    </TEXT.primary>
                    <TEXT.primary
                        ontWeight={400}
                        fontSize={14}
                        lineHeight="23.1px"
                    >
                        {text}
                    </TEXT.primary>
                </TextWrapper>
            </Flex>
        </Wrapper>
    )
}

export default CopyWindow
