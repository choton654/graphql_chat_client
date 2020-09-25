import React from "react"
import styled from "styled-components"

const ChannelWrapper = styled.div`
  grid-column: 2;
  grid-row: 1 / 4;
  background-color: #4e3a4c;
  color: #958993;
`

function Channels({ teamName, username, channels, users }) {
  return (
    <ChannelWrapper>
      <div>
        {teamName}
        {username}
      </div>
      <div>
        <ul>
          <li>Channels</li>
          {channels.map(({ id, name }) => (
            <li key={`channel-${id}`}>#{name}</li>
          ))}
        </ul>
        <ul>
          <li>Direct Messages</li>
          {users.map(({ id, name }) => (
            <li key={`user-${id}`}>{name}</li>
          ))}
        </ul>
      </div>
    </ChannelWrapper>
  )
}

export default Channels
