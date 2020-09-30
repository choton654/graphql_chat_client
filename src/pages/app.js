import { Router } from "@reach/router"
import React from "react"
import CreateTeam from "../routes/create-team"
import DirectMessage from "../routes/direct-message"
import PrivateRoute from "../routes/protected-route"
import ViewTeams from "../routes/view-teams"
const App = () => {
  return (
    <Router basepath="/app">
      <PrivateRoute
        path="/view-team/:teamId/:userId"
        component={DirectMessage}
      />
      <PrivateRoute path="/view-team/" component={ViewTeams} />
      <PrivateRoute path="/view-team/:teamId" component={ViewTeams} />
      <PrivateRoute
        path="/view-team/:teamId/:channelId"
        component={ViewTeams}
      />
      <PrivateRoute path="/create-team" component={CreateTeam} />
    </Router>
  )
}
export default App
