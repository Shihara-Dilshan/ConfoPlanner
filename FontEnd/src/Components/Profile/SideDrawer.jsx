import React, {useState} from 'react'
import {Grid, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider} from '@material-ui/core'
import {useTheme, makeStyles} from '@material-ui/core/styles'
import {Link} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: 'rgb(63 81 181 / 4%)'
    },
    toolbar: theme.mixins.toolbar,
    sideBar: {
        marginTop: '40px'
    },
    navLink: {
        textDecoration: 'none',
        color: 'black'
    },

}))

function SideDrawer() {

    const theme = useTheme()
    const classes = useStyles()
    const [mobileOpen, setMobileOpen] = useState(true)

    const sideBarList = [
        {
            name: "Profile",
            path: "profile"
        },
        {
            name: "General",
            path: "general"
        },
        {
            name: "Add Research Paper",
            path: "addpaper"
        },
        {
            name: "Add WorkShop",
            path: "addworkshop"
        },
        {
            name: "Settings",
            path: "setting"
        },
    ]

    return (
        <Grid item xs="3" className={classes.sideBar}>
                <Divider />
                <div>
                    <List className={classes.root}>
                        {sideBarList.map((item,index) => (
                            <Link to={`/${item.path}`} className={classes.navLink}>
                                <ListItem button key={index}>
                                    <ListItemText primary={item.name} />
                                </ListItem>
                            </Link>
                            ))}
                    </List>
                </div>
            
        </Grid>
    )
}

export default SideDrawer
