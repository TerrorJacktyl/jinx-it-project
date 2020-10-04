import React from "react";
import "./App.css";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import Profile from "./Profile";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserContextProvider, LoggedInRoute, LoggedOutRoute, Routes } from "jinxui";

function App() {
  return (
    // Wrap the whole app in the UserContext so they can all access the user
    // data without passing it as props everywhere
    <UserContextProvider>
      <Router>
        <div className="App">
          <Switch>
            <Route path={Routes.HOME} exact component={Home} />
            <Route path={Routes.LOGIN} exact component={Login} />
            <LoggedOutRoute path={Routes.SIGNUP} exact component={Signup} />
            <LoggedInRoute path={Routes.PORTFOLIO_DISPLAY} exact component={Profile} />
          </Switch>
        </div>
      </Router>
    </UserContextProvider>
  );
}

export default App;
