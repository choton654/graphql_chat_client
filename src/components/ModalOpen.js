import { gql, useMutation } from "@apollo/client"
import { useFormik } from "formik"
import React from "react"
import { Button, Form, Input, Modal } from "semantic-ui-react"
import { allTeamsQuery } from "../containers/Sidebar"

const CREATE_CHANNEL = gql`
  mutation createChannel($teamId: ID!, $name: String!) {
    createChannel(teamId: $teamId, name: $name) {
      ok
      channel {
        id
        name
      }
    }
  }
`

function ModalOpen({ open, onClose, teamId }) {
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: values => {
      console.log(values)
      console.log(teamId)
      createChannel({
        optimisticResponse: {
          createChannel: {
            __typename: "Mutation",
            ok: true,
            channel: {
              __typename: "Channel",
              id: -1,
              name: values.name,
            },
          },
        },
        variables: {
          teamId,
          name: values.name,
        },
      })
        .then(res => {
          console.log(res)
          onClose()
        })
        .catch(err => console.error(err.message))
    },
  })

  const [createChannel] = useMutation(CREATE_CHANNEL, {
    update: (cache, { data: { createChannel } }) => {
      const { ok, channel } = createChannel
      console.log("channel", createChannel)
      if (!ok) {
        return
      }
      const data = cache.readQuery({ query: allTeamsQuery })
      console.log("data", data)
      cache.writeQuery({
        query: allTeamsQuery,
        data: {
          allTeams: data.allTeams.map(team => {
            if (team.id === teamId) {
              return {
                ...team,
                channels: [...team.channels, channel],
              }
            } else return team
          }),
        },
      })
    },
  })

  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Header>Add Channel</Modal.Header>
      <Modal.Content>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Field>
            <Input
              fluid
              name="name"
              value={formik.values.name}
              placeholder="Channel Name"
              onChange={formik.handleChange}
            />
          </Form.Field>
          <Form.Group widths="equal">
            <Button fluid onClick={onClose}>
              Cancel
            </Button>
            <Button fluid>Create Channel</Button>
          </Form.Group>
        </Form>
      </Modal.Content>
    </Modal>
  )
}

export default ModalOpen
