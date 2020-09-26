import { gql, useQuery } from "@apollo/client"
import findIndex from "lodash/findIndex"
import React from "react"
import Sidebar from "../containers/Sidebar"
import AppLayout from "./AppLayout"
import Header from "./Header"
import Messages from "./Messages"
import SendMessage from "./SendMessage"

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

function ViewTeams({ teamId, channelId }) {
  const { loading, error, data } = useQuery(allTeamsQuery)
  console.log(data)
  if (loading) return "Loading..."
  if (error) return `Error! ${error.message}`

  const teamIdx = teamId ? findIndex(data.allTeams, ["id", teamId]) : 0
  const team = data.allTeams[teamIdx]
  const channelIdx = channelId ? findIndex(team.channels, ["id", channelId]) : 0
  const channel = team.channels[channelIdx]

  return (
    <AppLayout>
      <Sidebar
        teams={data.allTeams.map(t => ({
          id: t.id,
          letter: t.name.charAt(0).toUpperCase(),
        }))}
        team={team}
      />
      <Header channelName={channel.name} />
      <Messages channelId={channel.id}>
        <ul className="message-list">
          <li />
          <li />
        </ul>
      </Messages>
      <SendMessage channelName={channel.name} />
    </AppLayout>
  )
}

export default ViewTeams
