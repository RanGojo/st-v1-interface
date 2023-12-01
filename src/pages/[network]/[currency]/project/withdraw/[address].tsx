import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import LayoutTemplate from '../../../../../components/shared/layout/LayoutTemplate'
import StakeControl from '../../../../../components/stake/StakeControl'
import { ContentfulPool } from '@/types/ContentfulPool'
import { MetaTagsPoolDetail } from '@/components/shared/meta/MetaTagsPoolDetail'
import { contentfulClient } from '@/config/apollo'
import { queryContentfulPoolByAddress } from '@/queries/contentful/queryContentfulPoolByAddress'
import chainConfig, { chainConfigByName } from "@/config/chain";
import { Network } from "@/types/Network";

type WithdrawProps = {
  poolAddress: `0x${string}`
  poolDetail?: ContentfulPool
}

export default function Withdraw({ poolAddress, poolDetail }: WithdrawProps) {
  return (
    <LayoutTemplate>
      <MetaTagsPoolDetail poolDetail={poolDetail} />
      <StakeControl poolAddress={poolAddress} type='withdraw' poolDetail={poolDetail} />
    </LayoutTemplate>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const params = context?.params as { address: `0x${string}` } | undefined
  let chain = chainConfig(Network.Mainnet)

  if (context.params?.network) {
    chain = chainConfigByName(context.params?.network as string)
  }

  const { data } = await contentfulClient(chain.chainId).query<{ poolCollection: { items: ContentfulPool[] } }>({
    query: queryContentfulPoolByAddress,

    variables: {
      walletAddress: params?.address.toLowerCase(),
      locale: context.locale === 'en' ? 'en-US' : context.locale
    }
  })

  return {
    props: {
      ...(await serverSideTranslations(context.locale || 'en', ['common'])),
      poolAddress: params?.address.toLowerCase() || '',
      poolDetail: data?.poolCollection.items[0] || null
    }
  }
}
