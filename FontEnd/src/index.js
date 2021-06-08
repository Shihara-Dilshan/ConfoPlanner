import React from "react";
import ReactDOM from "react-dom";
//Import App
import App from "./App";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core'
import { red } from '@material-ui/core/colors'

const theme = createMuiTheme({
})

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <App />
    </MuiThemeProvider>
    , document.querySelector("#root"));
