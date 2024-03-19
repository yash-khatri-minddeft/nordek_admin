import { useMemo } from 'react'

export const ASC = 'asc'
export const DEFAULT = 'default'
export const DESC = 'desc'
export default function useSortTable(data, key, order) {
    return useMemo(() => {
        let nextOrder
        let sortedData = data ? [...data] : []
        if (order[key] === DEFAULT) {
            nextOrder = DESC
            sortedData = data
        } else if (order[key] === DESC) {
            nextOrder = ASC
            sortedData?.sort(
                (a, b) => {
                    if (parseFloat(b?.[key]) > parseFloat(a?.[key])) {
                        return 1
                    }
                    if (parseFloat(b?.[key]) < parseFloat(a?.[key])) {
                        return -1
                    }
                    return 0
                }
                // parseFloat(b?.[key]) - parseFloat(a?.[key])
            )
        } else if (order[key] === ASC) {
            nextOrder = DEFAULT
            sortedData?.sort(
                (a, b) => {
                    if (parseFloat(b?.[key]) > parseFloat(a?.[key])) {
                        return -1
                    }
                    if (parseFloat(b?.[key]) < parseFloat(a?.[key])) {
                        return 1
                    }
                    return 0
                }
                // parseFloat(a?.[key]) - parseFloat(b?.[key])
            )
        }
        return { sortedData, nextOrder }
    }, [data, key, order])
}
