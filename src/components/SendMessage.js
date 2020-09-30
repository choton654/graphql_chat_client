import { useFormik } from "formik"
import React from "react"
import { Input } from "semantic-ui-react"
import styled from "styled-components"

const SendMessageWrapper = styled.div`
  grid-column: 3;
  grid-row: 3;
  margin: 20px;
`

function SendMessage({ placeholder, channelId, msgSubmit }) {
  const formik = useFormik({
    initialValues: {
      message: "",
    },
    onSubmit: values => {
      console.log(values)
      msgSubmit(values.message)
      formik.initialValues.message = ""
      // createMessage({
      //   variables: {
      //     text: values.message,
      //     channelId: channelId,
      //   },
      // })
      // .then(res => {
      //   console.log(res)
      // })
      // .catch(err => console.error(err.message))
    },
  })

  const ENTER_KEY = 13

  // const [createMessage] = useMutation(createMessageMutation)

  return (
    <SendMessageWrapper>
      <Input
        fluid
        onKeyDown={e => {
          if (e.keyCode === ENTER_KEY) {
            formik.handleSubmit(e)
          }
        }}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        name="message"
        value={formik.values.message}
        placeholder={`Message #${placeholder}`}
      />
    </SendMessageWrapper>
  )
}

export default SendMessage
