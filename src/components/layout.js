import { Link } from "gatsby"
import React from "react"
import { Menu } from "semantic-ui-react"
const Layout = ({ children }) => {
  return (
    <div>
      <Menu>
        <Link to="/">
          <Menu.Item>Home</Menu.Item>
        </Link>
        <Link to="/register">
          <Menu.Item>Register</Menu.Item>
        </Link>
        <Link to="/login">
          <Menu.Item>Login</Menu.Item>
        </Link>
        <Link to="/createTeam">
          <Menu.Item>Create Team</Menu.Item>
        </Link>
      </Menu>
      {children}
    </div>
  )
}

export default Layout