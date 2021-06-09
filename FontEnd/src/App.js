import React from "react";
import "App.css";

import Nav from "./Nav";
import Header from "./Components/Common/Header";
import Footer from "./Components/Common/Footer";
import Home from './Components/Home/Home'

import {BrowserRouter as Router, Switch, Link, Route} from 'react-router-dom'
import { Container } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles'
import Download from "./Components/Home/Download";
import Login from "./Components/Common/Login";

const useStyles = makeStyles((theme) => ({

}))

const App = () => (
  <Router>
    <Container maxWidth="lg">

      <main>
        <Switch>
          <Route path="/"  exact component={Home} />
          <Route path="/download" exact component={Download} />
          <Route path="/login" exact component={Login} />
        </Switch>
      </main>

    </Container>

  </Router>
);

export default App;
