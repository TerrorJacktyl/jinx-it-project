import React from "react";
import "./App.css";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import Edit from "./Edit";
import Portfolio from "./Portfolio"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserContextProvider, LoggedInRoute, Routes } from "jinxui";

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
            <Route path={Routes.SIGNUP} exact component={Signup} />
            <LoggedInRoute path={Routes.PORTFOLIO_EDIT} exact component={Edit} />
            <LoggedInRoute path={Routes.PORTFOLIO_DISPLAY} exact component={Portfolio} />
          </Switch>
        </div>
      </Router>
    </UserContextProvider>
  );
}

export default App;
