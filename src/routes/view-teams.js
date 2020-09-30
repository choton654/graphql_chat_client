import { useApolloClient, useQuery } from "@apollo/client"
import { navigate } from "gatsby"
import findIndex from "lodash/findIndex"
import React from "react"
import AppLayout from "../components/AppLayout"
import Header from "../components/Header"
import SendMessage from "../components/SendMessage"
import MessageContainer from "../containers/MessageContainer"
import Sidebar from "../containers/Sidebar"
import { createMessageMutation } from "../graphql/mutation"
import { meQuery } from "../graphql/query"

function ViewTeams({ teamId, channelId }) {
  const { loading, error, data } = useQuery(meQuery, {
    fetchPolicy: "network-only",
  })
  const client = useApolloClient()
  if (loading) return "Loading..."
  // if (error) return `Error! ${error.message}`
  if (error) {
    navigate("/login")
  }

  const { username, teams } = data?.me

  console.log(teams)

  if (!error && !teams?.length) {
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
        username={username}
      />
      {channel && <Header channelName={channel?.name || ""} />}
      {channel && <MessageContainer channelId={channel?.id} />}
      {channel && (
        <SendMessage
          placeholder={channel?.name || ""}
          msgSubmit={text => {
            client.mutate({
              variables: { text, channelId: channel.id },
              mutation: createMessageMutation,
            })
          }}
        />
      )}
    </AppLayout>
  )
}

export default ViewTeams

// let teams
// if (data?.inviteTeams.length > 0 && data.allTeams.length > 0) {
//   teams = [...data.allTeams, ...data.inviteTeams]
// } else if (data?.allTeams.length > 0) {
//   teams = [...data.allTeams]
// } else if (data?.inviteTeams?.length > 0) {
//   teams = [...data.inviteTeams]
// } else {
//   teams = []
// }
