import { contentfulClient } from '@/config/apollo'
import { queryContentfulPoolsList } from '@/queries/contentful/queryContentfulPoolsList'
import { ContentfulPool } from '@/types/ContentfulPool'
import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import useActiveChain from "@/hooks/useActiveChain";

export default function useContentfulPoolsList() {
  const [poolsList, setPoolsList] = useState<ContentfulPool[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { chainId } = useActiveChain()

  const { data, loading } = useQuery<{ poolCollection: { items: ContentfulPool[] } }>(
    queryContentfulPoolsList,
    {
      variables: { locale: 'en-US' },
      client: contentfulClient(chainId)
    }
  )

  useEffect(() => {
    setPoolsList(data?.poolCollection.items || [])
  }, [data])

  useEffect(() => {
    setIsLoading(loading)
  }, [loading, setIsLoading])

  return { poolsList, isLoading }
}
