import { contentfulClient } from '@/config/apollo'
import { queryContentfulCategoryCollection } from '@/queries/contentful/queryContentfulCategoryCollection'
import { ContentFulCategory } from '@/types/ContentfulPool'
import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import useActiveChain from "@/hooks/useActiveChain";

export default function useContentfulCategoryCollection() {
  const [categories, setCategories] = useState<ContentFulCategory[] | null>(null)
  const [poolsIsLoading, setPoolsIsLoading] = useState<boolean>(false)
  const { chainId } = useActiveChain()

  const { data, loading } = useQuery<{ categoryCollection: { items: ContentFulCategory[] } }>(
    queryContentfulCategoryCollection,
    {
      client: contentfulClient(chainId)
    }
  )

  useEffect(() => {
    if (data?.categoryCollection.items) {
      setCategories(data?.categoryCollection.items)
    }
  }, [data])

  useEffect(() => {
    setPoolsIsLoading(loading)
  }, [loading, setPoolsIsLoading])

  return { categories, loading: poolsIsLoading }
}
