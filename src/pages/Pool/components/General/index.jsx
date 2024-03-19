import React, { useMemo, useState } from 'react'
import { useQuery } from '@apollo/client'
import { AutoColumn } from '../../../../components/styled'
import { Bottom, InfoSection } from '../../../../components/StyledSection'
import Pagination from '../../../../components/Pagination'
import { POOL_GENERAL_QUERY } from '../../query'
import { usePagination } from '../../../../hooks/usePagination'
import { PAGINATION_LIMIT } from '../../../../constants/pages'
import useSortTable, { DEFAULT } from '../../../../utils/sortTable'
import { formatCommission } from '../../../../utils/formatCommission'
import { sumFloats } from '../../../../utils/sumFloats'
import { GeneralHeaderRow, GeneralInfoRow } from './general-rows'

const initialOrder = {
    hourlyValue: DEFAULT,
    volumeUSD: DEFAULT,
    liquidityProviderCount: DEFAULT,
    reserve0: DEFAULT,
    reserve1: DEFAULT,
    swapsAmount: DEFAULT,
    totalCommission: DEFAULT,
    commissionDistributed: DEFAULT,
    profit: DEFAULT,
}
const General = () => {
    const { data, loading } = useQuery(POOL_GENERAL_QUERY)
    const [isAnyLocked, setIsAnyLocked] = useState(false)
    const [headerKey, setHeaderKey] = useState('reserve0')
    const [order, setOrder] = useState(initialOrder)
    const finalData = useMemo(() => {
        return data?.pairs?.map((pair) => {
            const commissionDistributed = formatCommission(pair?.totalSupply)
            const profit = formatCommission(pair?.bidelityProfit)
            const totalCommission = sumFloats(profit, commissionDistributed)
            const formattedVolume = formatCommission(pair?.volumeUSD)
            const hourlyValue =
                pair?.pairHourData.length === 0
                    ? 0
                    : formatCommission(
                          pair?.pairHourData[pair?.pairHourData.length - 1]
                              .hourlyVolumeUSD
                      )
            return {
                id: pair?.id,
                reserve0: pair?.reserve0,
                reserve1: pair?.reserve1,
                token0: pair?.token0,
                token1: pair?.token1,
                swapsAmount: pair?.swapsAmount,
                liquidityProviderCount: pair?.liquidityProviderCount,
                lock: pair?.lock,
                hourlyValue,
                profit,
                totalCommission,
                formattedVolume,
                commissionDistributed,
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
                <GeneralHeaderRow
                    isAnyLocked={isAnyLocked}
                    setHeaderKey={setHeaderKey}
                    setOrder={setOrder}
                    nextOrder={nextOrder}
                    order={order}
                    initialOrder={initialOrder}
                />
                {!loading &&
                    renderList?.length !== 0 &&
                    renderList?.map((pair, index) => (
                        <GeneralInfoRow
                            key={pair.id}
                            data={pair}
                            index={index + 1}
                            setIsAnyLocked={setIsAnyLocked}
                            isAnyLocked={isAnyLocked}
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

export default General
