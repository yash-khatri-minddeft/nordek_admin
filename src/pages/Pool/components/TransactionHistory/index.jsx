import React, { useMemo, useState } from 'react'
import { useQuery } from '@apollo/client'
import { AutoColumn } from '../../../../components/styled'
import { Bottom, InfoSection } from '../../../../components/StyledSection'
import Pagination from '../../../../components/Pagination'
import { POOL_TRANSACTIONS_QUERY } from '../../query'
import { usePagination } from '../../../../hooks/usePagination'
import { PAGINATION_LIMIT } from '../../../../constants/pages'
import useSortTable, { DEFAULT } from '../../../../utils/sortTable'
import {
    TransactionsHistoryHeaderRow,
    TransactionsHistoryInfoRow,
} from './transactions-history-rows'

const initialOrder = {
    timestamp: DEFAULT,
    transactionAmount: DEFAULT,
    fee: DEFAULT,
}

const TransactionHistory = () => {
    const { data, loading } = useQuery(POOL_TRANSACTIONS_QUERY)
    const [headerKey, setHeaderKey] = useState('timestamp')
    const [order, setOrder] = useState(initialOrder)
    const finalData = useMemo(() => {
        return data?.poolTransactions?.map((tx) => {
            return {
                id: tx?.id,
                user: tx?.user,
                timestamp: tx?.timestamp,
                transactionAmount: tx?.transactionAmount,
                fee: tx?.fee,
                type: tx?.type,
                pair: tx?.pair,
            }
        })
    }, [data])

    const { sortedData, nextOrder } = useSortTable(finalData, headerKey, order)
    const { renderList, totalPages, page, changePage } = usePagination(
        sortedData,
        loading,
        PAGINATION_LIMIT
    )

    return (
        <AutoColumn gap="xl">
            <InfoSection>
                <TransactionsHistoryHeaderRow
                    setHeaderKey={setHeaderKey}
                    setOrder={setOrder}
                    nextOrder={nextOrder}
                    order={order}
                    initialOrder={initialOrder}
                />
                {!loading &&
                    renderList?.length !== 0 &&
                    renderList?.map((tx) => (
                        <TransactionsHistoryInfoRow key={tx.id} data={tx} />
                    ))}
            </InfoSection>
            <Bottom>
                <Pagination
                    page={page}
                    setPage={changePage}
                    totalPages={totalPages}
                />
            </Bottom>
        </AutoColumn>
    )
}

export default TransactionHistory
