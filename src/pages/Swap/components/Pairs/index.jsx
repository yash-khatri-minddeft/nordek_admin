import React, { useMemo, useState } from 'react'
import { useQuery } from '@apollo/client'
import Pagination from '../../../../components/Pagination'
import { AutoColumn } from '../../../../components/styled'
import { Bottom, InfoSection } from '../../../../components/StyledSection'
import { PAIRS_INFO_QUERY } from '../../query'
import { PAGINATION_LIMIT_TWELVE } from '../../../../constants/pages'
import { usePagination } from '../../../../hooks/usePagination'
import useSortTable, { DEFAULT } from '../../../../utils/sortTable'
import { formatCommission } from '../../../../utils/formatCommission'
import { sumFloats } from '../../../../utils/sumFloats'
import { formatUSD } from '../../../../utils/formatUSD'
import { InfoRow, TitleRow } from './pairs-rows'

const initialOrder = {
    formattedVolume: DEFAULT,
    swapsAmount: DEFAULT,
    totalCommission: DEFAULT,
    commissionDistributed: DEFAULT,
    profit: DEFAULT,
}
const Pairs = () => {
    const { data, loading } = useQuery(PAIRS_INFO_QUERY)
    const [headerKey, setHeaderKey] = useState('swapsAmount')
    const [order, setOrder] = useState(initialOrder)
    const finalData = useMemo(() => {
        return data?.pairs?.map((pair) => {
            const commissionDistributed = formatCommission(pair?.totalSupply)
            const profit = formatCommission(pair?.bidelityProfit)
            return {
                id: pair?.id,
                token0: pair?.token0,
                token1: pair?.token1,
                commissionDistributed,
                swapsAmount: pair?.swapsAmount,
                profit,
                totalCommission: sumFloats(profit, commissionDistributed),
                formattedVolume: formatUSD(pair?.volumeUSD),
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
                <TitleRow
                    setHeaderKey={setHeaderKey}
                    setOrder={setOrder}
                    nextOrder={nextOrder}
                    order={order}
                    initialOrder={initialOrder}
                />
                {!loading &&
                    renderList?.length !== 0 &&
                    renderList?.map((item) => (
                        <InfoRow key={item.id} data={item} />
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

export default Pairs
