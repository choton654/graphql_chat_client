import React from "react"
import styled from "styled-components"

const TeamWrapper = styled.div`
  grid-column: 1;
  grid-row: 1 / 4;
  background-color: #362234;
  color: #958993;
`

function Teams({ teams }) {
  return (
    <TeamWrapper>
      <div>Teams</div>
      <ul>
        {teams.map(({ id, letter }) => (
          <li key={`team-${id}`}>{letter}</li>
        ))}
      </ul>
    </TeamWrapper>
  )
}

export default Teams
