import { useQuery } from "@apollo/client"
import { navigate } from "gatsby"
import findIndex from "lodash/findIndex"
import React from "react"
import AppLayout from "../components/AppLayout"
import SendMessage from "../components/SendMessage"
import Sidebar from "../containers/Sidebar"
import { meQuery } from "../graphql/query"

function DirectMessage({ teamId, userId }) {
  const {
    loading,
    error,
    data: { me },
  } = useQuery(meQuery, {
    fetchPolicy: "network-only",
  })
  if (loading) return "Loading..."
  if (error) return `Error! ${error.message}`
  // if (error) {
  //   navigate("/login")
  // }

  const { username, teams } = me

  console.log(teams)

  if (!error && !teams?.length) {
    navigate("/app/create-team")
  }

  const teamIdx = teamId ? findIndex(teams, ["id", teamId]) : 0
  const team = teamIdx === -1 ? teams[0] : teams[teamIdx]

  return (
    <AppLayout>
      <Sidebar
        teams={teams.map(t => ({
          id: t.id,
          letter: t.name.charAt(0).toUpperCase(),
        }))}
        team={team}
      />
      {/* {channel && <Header channelName={channel?.name || ""} />}
      {channel && <MessageContainer channelId={channel?.id} />} */}
      (
      <SendMessage onSubmit={() => {}} placeholder={userId} />)
    </AppLayout>
  )
}

export default DirectMessage
