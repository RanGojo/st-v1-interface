import { useStakeTogetherBeaconBalance } from '@/types/Contracts'
import { useEffect, useState } from 'react'
import useActiveChain from "@/hooks/useActiveChain";

export const useWithdrawValidatorBalance = () => {
  const [liquidityValidatorsBalance, setLiquidityValidatorsBalance] = useState(0n)
  const { config: chain } = useActiveChain()
  const { contracts } = chain

  const { data, isFetching, refetch } = useStakeTogetherBeaconBalance({
    address: contracts.StakeTogether
  })

  useEffect(() => {
    if (data) {
      setLiquidityValidatorsBalance(data)
    }
  }, [data])

  //TODO RE-VISITAR ESSE HOOk
  return {
    withdrawValidatorsBalance: liquidityValidatorsBalance || 0n,
    isLoading: isFetching,
    refetch
  }
}
