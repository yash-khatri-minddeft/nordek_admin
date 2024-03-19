import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import copy from 'copy-to-clipboard'
import {
    Centered,
    FlexAlign,
    Icon,
    RowBetween,
    SortableSpan,
    StyledSpan,
} from '../../../components/styled'
import LockGreyIcon from '../../../assets/svg/lock-grey.svg'
import LockGreenIcon from '../../../assets/svg/lock-green.svg'
import ChevronUp from '../../../assets/svg/chevron-up.svg'
import ChevronDown from '../../../assets/svg/chevron-down.svg'
import CopyIcon from '../../../assets/svg/copy.svg'
import { ROUTES } from '../../../router/constants/routes'
import Modal, { ModalContent } from '../../../components/Modal'
import { useModal } from '../../../hooks/useModal'
import { shortId } from '../../../utils/shortId'
import { useWallet } from '../../../hooks/useWallet'
import { ASC, DESC } from '../../../utils/sortTable'

const StyledTitleRow = styled(RowBetween)`
    padding: 16px 0;
    font-size: 12px;
    font-weight: 600;
    line-height: 20.4px;
    color: ${({ theme }) => theme.textPrimary};
`

const StyledInfoRow = styled(StyledTitleRow)`
    font-weight: 500;
    border-top: 1px solid ${({ theme }) => theme.border1};
`

const InfoRowIcon = styled(Icon)`
    margin-left: 10px;
`

const TextBlue = styled.p`
    color: ${({ theme }) => theme.textBlue};
    font-size: 12px;
`

const Paragraph = styled.p`
    flex-grow: 1;
    text-align: center;
`

const LeftParagraph = styled(Paragraph)`
    padding-left: 24px;
    text-align: left;
    max-width: 320px;
`
const RightParagraph = styled(Paragraph)`
    padding-right: 30px;
    text-align: right;
    max-width: 300px;
`
const DateParagraph = styled(Paragraph)`
    text-align: center;
    max-width: 370px;
`
const FlexText = styled(TextBlue)`
    padding-left: 16px;
    flex-grow: 1;
`

const StyledFlexAlign = styled(Centered)`
    flex-grow: 1;
`

const StyledFlex = styled(FlexAlign)`
    padding-right: 50px;
    justify-content: flex-end;
    flex-grow: 1;
    max-width: 300px;
`

const IconsBlock = styled(FlexAlign)`
    justify-content: flex-end;
    width: 100px;
`

export const TitleRow = ({
    setHeaderKey,
    setOrder,
    nextOrder,
    order,
    initialOrder,
}) => {
    const handleClick = (key) => {
        setHeaderKey(key)
        setOrder({ ...initialOrder, [key]: nextOrder })
    }
    return (
        <StyledTitleRow>
            <LeftParagraph>
                <StyledSpan w="70px">User ID</StyledSpan>
            </LeftParagraph>
            <Paragraph>
                <StyledSpan w="310px">Wallet address</StyledSpan>
            </Paragraph>
            <DateParagraph>
                <SortableSpan
                    onClick={() => handleClick('lastLogIn')}
                    w="113px"
                >
                    Date & Time
                    {order.lastLogIn === DESC && <img src={ChevronDown} />}
                    {order.lastLogIn === ASC && <img src={ChevronUp} />}
                </SortableSpan>
            </DateParagraph>
            <RightParagraph>
                <StyledSpan w="100px">Block / Unblock</StyledSpan>
            </RightParagraph>
        </StyledTitleRow>
    )
}

export const InfoRow = ({ wallet, openCopyWindow, openInfoWindow }) => {
    const { id, address, lastLogIn, isActive } = wallet
    const { toggleWallet } = useWallet()
    const navigate = useNavigate()

    const [isWalletActive, setIsWalletActive] = useState(isActive)

    const navigateToUser = () => {
        navigate(`${ROUTES.users}/${id}`)
    }

    const copyAddress = () => {
        copy(address)
        openCopyWindow()
    }

    const {
        isOpen: isBlockModalOpen,
        closeModal: closeBlockModal,
        open: openBlockModal,
    } = useModal()

    const {
        isOpen: isUnblockModalOpen,
        closeModal: closeUnblockModal,
        open: openUnblockModal,
    } = useModal()

    const blockWallet = useCallback(async () => {
        closeBlockModal()
        await toggleWallet({ id, value: false })
        setIsWalletActive(false)
        openInfoWindow()
    }, [])

    const unblockWallet = useCallback(async () => {
        closeUnblockModal()
        await toggleWallet({ id, value: true })
        setIsWalletActive(true)
        openInfoWindow()
    }, [])

    const lastLoggedIn = new Date(lastLogIn).toLocaleString('en-GB')

    return (
        <StyledInfoRow>
            <FlexText onClick={navigateToUser} style={{ cursor: 'pointer' }}>
                <StyledSpan w="70px">{shortId(id, 4)}</StyledSpan>
            </FlexText>

            <StyledFlexAlign>
                <TextBlue onClick={navigateToUser}>{address}</TextBlue>
                <InfoRowIcon onClick={copyAddress}>
                    <img src={CopyIcon} alt="icon" />
                </InfoRowIcon>
            </StyledFlexAlign>

            <Paragraph>{lastLoggedIn}</Paragraph>

            <StyledFlex>
                <IconsBlock>
                    <Icon onClick={isWalletActive ? openBlockModal : null}>
                        <img
                            src={isWalletActive ? LockGreyIcon : LockGreenIcon}
                            alt="icon"
                        />
                    </Icon>
                    <InfoRowIcon
                        onClick={!isWalletActive ? openUnblockModal : null}
                    >
                        <img
                            src={isWalletActive ? LockGreenIcon : LockGreyIcon}
                            alt="icon"
                        />
                    </InfoRowIcon>
                </IconsBlock>
            </StyledFlex>
            <Modal closeModal={closeBlockModal} isOpen={isBlockModalOpen}>
                <ModalContent
                    text="Are you sure you want to block the user?"
                    onCancel={closeBlockModal}
                    onConfirm={blockWallet}
                />
            </Modal>
            <Modal closeModal={closeUnblockModal} isOpen={isUnblockModalOpen}>
                <ModalContent
                    text="Are you sure you want to unblock the user?"
                    onCancel={closeUnblockModal}
                    onConfirm={unblockWallet}
                />
            </Modal>
        </StyledInfoRow>
    )
}
