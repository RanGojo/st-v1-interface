import GiftControl from '@/components/gifts/GiftControl'
import LayoutTemplate from '@/components/shared/layout/LayoutTemplate'
import { Metatags } from '@/components/shared/meta/Metatags'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'
import { chainConfigByName, selectedChainIdVar } from '@/config/chain'

export default function Gifts() {
  return (
    <LayoutTemplate>
      <Metatags />
      <GiftControl />
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
