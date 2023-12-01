import IncentivesControl from '@/components/incentives/IncentivesControl'
import { Metatags } from '@/components/shared/meta/Metatags'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import LayoutTemplate from '../../../../components/shared/layout/LayoutTemplate'
import { chainConfigByName, selectedChainIdVar } from '@/config/chain'

export default function Incentives() {
  return (
    <LayoutTemplate>
      <Metatags />
      <IncentivesControl />
    </LayoutTemplate>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  if (context.params?.network) {
    selectedChainIdVar(chainConfigByName(context.params?.network as string).chainId)
  }

  return {
    props: {
      ...(await serverSideTranslations(context.locale || 'en', ['common']))
    }
  }
}
