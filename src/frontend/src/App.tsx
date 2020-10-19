import React from "react";
import styled from "styled-components"
import "./App.css";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import Edit from "./Edit";
import Portfolio from "./Portfolio";
import { BrowserRouter as Router, Switch, Route, RouteComponentProps } from "react-router-dom";
import { UserContextProvider, LoggedInRoute, PortfolioDisplay, Routes } from "jinxui";
// import { SmoothProvider } from 'react-smooth-scrolling'
import Test from "./Test";

const OverallDiv = styled.div`
  overflow-x: hidden;
`;

function App() {
  const app = (
    // Smooth scrolling causes pages to overflow (i.e. you can scroll past the end of the page)
    // <SmoothProvider skew={false}>

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
            <Route path={"/test"} exact component={Test} />
          </Switch>
        </OverallDiv>
      </Router>
    </UserContextProvider>
    // </SmoothProvider >
  );
  return app;
}

export default App;
