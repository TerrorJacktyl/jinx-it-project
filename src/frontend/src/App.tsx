import React from "react";
import styled from "styled-components"
import "./App.css";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import Edit from "./Edit";
import Portfolio from "./Portfolio";
import NotFound from "./NotFound";

import { BrowserRouter as Router, Switch, Route, RouteComponentProps } from "react-router-dom";
import { UserContextProvider, LoggedInRoute, PortfolioDisplay, Routes } from "jinxui";

const OverallDiv = styled.div`
  overflow-x: hidden;
`;

function App() {
  const app = (
    // Wrap the whole app in the UserContext so they can all access the user
    // data without passing it as props everywhere
    <UserContextProvider>
      <Router>
        <OverallDiv className="App">
          <Switch>
            <Route path={Routes.HOME} exact component={Home} />
            <Route path={Routes.LOGIN} exact component={Login} />
            <Route path={Routes.SIGNUP} exact component={Signup} />
            <LoggedInRoute path={Routes.PORTFOLIO_EDIT} exact component={Edit} />
            <LoggedInRoute path={Routes.PORTFOLIO_DISPLAY} exact component={PortfolioDisplay} />
            <Route path={Routes.PORTFOLIO_DISPLAY_BASE + "/:username"} exact render={
              ({ match }: RouteComponentProps<{ username: string }>) => <Portfolio username={match.params.username} />
            } />
            {/* if none of the other routes match, the route below would be matched */}
            <Route component={NotFound} />
          </Switch>
        </OverallDiv>
      </Router>
    </UserContextProvider>
  );
  return app;
}

export default App;
