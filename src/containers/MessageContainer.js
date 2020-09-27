import { useQuery } from "@apollo/client"
import React from "react"
import Messages from "../components/Messages"
import { messagesQuery } from "../graphql/query"

function MessageContainer(channelId) {
  const { loading, error, data } = useQuery(messagesQuery, {
    variables: { channelId },
  })
  console.log(data)
  if (loading) return "Loading..."
  if (error) return `Error! ${error.message}`

  return (
    <div>
      <Messages channelId={channelId}>{JSON.stringify(data.messages)}</Messages>
    </div>
  )
}

export default MessageContainer
