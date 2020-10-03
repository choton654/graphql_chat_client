import { useQuery } from "@apollo/client"
import React from "react"
import { Comment } from "semantic-ui-react"
import Messages from "../components/Messages"
import { directMessagesQuery } from "../graphql/query"

function DirectMessageContainer({ teamId, userId }) {
  const { loading, error, data, subscribeToMore } = useQuery(
    directMessagesQuery,
    {
      variables: { teamId, userId },
      fetchPolicy: "network-only",
    }
  )

  // const suscribe = channelId =>
  //   subscribeToMore({
  //     document: newChannelMessageSubscription,
  //     variables: { channelId },
  //     updateQuery: (prev, { subscriptionData }) => {
  //       console.log(prev, subscriptionData)
  //       if (!subscriptionData.data) return prev
  //       return {
  //         ...prev,
  //         messages: [...prev.messages, subscriptionData.data.newMessage],
  //       }
  //     },
  //     onError: err => console.error(err.message),
  //   })

  // let unSuscribe
  // useEffect(() => {
  //   if (channelId) {
  //     unSuscribe = suscribe(channelId)
  //   }
  //   return () => {
  //     unSuscribe()
  //   }
  // }, [channelId])

  if (loading) return "Loading..."
  if (error) return `Error! ${error.message}`
  return (
    <>
      <Messages>
        <Comment.Group>
          {data.directMessages.map(m => (
            <Comment key={m.id}>
              <Comment.Content>
                <Comment.Author as="a">{m.sender.username}</Comment.Author>
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

export default DirectMessageContainer
