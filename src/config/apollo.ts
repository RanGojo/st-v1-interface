import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import chainConfig, { selectedChainIdVar } from './chain'


export const apolloClient = () => {
  const chainId = selectedChainIdVar()
  const chain = chainConfig(chainId)

  return new ApolloClient({
    uri: chain.subgraphs.StakeTogether,
    ssrMode: typeof window === 'undefined',
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            pool: {
              keyArgs: ['id', 'delegate_contains']
            }
          }
        }
      }
    }),

    connectToDevTools: true
  })
}

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${process.env.NEXT_PUBLIC_CONTENTFUL_TOKEN}`
    }
  }
})

const httpLink = (chainId: number) => {
  const chain = chainConfig(chainId)

  return new HttpLink({
    uri: chain.subgraphs.ContentFul
  })
}

export const contentfulClient = () => {
  const chainId = selectedChainIdVar()
  return new ApolloClient({
    link: authLink.concat(httpLink(chainId)),
    ssrMode: typeof window === 'undefined',
    cache: new InMemoryCache(),
    connectToDevTools: true
  })
}
