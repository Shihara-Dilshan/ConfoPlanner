import React from "react";
import "App.css";

import Nav from "./Nav";
import Header from "./Components/Common/Header";
import Footer from "./Components/Common/Footer";
import Home from './Components/Home/Home'

import {BrowserRouter as Router, Switch, Link, Route} from 'react-router-dom'
import { Container } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({

}))

const App = () => (
  <Router>
    <Container maxWidth="lg">
      <Header />

      <main>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </main>
      
      <Footer />

    </Container>
  </Router>
);

export default App;
