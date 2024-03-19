import { ethers } from 'ethers'
import React, { useMemo, useState } from 'react'
import { useQuery } from '@apollo/client'
import Pagination from '../../../../components/Pagination'
import { AutoColumn } from '../../../../components/styled'
import { Bottom, InfoSection } from '../../../../components/StyledSection'
import { TRANSACTIONS_INFO_QUERY } from '../../query'
import { usePagination } from '../../../../hooks/usePagination'
import { PAGINATION_LIMIT_TWELVE } from '../../../../constants/pages'
import { shortId } from '../../../../utils/shortId'
import { formatCommission } from '../../../../utils/formatCommission'
import useSortTable, { DEFAULT } from '../../../../utils/sortTable'
import { TransactionsHeader, TransactionsInfoRow } from './transactions-rows'

const initialOrder = {
    timestamp: DEFAULT,
    buyPrice: DEFAULT,
    sellPrice: DEFAULT,
    feeAmount: DEFAULT,
    pair: DEFAULT,
}
const Transactions = () => {
    const { data, loading } = useQuery(TRANSACTIONS_INFO_QUERY)

    const [headerKey, setHeaderKey] = useState('timestamp')
    const [order, setOrder] = useState(initialOrder)

    const finalData = useMemo(() => {
        return data?.swaps?.map((swap) => {
            const formattedFee = ethers.utils.formatEther(swap?.fee)
            return {
                id: swap?.id,
                truncatedHash: swap?.hash.slice(0, 15) + '...',
                userId: shortId(swap?.from),
                timestamp: swap?.timestamp,
                buyPrice: formatCommission(swap?.token0Price),
                sellPrice: formatCommission(swap?.token1Price),
                formattedFee: formattedFee,
                feeAmount: formatCommission(formattedFee),
                pair: swap?.pair,
            }
        })
    }, [data])

    const { sortedData, nextOrder } = useSortTable(finalData, headerKey, order)

    const { renderList, totalPages, page, changePage } = usePagination(
        sortedData,
        loading,
        PAGINATION_LIMIT_TWELVE
    )
    return (
        <AutoColumn gap="xl">
            <InfoSection>
                <TransactionsHeader
                    setHeaderKey={setHeaderKey}
                    setOrder={setOrder}
                    nextOrder={nextOrder}
                    order={order}
                    initialOrder={initialOrder}
                />
                {!loading &&
                    renderList?.length !== 0 &&
                    renderList?.map((tx, index) => (
                        <TransactionsInfoRow
                            key={tx.id}
                            data={tx}
                            index={index + 1}
                        />
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

export default Transactions
