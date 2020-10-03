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
export const meQuery = gql`
  {
    me {
      id
      username
      teams {
        id
        name
        owner
        channels {
          id
          name
        }
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
      createdAt
      user {
        username
      }
    }
  }
`
export const newChannelMessageSubscription = gql`
  subscription($channelId: ID!) {
    newMessage(channelId: $channelId) {
      id
      text
      user {
        username
      }
      createdAt
    }
  }
`
export const directMessagesQuery = gql`
  query($teamId: ID!, $userId: ID!) {
    directMessages(teamId: $teamId, receiverId: $userId) {
      id
      sender {
        username
      }
      text
      createdAt
    }
  }
`
export const getTeamMembersQuery = gql`
  query($teamId: ID!) {
    getTeamMembers(teamId: $teamId) {
      id
      username
    }
  }
`
