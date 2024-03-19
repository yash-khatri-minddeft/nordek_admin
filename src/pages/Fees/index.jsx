import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { shallow } from 'zustand/shallow'
import { AutoColumn } from '../../components/styled'
import { InfoSection } from '../../components/StyledSection'
import Title from '../../components/Title'
import { useFactory } from '../../hooks/useFactory'
import { useUserStore } from '../../store/userStore'
import { MANAGE_FEE } from '../../constants/roles'
import { useFees } from '../../hooks/useFees'
import { useCopy } from '../../hooks/useCopy'
import CopyWindow from '../../components/CopyWindow'
import InputSection from './components/InputSection'

const Section = styled(InfoSection)`
    display: flex;
    border-radius: 10px;
    padding: 16px 16px 20px;
    border: 1px solid ${({ theme }) => theme.border3};
`

const InnerSection = styled(Section)`
    padding: 24px;
`

const Fees = () => {
    const { setSwap, setRemoveLiquidity, setAddLiquidity } = useFees()
    const { getFees } = useFactory()
    const [swapFee, setSwapFee] = useState(0)
    const [addLiquidityFee, setAddLiquidityFee] = useState(0)
    const [removeLiquidityFee, setRemoveLiquidityFee] = useState(0)
    const [disabled, setDisabled] = useState(false)
    const [isSwapLoading, setIsSwapLoading] = useState(false)
    const [isRemoveLoading, setIsRemoveLoading] = useState(false)
    const [isAddLoading, setIsAddLoading] = useState(false)

    const { user } = useUserStore(({ user }) => ({ user }), shallow)
    const hasRole = user.roles.find((role) => role.name === MANAGE_FEE)

    const {
        isCopied: isSwapUpdated,
        closeCopyWindow: closeSwapWindow,
        openCopyWindow: openSwapWindow,
    } = useCopy()

    const {
        isCopied: isRemoveLiquidityUpdated,
        closeCopyWindow: closeRemoveLiquidityWindow,
        openCopyWindow: openRemoveLiquidityWindow,
    } = useCopy()

    const {
        isCopied: isAddLiquidityUpdated,
        closeCopyWindow: closeAddLiquidityWindow,
        openCopyWindow: openAddLiquidityWindow,
    } = useCopy()

    const onSwapSave = async () => {
        setIsSwapLoading(true)
        const response = await setSwap({ value: swapFee })
        setIsSwapLoading(false)
        if (response === true) {
            openSwapWindow()
        }
    }

    const onRemoveLiquiditySave = async () => {
        setIsRemoveLoading(true)
        const response = await setRemoveLiquidity({ value: removeLiquidityFee })
        setIsRemoveLoading(false)
        if (response === true) {
            openRemoveLiquidityWindow()
        }
    }

    const onAddLiquiditySave = async () => {
        setIsAddLoading(true)
        const response = await setAddLiquidity({ value: addLiquidityFee })
        setIsAddLoading(false)
        if (response === true) {
            openAddLiquidityWindow()
        }
    }

    useEffect(() => {
        setDisabled(true)
        getFees()
            .then((fees) => {
                setSwapFee(fees.swapFee)
                setAddLiquidityFee(fees.addLiquidityFee)
                setRemoveLiquidityFee(fees.removeLiquidityFee)
                setDisabled(false)
            })
            .catch(() => {
                setDisabled(false)
            })
    }, [])

    return (
        <>
            {hasRole === undefined && (
                <Title>You do not have rights to manage Fees.</Title>
            )}
            {isSwapUpdated && (
                <CopyWindow text="Swap updated" onClose={closeSwapWindow} />
            )}
            {isRemoveLiquidityUpdated && (
                <CopyWindow
                    text="Remove liquidity updated"
                    onClose={closeRemoveLiquidityWindow}
                />
            )}
            {isAddLiquidityUpdated && (
                <CopyWindow
                    text="Add liquidity updated"
                    onClose={closeAddLiquidityWindow}
                />
            )}
            {hasRole !== undefined && (
                <AutoColumn gap="lg">
                    <Title>Fees</Title>
                    <Section>
                        <InnerSection>
                            <InputSection
                                title="Swap Fee, %"
                                value={swapFee}
                                onChange={setSwapFee}
                                disabled={disabled}
                                onSave={onSwapSave}
                                isLoading={isSwapLoading}
                            />
                            <InputSection
                                title="Add liquidity fee, %"
                                value={addLiquidityFee}
                                onChange={setAddLiquidityFee}
                                disabled={disabled}
                                onSave={onAddLiquiditySave}
                                isLoading={isAddLoading}
                            />
                            <InputSection
                                title="Remove liquidity fee, %"
                                value={removeLiquidityFee}
                                onChange={setRemoveLiquidityFee}
                                disabled={disabled}
                                onSave={onRemoveLiquiditySave}
                                isLoading={isRemoveLoading}
                            />
                        </InnerSection>
                    </Section>
                </AutoColumn>
            )}
        </>
    )
}

export default Fees
