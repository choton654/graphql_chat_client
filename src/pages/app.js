import { Router } from "@reach/router"
import React from "react"
import ViewTeams from "../components/view-teams"
import CreateTeam from "../routes/create-team"
import PrivateRoute from "../routes/protected-route"
const App = () => {
  return (
    <Router basepath="/app">
      <ViewTeams path="/view-team/" />
      <ViewTeams path="/view-team/:teamId" />
      <PrivateRoute path="/create-team" component={CreateTeam} />
    </Router>
  )
}
export default App
