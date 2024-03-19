import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { shallow } from 'zustand/shallow'
import { AutoColumn, Icon, RowBetween } from '../../../components/styled'
import { TEXT } from '../../../theme'
import { Tab } from '../../../components/Tab'
import { Bottom, InfoSection } from '../../../components/StyledSection'
import Pagination from '../../../components/Pagination'
import { Button } from '../../../components/Button'
import PlusIcon from '../../../assets/svg/plus.svg'
import RolesForm from '../common/RolesForm'
import Title from '../../../components/Title'
import { useUserStore } from '../../../store/userStore'
import { MANAGE_ADMINS } from '../../../constants/roles'
import { useUser } from '../../../hooks/useUser'
import { useCopy } from '../../../hooks/useCopy'
import CopyWindow from '../../../components/CopyWindow'
import { usePagination } from '../../../hooks/usePagination'
import { RolesHeaderRow, RolesInfoRow } from './components/roles-rows'

const RolesInfoSection = styled(InfoSection)`
    border-radius: 10px;
`

const AddButton = styled(Button)`
    padding-bottom: 8.5px;
    padding-top: 8.5px;
    font-size: 14px;
    font-weight: 500;
    line-height: 23.1px;
    border-radius: 10px;
`

const Plus = styled(Icon)`
    margin-left: 8px;
`

const LIMIT = 8

const AdministrativeRoles = () => {
    const { getAllUsers } = useUser()
    const { user } = useUserStore(({ user }) => ({ user }), shallow)
    const hasRole = user.roles.find((role) => role.name === MANAGE_ADMINS)
    const navigate = useNavigate()

    // const [page, setPage] = useState(1)
    // const [totalPages, setTotalPages] = useState(0)
    const [usersList, setUsersList] = useState([])

    const navigateToCreatePage = () => navigate('/roles/create')

    // const skip = page === 1 ? 0 : page * LIMIT - LIMIT

    const getUsers = async () => {
        const response = await getAllUsers()
        // setTotalPages(response?.totalPages)
        setUsersList(response?.data)
    }

    const { renderList, totalPages, page, changePage } = usePagination(
        usersList,
        false,
        LIMIT
    )

    useEffect(() => {
        getUsers()
    }, [page])

    const {
        isCopied: isSuccess,
        closeCopyWindow: closeInfoWindow,
        openCopyWindow: openInfoWindow,
    } = useCopy()

    const {
        isCopied: isInfoChanged,
        closeCopyWindow: closeInfoChangedWindow,
        openCopyWindow: openInfoChangedWindow,
    } = useCopy()

    const {
        isCopied: isUserDeleted,
        closeCopyWindow: closeUserDeletedModal,
        openCopyWindow: openUserDeletedModal,
    } = useCopy()

    const onSuccess = useCallback(() => {
        openUserDeletedModal()
        getUsers()
    }, [])

    return (
        <>
            {hasRole === undefined && (
                <Title>You do not have rights to manage Admins.</Title>
            )}
            {isUserDeleted && (
                <CopyWindow
                    text="Admin Deleted"
                    onClose={closeUserDeletedModal}
                />
            )}
            {isSuccess && (
                <CopyWindow text="Password changed" onClose={closeInfoWindow} />
            )}
            {isInfoChanged && (
                <CopyWindow
                    text="Information updated"
                    onClose={closeInfoChangedWindow}
                />
            )}
            {hasRole !== undefined && (
                <AutoColumn gap="lg">
                    <RowBetween>
                        <Title>Administrative Roles</Title>
                        <AddButton onClick={navigateToCreatePage}>
                            <TEXT.white>Add New Admin</TEXT.white>
                            <Plus>
                                <img src={PlusIcon} alt="" />
                            </Plus>
                        </AddButton>
                    </RowBetween>
                    <div>
                        <Tab active={'true'}>Change Password</Tab>
                        <RolesForm
                            openInfoWindow={openInfoWindow}
                            openInfoChangedWindow={openInfoChangedWindow}
                        />
                    </div>
                    <AutoColumn gap="xl">
                        <TEXT.primary fontSize={24} fontWeight={600}>
                            List of admin’s
                        </TEXT.primary>
                        <RolesInfoSection>
                            <RolesHeaderRow />
                            {renderList?.length !== 0 &&
                                renderList?.map((admin, index) => (
                                    <RolesInfoRow
                                        key={admin.id}
                                        data={admin}
                                        number={index + 1}
                                        onSuccess={onSuccess}
                                    />
                                ))}
                        </RolesInfoSection>
                        <Bottom>
                            <Pagination
                                setPage={changePage}
                                page={page}
                                totalPages={totalPages}
                            />
                        </Bottom>
                    </AutoColumn>
                </AutoColumn>
            )}
        </>
    )
}

export default AdministrativeRoles
