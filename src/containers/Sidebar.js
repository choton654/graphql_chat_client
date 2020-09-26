import decode from "jwt-decode"
import React, { useState } from "react"
import Channels from "../components/Channels"
import ModalOpen from "../components/ModalOpen"
import Teams from "../components/Teams"

function Sidebar({ teams, team }) {
  const [openModal, setopenModal] = useState(false)

  const openChannelModal = () => {
    setopenModal(true)
  }

  const closeModal = () => {
    setopenModal(false)
  }

  let username = ""
  try {
    const token = localStorage.getItem("token")
    const { username: uname } = decode(token)
    username = uname
  } catch (err) {}

  return [
    <Teams key="team-sidebar" teams={teams} />,
    <Channels
      key="channels-sidebar"
      teamName={team?.name}
      username={username}
      teamId={team.id}
      channels={team?.channels}
      openChannelModal={openChannelModal}
      users={[
        { id: 1, name: "slackbot" },
        { id: 2, name: "user1" },
      ]}
    />,
    <ModalOpen
      key="model-sidebar"
      teamId={team.id}
      open={openModal}
      onClose={closeModal}
    />,
  ]
}

export default Sidebar
