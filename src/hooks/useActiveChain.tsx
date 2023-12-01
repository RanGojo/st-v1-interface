import { useEffect, useState } from 'react'
import { Network } from '@/types/Network'
import chainConfig, { ChainConfig, selectedChainIdVar } from '@/config/chain'
import { useReactiveVar } from '@apollo/client'

export default function useActiveChain() {
  const chainId = useReactiveVar(selectedChainIdVar)
  const [config, setConfig] = useState<ChainConfig>(chainConfig(chainId))
  const [isTestnet, setIsTestnet] = useState<boolean>(true)

  useEffect(() => {
    setConfig(chainConfig(chainId))
    setIsTestnet(chainId !== Network.Mainnet)
  }, [chainId])

  return {
    chainId,
    config,
    isTestnet
  }
}
