import { useCallback, useMemo, useState } from 'react'

export function usePagination(data, loading, limit) {
    const [page, setPage] = useState(1)

    const renderList = useMemo(() => {
        if (page === 1) {
            return data?.slice(0, limit)
        } else {
            return data?.slice(page * limit - limit, page * limit)
        }
    }, [data, loading, page])

    const changePage = useCallback(
        (newPage) => {
            setPage(newPage)
        },
        [page]
    )

    const totalPages = Math.ceil(data?.length / limit)

    if (loading) return []

    return { totalPages, renderList, page, changePage }
}
