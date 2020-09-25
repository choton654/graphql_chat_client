import { gql, useQuery } from "@apollo/client"
import decode from "jwt-decode"
import findIndex from "lodash/findIndex"
import React from "react"
import Channels from "../components/Channels"
import Teams from "../components/Teams"

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
  }
`

function Sidebar({ currentTeamId }) {
  const { loading, error, data } = useQuery(allTeamsQuery)

  if (loading) return "Loading..."
  if (error) return `Error! ${error.message}`

  const teamIdx = currentTeamId
    ? findIndex(data.allTeams, ["id", currentTeamId])
    : 0
  const team = data.allTeams[teamIdx]
  let username = ""
  try {
    const token = localStorage.getItem("token")
    const { username: uname } = decode(token)
    username = uname
  } catch (err) {}

  return [
    <Teams
      key="team-sidebar"
      teams={data.allTeams.map(t => ({
        id: t.id,
        letter: t.name.charAt(0).toUpperCase(),
      }))}
    />,
    <Channels
      key="channels-sidebar"
      teamName={team?.name}
      username={username}
      channels={team?.channels}
      users={[
        { id: 1, name: "slackbot" },
        { id: 2, name: "user1" },
      ]}
    />,
  ]
}

export default Sidebar
