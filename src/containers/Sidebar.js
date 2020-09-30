import decode from "jwt-decode"
import React, { useState } from "react"
import AddChannelModal from "../components/AddChannelModal"
import Channels from "../components/Channels"
import InvitePeopleModal from "../components/InvitePeopleModal"
import Teams from "../components/Teams"

function Sidebar({ teams, team }) {
  const [openModal, setopenModal] = useState(false)
  const [openInvitePeopleModal, setopenInvitePeopleModal] = useState(false)

  const toggleChannelModal = e => {
    setopenModal(() => !openModal)
  }
  const toggleInvitePeopleModal = e => {
    setopenInvitePeopleModal(() => !openInvitePeopleModal)
  }

  let username = ""
  let isOwner = false
  try {
    const token = localStorage.getItem("token")
    const { user } = decode(token)
    username = user.username
    isOwner = user._id === team.owner
  } catch (err) {}

  return [
    <Teams key="team-sidebar" teams={teams} />,
    <Channels
      key="channels-sidebar"
      teamName={team?.name}
      username={username}
      teamId={team?.id}
      isOwner={isOwner}
      channels={team?.channels}
      openChannelModal={toggleChannelModal}
      oninvitePeopleClick={toggleInvitePeopleModal}
      users={[
        { id: 1, name: "slackbot" },
        { id: 2, name: "user1" },
      ]}
    />,
    <AddChannelModal
      key="model-sidebar"
      teamId={team?.id}
      open={openModal}
      onClose={toggleChannelModal}
    />,
    <InvitePeopleModal
      key="invite-people"
      teamId={team?.id}
      open={openInvitePeopleModal}
      onClose={toggleInvitePeopleModal}
    />,
  ]
}

export default Sidebar
