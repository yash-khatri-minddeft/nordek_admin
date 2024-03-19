import { useCallback, useState } from 'react'

export function useModal() {
    const [isOpen, setIsOpen] = useState(false)

    const closeModal = useCallback(() => {
        setIsOpen(false)
    }, [])

    const open = useCallback(() => setIsOpen(true), [])

    return { isOpen, closeModal, open }
}
