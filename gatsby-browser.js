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
