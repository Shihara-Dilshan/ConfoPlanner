import React from "react";
import "App.css";

import Nav from "./Nav";
import Header from "./Components/Common/Header";
import Home from "./Components/Home/Home";
import Footer from "./Components/Common/Footer";

import {BrowserRouter as Router, Switch, Link, Route} from 'react-router-dom'
import { Container } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({

}))

const App = () => (
  <Router>
    <Container maxWidth="lg">
      <Header />

      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>

      <Footer />
    </Container>
   
  </Router>
);

export default App;
