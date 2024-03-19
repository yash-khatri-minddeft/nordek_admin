import React from 'react'
import styled from 'styled-components'
import { AutoColumn, Icon } from '../../../components/styled'
import { Button } from '../../../components/Button'
import { TEXT } from '../../../theme'
import { InputNumber, Label } from '../../../components/Input'
import PercentsIcon from '../../../assets/svg/percents.svg'
import Loader, { LoaderContainer } from '../../../components/Loader'

const StyledButton = styled(Button)`
    padding: 8px;
    line-height: 25.6px;
    font-size: 16px;

    :disabled {
        cursor: auto;
        :hover {
            opacity: 1;
        }
    }
`

const Container = styled.div`
    width: 100%;
    max-width: 250px;
    margin-left: 24px;

    :first-child {
        margin-left: 0;
    }
`

const StyledColumn = styled(AutoColumn)`
    position: relative;
`

const Percents = styled(Icon)`
    position: absolute;
    bottom: 12px;
    right: 12px;
    cursor: auto;
`

const InputSection = ({
    title,
    value,
    onChange,
    disabled,
    onSave,
    isLoading,
}) => {
    const buttonDisabled = disabled || isLoading || value === ''

    return (
        <Container>
            <AutoColumn gap="xl">
                <TEXT.primary
                    fontSize={16}
                    fontWeight={600}
                    lineHeight="25.6px"
                >
                    {title}
                </TEXT.primary>
                <StyledColumn gap="4px">
                    <Label>Transfer Fee Percentage</Label>
                    <InputNumber
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        type="number"
                        placeholder=""
                        disabled={disabled || isLoading}
                    />
                    <Percents>
                        <img src={PercentsIcon} alt="" />
                    </Percents>
                </StyledColumn>
                <StyledButton onClick={onSave} disabled={buttonDisabled}>
                    {isLoading && (
                        <LoaderContainer>
                            <Loader />
                        </LoaderContainer>
                    )}
                    Save
                </StyledButton>
            </AutoColumn>
        </Container>
    )
}

export default InputSection
