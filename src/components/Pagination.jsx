import React from 'react'
import styled from 'styled-components'
import ArrowRight from '../assets/svg/pagination-right-green.svg'
import ArrowLeft from '../assets/svg/paggination-left.svg'
import { generateNumbersArray } from '../utils/pagination'
import { Centered, Flex } from './styled'

const Item = styled(Centered)`
    width: 32px;
    height: 32px;
    font-weight: 500;
    font-size: 14px;
    line-height: 23.1px;
    margin-left: 8px;
    color: ${({ active, theme }) =>
        active === 'true' ? theme.white : theme.textSecondary};
    background-color: ${({ active, theme }) =>
        active === 'true' ? theme.primary1 : theme.white};
    cursor: pointer;
    border: 1px solid
        ${({ theme, active }) =>
            active === 'true' ? theme.primary1 : theme.border2};
    border-radius: 4px;

    :hover {
        opacity: 0.9;
        background-color: ${({ active, theme }) =>
            active === 'true' ? theme.primary1 : theme.border1};
    }
`

const RotatedImage = styled.img`
    transform: rotate(180deg);
`

const Pagination = ({ totalPages = 0, page, setPage }) => {
    const pageDown = () => {
        if (page - 1 <= 0) return
        setPage(page - 1)
    }
    const pageUp = () => {
        if (page + 1 > totalPages) return
        setPage(page + 1)
    }

    const renderArrows = !!totalPages && totalPages !== 1
    const lessThanSixPages = !!totalPages && totalPages <= 5
    const activeFirstPage = !!totalPages && totalPages > 5 && page === 1
    const notTheLastPages =
        !!totalPages && totalPages > 5 && page !== 1 && page + 3 < totalPages
    const lastPages =
        !!totalPages && totalPages > 5 && page !== 1 && page + 3 >= totalPages
    const renderPage = page + 3 === totalPages

    return (
        <Flex>
            {renderArrows && (
                <Item onClick={pageDown}>
                    {page === 1 ? (
                        <img src={ArrowLeft} alt="icon" />
                    ) : (
                        <RotatedImage src={ArrowRight} alt="icon" />
                    )}
                </Item>
            )}

            {lessThanSixPages &&
                generateNumbersArray(totalPages).map((number) => (
                    <PaginationItem
                        key={number}
                        active={page === number}
                        pageNumber={number}
                        onClick={setPage}
                        currentPage={page}
                    />
                ))}

            {activeFirstPage &&
                generateNumbersArray(3).map((number) => (
                    <PaginationItem
                        key={number}
                        active={page === number}
                        pageNumber={number}
                        onClick={setPage}
                        currentPage={page}
                    />
                ))}
            {activeFirstPage && (
                <>
                    <Item>...</Item>
                    <PaginationItem
                        active={false}
                        onClick={setPage}
                        pageNumber={totalPages}
                        currentPage={page}
                    />
                </>
            )}

            {notTheLastPages && (
                <>
                    <PaginationItem
                        active={page === page - 1}
                        pageNumber={page - 1}
                        onClick={setPage}
                        currentPage={page}
                    />
                    <PaginationItem
                        active={true}
                        pageNumber={page}
                        onClick={setPage}
                        currentPage={page}
                    />
                    <PaginationItem
                        active={page === page + 1}
                        pageNumber={page + 1}
                        onClick={setPage}
                        currentPage={page}
                    />
                </>
            )}
            {notTheLastPages && (
                <>
                    {renderPage ? (
                        <PaginationItem
                            active={page === page + 2}
                            onClick={setPage}
                            pageNumber={page + 2}
                            currentPage={page}
                        />
                    ) : (
                        <Item>...</Item>
                    )}

                    <PaginationItem
                        active={false}
                        onClick={setPage}
                        pageNumber={totalPages}
                        currentPage={page}
                    />
                </>
            )}

            {lastPages && (
                <>
                    <PaginationItem
                        active={page === totalPages - 4}
                        pageNumber={totalPages - 4}
                        onClick={setPage}
                        currentPage={page}
                    />
                    <PaginationItem
                        active={page === totalPages - 3}
                        pageNumber={totalPages - 3}
                        onClick={setPage}
                        currentPage={page}
                    />
                    <PaginationItem
                        active={page === totalPages - 2}
                        pageNumber={totalPages - 2}
                        onClick={setPage}
                        currentPage={page}
                    />
                    <PaginationItem
                        active={page === totalPages - 1}
                        pageNumber={totalPages - 1}
                        onClick={setPage}
                        currentPage={page}
                    />
                    <PaginationItem
                        active={page === totalPages}
                        pageNumber={totalPages}
                        onClick={setPage}
                        currentPage={page}
                    />
                </>
            )}

            {renderArrows && (
                <Item onClick={pageUp}>
                    {page === totalPages ? (
                        <RotatedImage src={ArrowLeft} alt="icon" />
                    ) : (
                        <img src={ArrowRight} alt="icon" />
                    )}
                </Item>
            )}
        </Flex>
    )
}

const PaginationItem = ({ active, pageNumber, onClick, currentPage }) => {
    const changePage = () => {
        if (currentPage === pageNumber) return
        onClick(pageNumber)
    }

    return (
        <Item onClick={changePage} active={String(active)}>
            {pageNumber}
        </Item>
    )
}

export default Pagination
