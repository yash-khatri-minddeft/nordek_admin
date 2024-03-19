import { useCallback } from 'react'
import { usersService } from '../api/service/usersService'

export function useUser() {
    const deleteUser = useCallback(async (id) => {
        try {
            await usersService.delete(id)
            return true
        } catch (err) {
            console.error(err)
        }
    }, [])

    const getMyUser = useCallback(async () => {
        try {
            return await usersService.getMyself()
        } catch (err) {
            console.error(err)
        }
    }, [])

    const getAllUsers = useCallback(async () => {
        try {
            return await usersService.getAll()
        } catch (err) {
            console.error(err)
        }
    }, [])

    const getUserById = useCallback(async (id) => {
        try {
            return await usersService.getById(id)
        } catch (err) {
            console.error(err)
        }
    }, [])

    const editByAdmin = useCallback(async (data) => {
        try {
            await usersService.editByAdmin(data)
            return true
        } catch (err) {
            console.error(err)
        }
    }, [])

    const editByMe = useCallback(async (data) => {
        try {
            await usersService.editByMe(data)
            return true
        } catch (err) {
            console.error(err)
        }
    }, [])

    return {
        deleteUser,
        getAllUsers,
        getUserById,
        editByAdmin,
        editByMe,
        getMyUser,
    }
}
