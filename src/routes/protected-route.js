import { navigate } from "gatsby"
import decode from "jwt-decode"
import React from "react"

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  const isAuthenticated = () => {
    const token = localStorage.getItem("token")
    const refreshToken = localStorage.getItem("refreshToken")
    try {
      decode(token)
      decode(refreshToken)
      return true
    } catch (err) {
      return false
    }
  }

  if (!isAuthenticated() && location.pathname !== `/login`) {
    navigate("/login")
    return null
  }

  return <Component {...rest} />
}

export default PrivateRoute
