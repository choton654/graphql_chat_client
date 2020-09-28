import { useQuery } from "@apollo/client"
import { navigate } from "gatsby"
import findIndex from "lodash/findIndex"
import React from "react"
import MessageContainer from "../containers/MessageContainer"
import Sidebar from "../containers/Sidebar"
import { allTeamsQuery } from "../graphql/query"
import AppLayout from "./AppLayout"
import Header from "./Header"
import SendMessage from "./SendMessage"

function ViewTeams({ teamId, channelId }) {
  const { loading, error, data } = useQuery(allTeamsQuery)
  // console.log(data)
  if (loading) return "Loading..."
  if (error) return `Error! ${error.message}`

  let teams
  if (data.inviteTeams?.length > 0 && data.allTeams.length > 0) {
    teams = [...data.allTeams, ...data.inviteTeams]
  } else if (data.allTeams.length > 0) {
    teams = [...data.allTeams]
  } else if (data.inviteTeams?.length > 0) {
    teams = [...data.inviteTeams]
  } else {
    teams = []
  }
  console.log(teams)

  if (!teams?.length) {
    navigate("/app/create-team")
  }

  const teamIdx = teamId ? findIndex(teams, ["id", teamId]) : 0
  const team = teamIdx === -1 ? teams[0] : teams[teamIdx]

  const channelIdx = channelId
    ? findIndex(team?.channels, ["id", channelId])
    : 0
  const channel =
    channelIdx === -1 ? team?.channels[0] : team?.channels[channelIdx]

  return (
    <AppLayout>
      <Sidebar
        teams={teams.map(t => ({
          id: t.id,
          letter: t.name.charAt(0).toUpperCase(),
        }))}
        team={team}
      />
      {channel && <Header channelName={channel?.name || ""} />}
      {channel && <MessageContainer channelId={channel?.id} />}
      {channel && (
        <SendMessage
          channelName={channel?.name || ""}
          channelId={channel?.id}
        />
      )}
    </AppLayout>
  )
}

export default ViewTeams
