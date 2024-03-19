import React from 'react'
import { useQuery } from '@apollo/client'
import Pagination from '../../../../components/Pagination'
import { AutoColumn } from '../../../../components/styled'
import { Bottom, InfoSection } from '../../../../components/StyledSection'
import { TOKENS_INFO_QUERY } from '../../query'
import { PAGINATION_LIMIT } from '../../../../constants/pages'
import { usePagination } from '../../../../hooks/usePagination'
import { TokensHeaderRow, TokensInfoRow } from './tokens-rows'

const Tokens = () => {
    const { data, loading } = useQuery(TOKENS_INFO_QUERY)
    const { renderList, totalPages, page, changePage } = usePagination(
        data?.tokens,
        loading,
        PAGINATION_LIMIT
    )

    return (
        <AutoColumn gap="xl">
            <InfoSection>
                <TokensHeaderRow />
                {!loading &&
                    renderList?.length !== 0 &&
                    renderList?.map((data, index) => (
                        <TokensInfoRow
                            key={data.id}
                            data={data}
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

export default Tokens
