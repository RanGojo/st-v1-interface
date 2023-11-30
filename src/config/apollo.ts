import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import chainConfig from './chain'


export const apolloClient = (chainId: number) => {
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

export const contentfulClient = (chainId: number) => {
  return new ApolloClient({
    link: authLink.concat(httpLink(chainId)),
    ssrMode: typeof window === 'undefined',
    cache: new InMemoryCache(),
    connectToDevTools: true
  })
}
