import { gql, useMutation } from "@apollo/client"
import React, { useState } from "react"
import { Button, Container, Form, Message } from "semantic-ui-react"

const CREATE_TEAM = gql`
  mutation createTeam($name: String!) {
    createTeam(name: $name) {
      ok
      error {
        error
      }
    }
  }
`

const CreateTeam = () => {
  const [team, setTeam] = useState("")
  const [error, setError] = useState({
    ok: false,
    error: "",
  })
  const [createTeam, { data }] = useMutation(CREATE_TEAM)

  const handleSubmit = e => {
    e.preventDefault()
    createTeam({
      variables: { name: team },
    })
      .then(res => {
        if (!res.data.createTeam.ok) {
          setError({
            ok: true,
            error: res.data.createTeam.error.error,
          })
        }
        setTeam("")
      })
      .catch(err => console.error(err))
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit} error={error.ok}>
        <Form.Field>
          <label>Create Team</label>
          <input
            type="text"
            required
            name="team"
            onChange={e => {
              setTeam(e.target.value)
              setError({
                ok: false,
                error: "",
              })
            }}
            value={team}
            placeholder="Enter Team Name"
          />
        </Form.Field>
        {error.ok && (
          <Message
            error={error.ok}
            header="Action Forbidden"
            content={error.error}
          />
        )}
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  )
}

export default CreateTeam
