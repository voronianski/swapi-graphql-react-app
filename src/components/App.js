import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Header from "./Header";
import Search from "./Search";
import Person from "./Person";
import History from "./History";

const App = () => (
  <Router>
    <div className="app">
      <Header />
      <div className="container py4">
        <Switch>
          <Route exact path="/" component={Search} />
          <Route path="/person/:id" component={Person} />
          <Route path="/history" component={History} />
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </div>
    </div>
  </Router>
);

export default App;
