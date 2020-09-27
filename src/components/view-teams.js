import { useQuery } from "@apollo/client"
import { navigate } from "gatsby"
import findIndex from "lodash/findIndex"
import React from "react"
import Sidebar from "../containers/Sidebar"
import { allTeamsQuery } from "../graphql/query"
import AppLayout from "./AppLayout"
import Header from "./Header"
import Messages from "./Messages"
import SendMessage from "./SendMessage"

function ViewTeams({ teamId, channelId }) {
  const {
    loading,
    error,
    data: { allTeams, inviteTeams },
  } = useQuery(allTeamsQuery)
  console.log(data)

  const teams = [...allTeams, ...inviteTeams]
  console.log(teams)

  if (!teams?.length) {
    navigate("/app/create-team")
  }

  const teamIdx = teamId ? findIndex(teams, ["id", teamId]) : 0
  // const team = teams[teamIdx]
  const team = teamIdx === -1 ? teams[0] : teams[teamIdx]

  const channelIdx = channelId
    ? findIndex(team?.channels, ["id", channelId])
    : 0
  // const channel = team?.channels[ channelIdx ]
  const channel =
    channelIdx === -1 ? team.channels[0] : team.channels[channelIdx]

  if (loading) return "Loading..."
  if (error) return `Error! ${error.message}`

  return (
    <AppLayout>
      <Sidebar
        teams={teams.map(t => ({
          id: t.id,
          letter: t.name.charAt(0).toUpperCase(),
        }))}
        team={team}
      />
      <Header channelName={channel?.name || ""} />
      <Messages channelId={channel?.id || ""}>
        <ul className="message-list">
          <li />
          <li />
        </ul>
      </Messages>
      <SendMessage channelName={channel?.name || ""} />
    </AppLayout>
  )
}

export default ViewTeams
