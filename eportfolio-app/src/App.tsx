import React from "react";
import "./App.css";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import Portfolio from "./Portfolio";
import Edit from "./Edit";
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
            <Route path="/portfolio" exact component={Portfolio} />
            <Route path="/edit" exact component={Edit} />
          </Switch>
        </div>
      </Router>
    </UserContextProvider>
  );
}

export default App;
