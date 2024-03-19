import { useCallback, useState } from 'react'

export function useCopy() {
    const [isCopied, setIsCopied] = useState(false)
    const closeCopyWindow = useCallback(() => setIsCopied(false), [])

    const openCopyWindow = useCallback(() => {
        setIsCopied(true)
        setTimeout(() => {
            setIsCopied(false)
        }, 3000)
    }, [])

    return {
        openCopyWindow,
        closeCopyWindow,
        isCopied,
    }
}
