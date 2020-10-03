import React, { useEffect } from "react"
import { Form, Input, Button, Modal } from "semantic-ui-react"
import Downshift from "downshift"
import { useQuery } from "@apollo/client"
import { getTeamMembersQuery } from "../graphql/query"

const DirectMessageModal = ({ open, onClose, teamId }) => {
  const { loading, error, data } = useQuery(getTeamMembersQuery, {
    variables: { teamId },
    fetchPolicy: "network-only",
  })

  if (loading) return "Loading..."
  if (error) return `Error! ${error.message}`

  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Header>Add Channel</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <Downshift
              onChange={selectedUser => {
                window.location.replace(`${teamId}/user/${selectedUser.id}`)
                onClose()
              }}
            >
              {({
                getInputProps,
                getItemProps,
                isOpen,
                inputValue,
                selectedItem,
                highlightedIndex,
              }) => (
                <div>
                  <Input
                    {...getInputProps({ placeholder: "Favorite color ?" })}
                    fluid
                  />
                  {isOpen ? (
                    <div style={{ border: "1px solid #ccc" }}>
                      {data?.getTeamMembers
                        .filter(
                          i =>
                            !inputValue ||
                            i.username
                              .toLowerCase()
                              .includes(inputValue.toLowerCase())
                        )
                        .map((item, index) => (
                          <div
                            {...getItemProps({ item })}
                            key={item.id}
                            style={{
                              backgroundColor:
                                highlightedIndex === index ? "gray" : "white",
                              fontWeight:
                                selectedItem === item ? "bold" : "normal",
                            }}
                          >
                            {item.username}
                          </div>
                        ))}
                    </div>
                  ) : null}
                </div>
              )}
            </Downshift>
          </Form.Field>
          <Button fluid onClick={onClose}>
            Cancel
          </Button>
        </Form>
      </Modal.Content>
    </Modal>
  )
}

export default DirectMessageModal
