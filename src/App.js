import React, { createContext, useState } from "react";
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import NoMatch from "./Component/NoMatch/NoMatch";
import Header from "./Component/Header/Header";
import Home from "./Component/Home/Home";
import Login from "./Component/Login/Login";
import Destination from "./Component/Destination/Destination";
import Blog from "./Component/Blog/Blog";
import Contact from "./Component/Contact/Contact";
import PrivateRoute from "./Component/PrivateRoute/PrivateRoute";
import Ride from "./Component/Ride/Ride";

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>

      <Router >
      <Header></Header>
        <Switch>

          <Route exact path="/">
            <Home></Home>
          </Route>

          <Route path="/home">
            <Home></Home>
          </Route>

          <Route path="/destination">
            <Destination></Destination>
          </Route>

          <Route path="/login">
            <Login></Login>
          </Route>

          <PrivateRoute path="/login">
            <Ride></Ride>
          </PrivateRoute>

          <Route path="/blog">
            <Blog></Blog>
          </Route>

          <Route path="/contact">
            <Contact></Contact>
          </Route>

          <Route path="*">
            <NoMatch></NoMatch>
          </Route>

        </Switch>    
      </Router>
    </UserContext.Provider>
  );
}

export default App;
