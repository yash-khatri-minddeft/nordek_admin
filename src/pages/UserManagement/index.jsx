import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { shallow } from 'zustand/shallow'
import { AutoColumn, Flex } from '../../components/styled'
import Pagination from '../../components/Pagination'
import CopyWindow from '../../components/CopyWindow'
import { useCopy } from '../../hooks/useCopy'
import Title from '../../components/Title'
import { useUserStore } from '../../store/userStore'
import { MANAGE_USERS_ACCOUNT } from '../../constants/roles'
import { useWallet } from '../../hooks/useWallet'
import { useDebounce } from '../../hooks/useDebounce'
import { Input } from '../../components/Input'
import { usePagination } from '../../hooks/usePagination'
import useSortTable, { DEFAULT } from '../../utils/sortTable'
import { InfoRow, TitleRow } from './components/rows'

const UsersSection = styled.section`
    width: 100%;
    background-color: ${({ theme }) => theme.white};
    border-radius: 10px;
`

const Bottom = styled(Flex)`
    width: 100%;
    justify-content: flex-end;
`

const LIMIT = 10
const initialOrder = {
    lastLogIn: DEFAULT,
}

const UserManagement = () => {
    const { getAllWallets } = useWallet()
    const { user } = useUserStore(({ user }) => ({ user }), shallow)
    const hasRole = user.roles.find(
        (role) => role.name === MANAGE_USERS_ACCOUNT
    )

    const [query, setQuery] = useState('')
    const [walletList, setWalletList] = useState([])
    const [headerKey, setHeaderKey] = useState('lastLogIn')
    const [order, setOrder] = useState(initialOrder)
    const debouncedQuery = useDebounce(query, 300)

    const { isCopied, closeCopyWindow, openCopyWindow } = useCopy()
    const {
        isCopied: isSuccess,
        closeCopyWindow: closeInfoWindow,
        openCopyWindow: openInfoWindow,
    } = useCopy()

    const getWallets = async () => {
        const response = await getAllWallets()

        setWalletList(response)
    }
    const filteredWalletList = useMemo(() => {
        if (debouncedQuery == '' && walletList) {
            return walletList
        }
        const filteredWallet = walletList?.filter((wallet) =>
            wallet?.address.toLowerCase().startsWith(query)
        )
        return filteredWallet
    }, [walletList, debouncedQuery])

    const finalData = useMemo(() => {
        return filteredWalletList?.map((wallet) => {
            return {
                id: wallet.id,
                createdAt: wallet.createdAt,
                updatedAt: wallet.updatedAt,
                address: wallet.address,
                lastLogIn: new Date(wallet.lastLogIn).getTime(),
                providerId: wallet.providerId,
                isActive: wallet.isActive,
            }
        })
    }, [filteredWalletList])
    const { sortedData, nextOrder } = useSortTable(finalData, headerKey, order)

    const { renderList, totalPages, page, changePage } = usePagination(
        sortedData,
        false,
        LIMIT
    )

    useEffect(() => {
        getWallets()
    }, [page])

    return (
        <>
            {hasRole === undefined && (
                <Title>You do not have rights to manage Users Account.</Title>
            )}
            {isCopied && <CopyWindow onClose={closeCopyWindow} />}
            {isSuccess && (
                <CopyWindow text="Success" onClose={closeInfoWindow} />
            )}
            {hasRole !== undefined && (
                <AutoColumn gap="lg">
                    <Title>User Access Rights</Title>
                    <Input
                        type="text"
                        placeholder="Search user by address"
                        value={query}
                        onChange={(e) => setQuery(e.target.value.toLowerCase())}
                        style={{ maxWidth: '500px' }}
                    />
                    <UsersSection>
                        <TitleRow
                            setHeaderKey={setHeaderKey}
                            setOrder={setOrder}
                            nextOrder={nextOrder}
                            order={order}
                            initialOrder={initialOrder}
                        />
                        {renderList?.length !== 0 &&
                            renderList?.map((wallet) => (
                                <InfoRow
                                    key={wallet.id}
                                    wallet={wallet}
                                    openInfoWindow={openInfoWindow}
                                    openCopyWindow={openCopyWindow}
                                />
                            ))}
                    </UsersSection>
                    <Bottom>
                        <Pagination
                            setPage={changePage}
                            page={page}
                            totalPages={totalPages}
                        />
                    </Bottom>
                </AutoColumn>
            )}
        </>
    )
}

export default UserManagement
