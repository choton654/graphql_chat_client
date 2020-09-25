import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import React from "react"
import "semantic-ui-css/semantic.min.css"
import Layout from "./src/components/layout"

const cache = new InMemoryCache()

const httpLink = createHttpLink({
  uri: "http://localhost:3000/graphql",
})

const authLink = setContext((_, { headers }) => {
  let token, refreshToken
  token = localStorage.getItem("token")
  refreshToken = localStorage.getItem("refreshToken")
  token = token ? token : ""
  refreshToken = refreshToken ? refreshToken : ""
  return {
    headers: {
      ...headers,
      token,
      refreshToken,
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

export const wrapPageElement = ({ element, props }) => {
  return (
    <Layout {...props}>
      <ApolloProvider client={client}>{element}</ApolloProvider>
    </Layout>
  )
}
