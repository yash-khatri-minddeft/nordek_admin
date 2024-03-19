import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import {
    FlexAlign,
    Icon,
    RowBetween,
    StyledSpan,
} from '../../../../components/styled'
import ActionWriteIcon from '../../../../assets/svg/action-write.svg'
import ActionDeleteIcon from '../../../../assets/svg/action-delete.svg'
import InfoGreyIcon from '../../../../assets/svg/info-grey.svg'
import { TEXT } from '../../../../theme'
import PermissionsDropdown from '../../../../components/PermissionsDropdown'
import Modal, { ModalContent } from '../../../../components/Modal'
import { useUser } from '../../../../hooks/useUser'
import { shortId } from '../../../../utils/shortId'
import { dataFormatter } from '../../../../utils/dataFormatter'

const StyledHeaderRow = styled(RowBetween)`
    padding: 11px 0;
`

const StyledInfoRow = styled(RowBetween)`
    border-top: 1px solid ${({ theme }) => theme.border1};
    padding: 18px 0;
`

const RolesTitleText = styled.div`
    font-size: 12px;
    color: ${({ theme }) => theme.textPrimary};
    font-weight: 600;
    line-height: 20.4px;
    text-align: center;
    flex-grow: 1;
`

const LeftTitleText = styled(RolesTitleText)`
    text-align: left;
    max-width: 60px;
    padding-left: 16px;
`

const RightTitleText = styled(RolesTitleText)`
    text-align: right;
    padding-right: 16px;
`
const LeftRolesText = styled(RolesTitleText)`
    text-align: left;
    max-width: 60px;
    padding-left: 24px;
`

const RolesInfoText = styled.div`
    font-size: 12px;
    color: ${({ theme }) => theme.textPrimary};
    font-weight: 500;
    line-height: 20.4px;
    text-align: center;
    flex-grow: 1;
`

const PermissionsRow = styled(RolesInfoText)`
    position: relative;
    display: flex;
    cursor: pointer;
    justify-content: center;
`

const RolesInfoTextBlue = styled(RolesInfoText)`
    color: ${({ theme }) => theme.textBlue};
`

const InfoRowIcon = styled(Icon)`
    margin-left: 10px;
`

const IconsBlock = styled(FlexAlign)`
    justify-content: flex-end;
    flex-grow: 1;
    max-width: 80px;
    padding-right: 16px;
`

const IconsInnerBlock = styled(FlexAlign)`
    justify-content: flex-end;
`

export const RolesHeaderRow = () => {
    return (
        <StyledHeaderRow>
            <LeftTitleText>
                <StyledSpan w="60px">Num.</StyledSpan>
            </LeftTitleText>
            <RolesTitleText style={{ maxWidth: '240px' }}>
                <StyledSpan w="100px">ID</StyledSpan>
            </RolesTitleText>
            <RolesTitleText style={{ maxWidth: '340px' }}>
                <StyledSpan w="200px">Full name</StyledSpan>
            </RolesTitleText>
            <RolesTitleText style={{ maxWidth: '340px' }}>
                <StyledSpan w="200px">E-mail</StyledSpan>
            </RolesTitleText>
            <RolesTitleText style={{ maxWidth: '236px' }}>
                <StyledSpan w="90px">Permissions</StyledSpan>
            </RolesTitleText>
            <RolesTitleText style={{ maxWidth: '254px' }}>
                <StyledSpan w="120px">Registration date</StyledSpan>
            </RolesTitleText>
            <RightTitleText style={{ maxWidth: '80px' }}>Action</RightTitleText>
        </StyledHeaderRow>
    )
}

export const RolesInfoRow = ({ data, number, onSuccess }) => {
    const { deleteUser } = useUser()
    const navigate = useNavigate()
    const { name, email, id, roles, createdAt } = data

    const [isDropDownOpen, setIsDropDownOpen] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const onConfirm = useCallback(async () => {
        closeModal()
        const response = await deleteUser(id)
        if (response === true) {
            onSuccess()
        }
    }, [])

    const closeModal = useCallback(() => {
        setIsModalOpen(false)
    }, [])

    const openModal = () => {
        setIsModalOpen(true)
    }

    const showDropdown = () => setIsDropDownOpen(true)
    const hideDropdown = () => setIsDropDownOpen(false)

    const num = number < 10 ? `0${number}` : number

    const navigateToEditAdmin = () => navigate(`/roles/edit/${id}`)

    const registrationDate = dataFormatter.format(new Date(createdAt))

    return (
        <StyledInfoRow>
            <LeftRolesText>
                <StyledSpan w="60px">{num}</StyledSpan>
            </LeftRolesText>
            <RolesInfoText>
                <StyledSpan w="100px">{shortId(id, 3)}</StyledSpan>
            </RolesInfoText>
            <RolesInfoText>
                <StyledSpan w="200px">{name}</StyledSpan>
            </RolesInfoText>
            <RolesInfoTextBlue>
                <StyledSpan w="200px">{email}</StyledSpan>
            </RolesInfoTextBlue>
            <PermissionsRow
                onMouseOver={showDropdown}
                onMouseLeave={hideDropdown}
            >
                <TEXT.default>Permissions</TEXT.default>
                <InfoRowIcon>
                    <img src={InfoGreyIcon} alt="icon" />
                </InfoRowIcon>
                {isDropDownOpen && <PermissionsDropdown roles={roles} />}
            </PermissionsRow>
            <RolesInfoText>{registrationDate}</RolesInfoText>
            <IconsBlock>
                <IconsInnerBlock>
                    <Icon onClick={navigateToEditAdmin}>
                        <img src={ActionWriteIcon} alt="icon" />
                    </Icon>
                    <InfoRowIcon onClick={openModal}>
                        <img src={ActionDeleteIcon} alt="icon" />
                    </InfoRowIcon>
                </IconsInnerBlock>
            </IconsBlock>
            <Modal closeModal={closeModal} isOpen={isModalOpen}>
                <ModalContent
                    text="Are you sure you want to delete the user?"
                    onCancel={closeModal}
                    onConfirm={onConfirm}
                />
            </Modal>
        </StyledInfoRow>
    )
}
