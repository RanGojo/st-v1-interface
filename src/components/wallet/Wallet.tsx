import { useMixpanelAnalytics } from '@/hooks/analytics/useMixpanelAnalytics'
import { useEffect } from 'react'
import WalletDisconnectedButton from './WalletConnectButton'
import WalletConnectedButton from './WalletConnectedButton'
import WalletSidebarConnected from './WalletSidebarConnected'
import useWalletSidebarConnectWallet from '@/hooks/useWalletSidebarConnectWallet'
import useActiveChain from "@/hooks/useActiveChain";

type WalletProps = {
  account: `0x${string}` | undefined
  accountIsConnected: boolean
}

export default function Wallet({ account, accountIsConnected }: WalletProps) {
  const { registerConnectWallet } = useMixpanelAnalytics()
  const { setOpenSidebarConnectWallet } = useWalletSidebarConnectWallet()
  const { config: chain } = useActiveChain()

  useEffect(() => {
    if (accountIsConnected && account) {
      setOpenSidebarConnectWallet(false)
      registerConnectWallet(account, chain.chainId)
    }
  }, [account, accountIsConnected, chain.chainId, registerConnectWallet, setOpenSidebarConnectWallet])

  return accountIsConnected && account ? (
    <>
      <WalletConnectedButton address={account} />
      <WalletSidebarConnected address={account} />
    </>
  ) : (
    <WalletDisconnectedButton />
  )
}
