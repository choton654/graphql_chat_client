import { gql } from "@apollo/client"

export const allTeamsQuery = gql`
  query {
    allTeams {
      id
      name
      owner
      channels {
        id
        name
      }
    }
    inviteTeams {
      id
      name
      owner
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
export const messagesQuery = gql`
  query($channelId: ID!) {
    messages(channelId: $channelId) {
      id
      text
      user {
        username
      }
      createdAt
    }
  }
`
