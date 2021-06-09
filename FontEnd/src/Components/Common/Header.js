import React from 'react'

import { Link, withRouter } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import { Button, IconButton, Toolbar, Typography } from '@material-ui/core'

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

const useStyles = makeStyles((theme) => ({
    toolbar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbarTitle: {
        flex: 1
    },
    toolbarSecondary: {
        justifyContent: 'space-between',
        overflowX: 'auto',
    },
    toolbarLink: {
        padding: theme.spacing(1),
        flexShrink: 0,
        textDecoration: 'none',
        color: 'black',
        '&:hover': {
            textDecoration: 'underline'
        }
    },
}))

const Header = ({history}) => {

    const classes = useStyles();

    const navItems = [
        {title:'Header', path:"/"},
        {title:'Work Shops', path:"/workshops"},
        {title:'Rearch Papers', path:"/researchpaper"},
        {title:'Download', path:"/download"},
        {title:'Contact', path:"/contact"},
        {title:'Profile', path:"/profile"}
    ]

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
                <Button variant="outlined" size="small">Sign Up</Button>
            </Toolbar>
            <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
                {navItems.map((item) => (
                    <Link
                    color="inherit"
                    noWrap
                    key={item.title}
                    variant="body2"
                    href={item.path}
                    className={classes.toolbarLink}
                  >
                    {item.title}
                  </Link>
                ))}
            </Toolbar>
        </React.Fragment>
    )
}

export default withRouter(Header)
