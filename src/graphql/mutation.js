import { gql } from "@apollo/client"

export const CREATE_CHANNEL = gql`
  mutation createChannel($teamId: ID!, $name: String!) {
    createChannel(teamId: $teamId, name: $name) {
      ok
      channel {
        id
        name
      }
    }
  }
`

export const CREATE_TEAM = gql`
  mutation createTeam($name: String!) {
    createTeam(name: $name) {
      ok
      team {
        id
      }
      error {
        error
      }
    }
  }
`

export const CREATE_USER = gql`
  mutation createUser($email: String!, $username: String!, $password: String!) {
    createUser(email: $email, username: $username, password: $password) {
      id
      username
      email
    }
  }
`
export const addTeamMemberMutation = gql`
  mutation($email: String!, $teamId: ID!) {
    addTeamMember(email: $email, teamId: $teamId) {
      ok
      error {
        error
      }
    }
  }
`
