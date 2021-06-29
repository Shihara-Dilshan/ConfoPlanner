import React, { useContext } from "react";

import { Link, withRouter } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { Button, IconButton, Toolbar, Typography } from "@material-ui/core";
import { LoginContext } from "./../../context/loginContext";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: "space-between",
    overflowX: "auto",
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
    textDecoration: "none",
    color: "black",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

const Header = ({ history }) => {
  const [islLoggedIn, setIslLoggedIn] = useContext(LoginContext);
  const classes = useStyles();

  const navItems = [
    { title: "Header", path: "/" },
    { title: "Work Shops", path: "/workshops" },
    { title: "Rearch Papers", path: "/researchpaper" },
    { title: "Download", path: "/download" },
    { title: "Contact", path: "/contact" },
    { title: "Profile", path: "/profile" },
  ];

  const nevigator = (role) => {
      switch(role){
          case "Attendee":
            return <Link to="/attendee">Account</Link>
          case "Researcher":
            return <Link to="/researcher">Account</Link>
          case "WorkshopPresenter":
            return <Link to="/wp">Account</Link>
          default:
            return <Link to="/">Home</Link>
      }
  }

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <IconButton>
          <FavoriteBorderIcon fontSize="small" />
        </IconButton>

        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          ConfoPlanner
        </Typography>
        {islLoggedIn.status === true ? (
          <>
            <Button variant="outlined" size="small" style={{marginRight: 10}}>
              {nevigator(islLoggedIn.role)}
            </Button>
            <Button variant="outlined" size="small">
              <Link to="/login">Log out</Link>
            </Button>
          </>
        ) : (
          <Button variant="outlined" size="small">
            <Link to="/login">Sign In</Link>
          </Button>
        )}
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        className={classes.toolbarSecondary}
      >
        {navItems.map((item) => (
          <Link
            color="inherit"
            noWrap
            key={item.title}
            variant="body2"
            to={item.path}
            className={classes.toolbarLink}
          >
            {item.title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
};

export default withRouter(Header);
