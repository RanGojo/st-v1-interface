import { useStakeTogetherConfig } from '@/types/Contracts'
import { useEffect, useState } from 'react'
import { STConfig } from '../../types/STConfig'
import useActiveChain from "@/hooks/useActiveChain";

export default function useStConfig() {
  const [loading, setLoading] = useState<boolean>(false)
  const [stConfig, setSTConfig] = useState<STConfig | null>(null)
  const { config: chain } = useActiveChain()
  const { contracts } = chain

  const { data, isFetching } = useStakeTogetherConfig({
    address: contracts.StakeTogether
  })

  useEffect(() => {
    if (data) {
      const config: STConfig = {
        blocksPerDay: data[0],
        depositLimit: data[1],
        maxDelegations: data[2],
        minDepositAmount: data[3],
        minWithdrawAmount: data[4],
        poolSize: data[5],
        validatorSize: data[6],
        withdrawPoolLimit: data[7],
        withdrawalValidatorLimit: data[8],
        withdrawDelay: data[9],
        withdrawBeaconDelay: data[10],
        feature: data[11]
      }
      setSTConfig(config)
    }
  }, [data])

  useEffect(() => {
    setLoading(isFetching)
  }, [isFetching])

  return { stConfig, loading }
}
