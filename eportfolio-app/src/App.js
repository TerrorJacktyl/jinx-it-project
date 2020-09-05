import React from 'react';
import './App.css';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import Profile from './Profile'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/signup" exact component={Signup}/>
          <Route path="/profile" exact component={Profile}/>
        </Switch>
      </div>
    </Router>

  );
}

export default App;
