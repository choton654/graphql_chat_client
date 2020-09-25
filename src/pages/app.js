import { Router } from "@reach/router"
import React from "react"
import CreateTeam from "../routes/create-team"
import PrivateRoute from "../routes/protected-route"
const App = () => {
  return (
    <Router basepath="/app">
      <PrivateRoute path="/create-team" component={CreateTeam} />
    </Router>
  )
}
export default App
