import { gql } from "@apollo/client"

export const allTeamsQuery = gql`
  query {
    allTeams {
      id
      name
      channels {
        id
        name
      }
    }
    inviteTeams {
      id
      name
      channels {
        id
        name
      }
    }
  }
`

export const GET_USERS = gql`
  query {
    allUsers {
      id
      username
      email
    }
  }
`
