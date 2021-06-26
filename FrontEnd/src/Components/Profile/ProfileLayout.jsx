import { Grid } from '@material-ui/core'
import React from 'react'
import Layout from '../Common/Layout'
import SideDrawer from './SideDrawer'
import { useTheme, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    profileBody: {
        margin: '40px 20px',
    }
}))

const ProfileLayout = (props) => {

    const theme = useTheme()
    const classes = useStyles()

    return (
        <Layout>
            <Grid container>
                <SideDrawer />
                <Grid item xs="8" className={classes.profileBody}>
                    {props.children}
                </Grid>
            </Grid>
        </Layout>
    )
}

export default ProfileLayout
