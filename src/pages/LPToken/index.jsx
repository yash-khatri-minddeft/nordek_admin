import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/client'
import { shallow } from 'zustand/shallow'
import { AutoColumn } from '../../components/styled'
import { Bottom, InfoSection } from '../../components/StyledSection'
import Pagination from '../../components/Pagination'
import CopyWindow from '../../components/CopyWindow'
import { useCopy } from '../../hooks/useCopy'
import Title from '../../components/Title'
import { MANAGE_TOKEN } from '../../constants/roles'
import { useUserStore } from '../../store/userStore'
import { PAGINATION_LIMIT } from '../../constants/pages'
import { usePagination } from '../../hooks/usePagination'
import useSortTable, { DEFAULT } from '../../utils/sortTable'
import { LpHeaderRow, LpInfoRow } from './components/lptoken-rows'
import { LP_TOKEN_QUERY } from './query'

const LpInfoSection = styled(InfoSection)`
    border-radius: 10px;
`

const initialOrder = {
    issued: DEFAULT,
    burned: DEFAULT,
    totalSupply: DEFAULT,
}

const LPToken = () => {
    const { data, loading } = useQuery(LP_TOKEN_QUERY)
    const [headerKey, setHeaderKey] = useState('issued')
    const [order, setOrder] = useState(initialOrder)
    const { isCopied, closeCopyWindow, openCopyWindow } = useCopy()
    const { user } = useUserStore(({ user }) => ({ user }), shallow)
    const hasRole = user.roles.find((role) => role.name === MANAGE_TOKEN)

    const finalData = useMemo(() => {
        return data?.pairs?.map((pair) => {
            return {
                id: pair?.id,
                token0: pair?.token0,
                token1: pair?.token1,
                issued: pair?.issued,
                burned: pair?.burned,
                totalSupply: pair?.totalSupply,
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
        <>
            {hasRole === undefined && (
                <Title>You do not have rights to manage LP Token.</Title>
            )}
            {isCopied && <CopyWindow onClose={closeCopyWindow} />}
            {hasRole !== undefined && (
                <AutoColumn gap="lg">
                    <Title>LP Token</Title>
                    <AutoColumn gap="xl">
                        <LpInfoSection>
                            <LpHeaderRow
                                setHeaderKey={setHeaderKey}
                                setOrder={setOrder}
                                nextOrder={nextOrder}
                                order={order}
                                initialOrder={initialOrder}
                            />
                            {!loading &&
                                renderList?.length !== 0 &&
                                renderList?.map((pair) => (
                                    <LpInfoRow
                                        key={pair.id}
                                        data={pair}
                                        openCopyWindow={openCopyWindow}
                                    />
                                ))}
                        </LpInfoSection>
                        <Bottom>
                            <Pagination
                                page={page}
                                setPage={changePage}
                                totalPages={totalPages}
                            />
                        </Bottom>
                    </AutoColumn>
                </AutoColumn>
            )}
        </>
    )
}

export default LPToken
