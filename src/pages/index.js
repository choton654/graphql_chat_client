import { gql, useQuery } from "@apollo/client"
import React from "react"
import { Card, Grid } from "semantic-ui-react"

export const GET_USERS = gql`
  query {
    allUsers {
      id
      username
      email
    }
  }
`

const Home = props => {
  const { loading, error, data } = useQuery(GET_USERS)

  if (loading) return "Loading..."
  if (error) return `Error! ${error.message}`
  return (
    <Grid container columns={3}>
      {data.allUsers.map(user => (
        <Grid.Column key={user.id}>
          <Card
            color="olive"
            header={user.username}
            meta={user.email}
            description={[
              "Rick is a genius scientist whose alcoholism and reckless,",
              " nihilistic behavior are a source of concern for his family.",
            ].join("")}
          />
        </Grid.Column>
      ))}
    </Grid>
  )
}

export default Home
