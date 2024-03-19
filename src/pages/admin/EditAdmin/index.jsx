import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { shallow } from 'zustand/shallow'
import Title from '../../../components/Title'
import { useUserStore } from '../../../store/userStore'
import {
    ACCEPT_ALL_PERMISSIONS,
    ALL_EXISTING_ROLES_AMOUNT,
    INITIAL_PERMISSIONS_STATE,
    MANAGE_ADMINS,
} from '../../../constants/roles'
import { useUser } from '../../../hooks/useUser'
import CopyWindow from '../../../components/CopyWindow'
import { useCopy } from '../../../hooks/useCopy'
import EditForm from '../common/EditForm'

const EditAdmin = () => {
    const { getUserById } = useUser()
    const params = useParams()
    const { user } = useUserStore(({ user }) => ({ user }), shallow)
    const hasRole = user.roles.find((role) => role.name === MANAGE_ADMINS)

    const [userInfo, setUserInfo] = useState({})
    const [permissions, setPermissions] = useState(INITIAL_PERMISSIONS_STATE)

    const getUserInfo = async () => {
        const info = await getUserById(params.id)

        const permissionsState = { ...INITIAL_PERMISSIONS_STATE }
        const permissionKeys = Object.keys(permissionsState)

        for (const value of info?.roles) {
            if (permissionKeys.includes(value.name)) {
                permissionsState[value?.name] = true
            }
        }

        if (info?.roles?.length === ALL_EXISTING_ROLES_AMOUNT) {
            permissionsState[ACCEPT_ALL_PERMISSIONS] = true
        }

        setUserInfo(info)
        setPermissions(permissionsState)
    }

    useEffect(() => {
        getUserInfo()
    }, [])

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

    return (
        <>
            {hasRole === undefined && (
                <Title>You do not have rights to manage Admins.</Title>
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
                <EditForm
                    userInfo={userInfo}
                    openInfoChangedWindow={openInfoChangedWindow}
                    openInfoWindow={openInfoWindow}
                    permissions={permissions}
                    setPermissions={setPermissions}
                />
            )}
        </>
    )
}

export default EditAdmin
