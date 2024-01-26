import useAssetsList from '@/hooks/thorchain/useAssetList'
import useQuoteAssets from '@/hooks/thorchain/useQuoteAssets'
import { ethers } from 'ethers'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useState } from 'react'
import styled from 'styled-components'
import { useAccount, usePrepareContractWrite, useSendTransaction } from 'wagmi'
import LayoutTemplate from '../../../../components/shared/layout/LayoutTemplate'


export default function Swap() {

    const { address } = useAccount()
    const { list } = useAssetsList()
    const { quote, handleQuoteAssets, clearQuote } = useQuoteAssets()
    const [from, setFrom] = useState<string>()
    const [to, setTo] = useState<string>()
    const [amount, setAmount] = useState<string>('0')
    const { config } = usePrepareContractWrite({
        address: quote?.router ?? '0x0000000000000000000000000000',
        abi: [{
            "constant": false,
            "inputs": [
                { "name": "_to", "type": "address" },
                { "name": "_value", "type": "uint256" }
            ],
            "name": "transfer",
            "outputs": [{ "name": "success", "type": "bool" }],
            "stateMutability": "nonpayable",
            "type": "function"
        }],
        functionName: "transfer",
        args: [
            address,
            amount,
        ],
        enabled: !!(quote?.memo && amount && address)
    })

    const tx = useSendTransaction({
        ...config,
        onError: error => console.log('falhou', error),
        onSuccess: success => console.log('success', success)
    })


    const handleChangeTokenFrom = (event: { target: { value: string } }) => {
        clearQuote()
        setFrom(event.target.value)
    }

    const handleChangeTokenTo = (event: { target: { value: string } }) => {
        clearQuote()
        setTo(event.target.value)
    }

    const handleQuote = () => {
        console.log(from, to, amount, address)
        if (from && to && amount) {
            handleQuoteAssets(from, to, amount, address)
        }


    }

    const handleAmount = (value: string) => {
        value && console.log(ethers.parseUnits(value, 8).toString())
        setAmount(ethers.parseUnits(value, 8).toString())

    }

    const handleSwap = () => {
        console.log('call')
        tx.sendTransaction?.()
    }



    return (
        <LayoutTemplate>
            <Container>
                <TokenContainer>
                    <span>From</span>
                    <select onChange={handleChangeTokenFrom}>
                        {list?.map(item => (
                            <option key={item.asset}>{item.asset}</option>
                        ))}
                    </select>
                </TokenContainer>
                <TokenContainer>
                    <span>to</span>
                    <select onChange={handleChangeTokenTo}>
                        {list?.map(item => (
                            <option key={item.asset}>{item.asset}</option>
                        ))}
                    </select>
                </TokenContainer>
                <span>Amount</span>
                <input placeholder='0' name='value' type='number' onChange={({ target }) => handleAmount(target.value)} />
                <ActionContainer>
                    <button onClick={handleQuote}>Get value</button>
                    {quote?.expected_amount_out && <button className='confirm' onClick={handleSwap}>Confirm</button>}
                </ActionContainer>
                {quote?.expected_amount_out && <span>Out  {ethers.formatUnits(BigInt(quote?.expected_amount_out), 'gwei')}</span>}
            </Container>
        </LayoutTemplate>
    )
}

const { Container, TokenContainer, ActionContainer } = {
    Container: styled.div`
        width: 50%;
        display: flex;
        flex-direction: column;
        grid-gap: 5px;
        > span {
            font-size: 16px;
            font-weight: 600;
        }
        > input {
            background-color: transparent;
            height: 30px;
            padding: 5px;
            font-size: 16px;
            font-weight: 400;
            border-radius: 5px;
            border-width: 1px;
        }
        > button, > div > button {
            width: 160px;
            height: 30px;
            border-radius: 5px;
            border-width: 1px;
            background: #373b8a;
            color: #fff;
            font-weight: 400;
        }
    `,
    TokenContainer: styled.div`
        width: 100%;
        display: flex;
        flex-direction: column;
        grid-gap: 5px;
        > span {
            font-size: 16px;
            font-weight: 600;
        }
        > select {
            background-color: transparent;
            height: 30px;
            padding: 5px;
            font-size: 16px;
            font-weight: 400;
            border-radius: 5px;
            border-width: 1px;
        }
        > button {
            width: 160px;
            height: 30px;
            border-radius: 5px;
            border-width: 1px;
            background: #373b8a;
            color: #fff;
            font-weight: 400;
        } 
    
    `,
    ActionContainer: styled.div`
        display: flex;
        gap: 8px;
        > .confirm {
            background: #d8e1fb;
            color: #000000;
            border-color: #d8e1fb;
        }
    `
}




export const getServerSideProps: GetServerSideProps = async context => {

    return {
        props: {
            ...(await serverSideTranslations(context.locale || 'en', ['common'])),

        }
    }
}

