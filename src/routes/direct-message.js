import { useApolloClient, useQuery } from "@apollo/client"
import findIndex from "lodash/findIndex"
import React, { useEffect } from "react"
import AppLayout from "../components/AppLayout"
import Header from "../components/Header"
import SendMessage from "../components/SendMessage"
import DirectMessageContainer from "../containers/DirectMessageContainer"
import Sidebar from "../containers/Sidebar"
import { createDirectMessageMutation } from "../graphql/mutation"
import { meQuery } from "../graphql/query"

function DirectMessage({ teamId, userId }) {
  const { loading, error, data } = useQuery(meQuery, {
    fetchPolicy: "network-only",
  })

  const client = useApolloClient()

  if (loading) return "Loading..."
  if (error) return `Error! ${error.message}`

  const teamIdx = teamId ? findIndex(data.me.teams, ["id", teamId]) : 0
  const team = teamIdx === -1 ? data.me.teams[0] : data.me.teams[teamIdx]

  return (
    <AppLayout>
      <Sidebar
        teams={data.me.teams.map(t => ({
          id: t.id,
          letter: t.name.charAt(0).toUpperCase(),
        }))}
        team={team}
      />
      <Header channelName="Someones-Username" />
      <DirectMessageContainer teamId={teamId} userId={userId} />
      <SendMessage
        msgSubmit={async text => {
          const res = await client.mutate({
            mutation: createDirectMessageMutation,
            variables: { text, receiverId: userId, teamId },
          })
          console.log(res)
        }}
        placeholder={userId}
      />
    </AppLayout>
  )
}

export default DirectMessage
