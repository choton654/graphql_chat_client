import { useQuery } from "@apollo/client"
import React from "react"
import { Comment } from "semantic-ui-react"
import Messages from "../components/Messages"
import { messagesQuery } from "../graphql/query"

function MessageContainer({ channelId }) {
  const { loading, error, data } = useQuery(messagesQuery, {
    variables: { channelId },
  })
  // console.log(data)
  if (loading) return "Loading..."
  if (error) return `Error! ${error.message}`

  return (
    <>
      <Messages>
        <Comment.Group>
          {data.messages.map(m => (
            <Comment key={m.id}>
              <Comment.Content>
                <Comment.Author as="a">{m.user.username}</Comment.Author>
                <Comment.Metadata>
                  <div>{m.createdAt}</div>
                </Comment.Metadata>
                <Comment.Text>{m.text}</Comment.Text>
                <Comment.Actions>
                  <Comment.Action>Reply</Comment.Action>
                </Comment.Actions>
              </Comment.Content>
            </Comment>
          ))}
        </Comment.Group>
      </Messages>
    </>
  )
}

export default MessageContainer
