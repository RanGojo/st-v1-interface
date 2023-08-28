import { ContentfulLogo } from './ContentfulPool'
import { Delegation } from './Delegation'

export type PoolSubgraph = {
  marketShare: bigint
  id: string
  address: `0x${string}`
  active: boolean
  poolBalance: bigint
  poolShares: bigint
  delegations: Delegation[]
  receivedDelegationsCount: bigint
} & ENSPool

export type ENSPool = {
  address: `0x${string}`
  name?: string
  avatar?: string
}

export type Pool = {
  type: string
  logo: ContentfulLogo
  name: string
} & PoolSubgraph
