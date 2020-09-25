import React from "react"
import styled from "styled-components"

const SendMessageWrapper = styled.div`
  grid-column: 3;
  grid-row: 3;
  margin: 20px;
`

function SendMessage({ channelName }) {
  return (
    <SendMessageWrapper>
      <div class="ui fluid icon input">
        <input type="text" placeholder={`Message #${channelName}`} />
        <i class="search icon"></i>
      </div>
    </SendMessageWrapper>
  )
}

export default SendMessage