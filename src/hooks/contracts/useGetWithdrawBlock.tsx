import { useStakeTogetherGetWithdrawBlock } from '@/types/Contracts'
import { useEffect, useState } from 'react'
import useBlockCountdown from '../useBlockCountdown'
import useActiveChain from "@/hooks/useActiveChain";

export default function useGetWithdrawBlock(walletAddress: `0x${string}` | undefined, enabled = true) {
  const [withdrawBlock, setWithdrawBlock] = useState<bigint>(0n)
  const { config: chain } = useActiveChain()
  const { contracts } = chain
  const { data, isFetching, refetch } = useStakeTogetherGetWithdrawBlock({
    address: contracts.StakeTogether,
    enabled: !!walletAddress && enabled,
    ...(walletAddress && { args: [walletAddress] })
  })
  useEffect(() => {
    if (data) {
      setWithdrawBlock(data)
    }
  }, [data])

  const timeLeft = useBlockCountdown(Number(withdrawBlock)) || 0

  return { withdrawBlock, isLoading: isFetching, timeLeft, getWithdrawBlock: refetch }
}
