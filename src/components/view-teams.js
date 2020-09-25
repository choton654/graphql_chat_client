import React from "react"
import Sidebar from "../containers/Sidebar"
import AppLayout from "./AppLayout"
import Header from "./Header"
import Messages from "./Messages"
import SendMessage from "./SendMessage"

function ViewTeams({ teamId }) {
  return (
    <AppLayout>
      <Sidebar currentTeamId={teamId} />
      <Header channelName={"general"} />
      <Messages>
        <ul className="message-list">
          <li />
          <li />
        </ul>
      </Messages>
      <SendMessage channelName="general" />
    </AppLayout>
  )
}

export default ViewTeams
