import {
  ApolloClient,
  ApolloLink,
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

// const authLink = setContext((_, { headers }) => {
//   return {
//     headers: {
//       ...headers,
//       token: localStorage.getItem("token") || null,
//       refreshToken: localStorage.getItem("refreshToken") || null,
//     },
//   }
// })
// const httpLinkWithMiddleware = authLink.concat(httpLink)

const middlewareLink = setContext(() => ({
  headers: {
    "x-token": localStorage.getItem("token"),
    "x-refresh-token": localStorage.getItem("refreshToken"),
  },
}))

const afterwareLink = new ApolloLink((operation, forward) => {
  const { headers } = operation.getContext()

  if (headers) {
    const token = headers.get("x-token")
    const refreshToken = headers.get("x-refresh-token")

    if (token) {
      localStorage.setItem("token", token)
    }

    if (refreshToken) {
      localStorage.setItem("refreshToken", refreshToken)
    }
  }

  return forward(operation)
})

const httpLinkWithMiddleware = afterwareLink.concat(
  middlewareLink.concat(httpLink)
)

const wsLink = new WebSocketLink({
  uri: `ws://localhost:3000/graphql`,
  options: {
    reconnect: true,
    connectionParams: {
      token: localStorage.getItem("token"),
      refreshToken: localStorage.getItem("refreshToken"),
    },
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
