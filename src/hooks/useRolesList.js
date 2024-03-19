import { useEffect, useMemo, useState } from 'react'
import { rolesService } from '../api/service/rolesService'

export function useRolesList() {
    const [rolesList, setRolesList] = useState([])

    const getRolesList = async () => {
        try {
            const data = await rolesService.getList()
            setRolesList(data)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getRolesList()
    }, [])

    return useMemo(() => rolesList, [rolesList])
}
