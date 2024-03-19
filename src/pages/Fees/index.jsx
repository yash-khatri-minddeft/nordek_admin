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
    const { setSwap } = useFees()
    const { getFees } = useFactory()
    const [swapFee, setSwapFee] = useState(0)
    const [disabled, setDisabled] = useState(false)
    const [isSwapLoading, setIsSwapLoading] = useState(false)

    const { user } = useUserStore(({ user }) => ({ user }), shallow)
    const hasRole = user.roles.find((role) => role.name === MANAGE_FEE)

    const {
        isCopied: isSwapUpdated,
        closeCopyWindow: closeSwapWindow,
        openCopyWindow: openSwapWindow,
    } = useCopy()

    const onSwapSave = async () => {
        setIsSwapLoading(true)
        const response = await setSwap({ value: swapFee })
        setIsSwapLoading(false)
        if (response === true) {
            openSwapWindow()
        }
    }

    useEffect(() => {
        setDisabled(true)
        getFees()
            .then((fees) => {
                setSwapFee(fees.swapFee)
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
                        </InnerSection>
                    </Section>
                </AutoColumn>
            )}
        </>
    )
}

export default Fees
