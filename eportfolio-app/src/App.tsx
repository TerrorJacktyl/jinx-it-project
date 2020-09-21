import React from "react";
import "./App.css";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import Profile from "./Profile";
import Portfolio from "./Portfolio";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserContextProvider } from "jinxui";

function App() {
  return (
    // Wrap the whole app in the UserContext so they can all access the user
    // data without passing it as props everywhere
    <UserContextProvider>
      <Router>
        <div className="App">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/profile" exact component={Profile} />
            <Route path="/portfolio" exact component={Portfolio} />
          </Switch>
        </div>
      </Router>
    </UserContextProvider>
  );
}

export default App;
