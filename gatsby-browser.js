import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
  split,
} from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { WebSocketLink } from "@apollo/client/link/ws"
import { getMainDefinition } from "@apollo/client/utilities"
import React from "react"
import "semantic-ui-css/semantic.min.css"
import Layout from "./src/components/layout"

const httpLink = createHttpLink({
  uri: "http://localhost:3000/graphql",
})

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: localStorage.getItem("token") || null,
      refreshToken: localStorage.getItem("refreshToken") || null,
    },
  }
})

const httpLinkWithMiddleware = authLink.concat(httpLink)

const wsLink = new WebSocketLink({
  uri: `ws://localhost:3000/graphql`,
  options: {
    reconnect: true,
  },
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    )
  },
  wsLink,
  httpLinkWithMiddleware
)

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
})

export const wrapPageElement = ({ element, props }) => {
  return (
    <Layout {...props}>
      <ApolloProvider client={client}>{element}</ApolloProvider>
    </Layout>
  )
}
