import React from 'react'
import { useTheme, makeStyles } from '@material-ui/core/styles'
import ProfileLayout from './ProfileLayout'
import { Grid, Paper, Avatar, Typography, Container, TextField } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    pageContent: {
        margin: '20px'
    },
    profileContainer: {
        marginTop: '20px'
    },
    profileCard: {
        padding: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    avatar: {
        width: theme.spacing(20),
        height: theme.spacing(20)
    },
    profileCardBottum: {
        textAlign: 'center'
    },
    PageContainer: {
        marginTop: '10px'
    }
}))

const Profile = () => {

    const classes = useStyles()
    const theme = useTheme()

    return (
        <ProfileLayout>
           <div>
               <h2>My Profile</h2>
               <div className={classes.profileContainer}>
                    <Grid container>
                        <Grid item md="6" xs="12">
                            <Paper className={classes.profileCard}>
                                <Avatar alt="profile image" className={classes.avatar} src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
                                <div className={classes.profileCardBottum}>
                                    <h4>David Malan</h4>
                                    <h5>Attendee</h5>
                                </div>
                            </Paper>
                        </Grid>
                        <Grid item md="6" xs="12" className={classes.PageContainer}>
                            <Container>
                                <form>
                                    <TextField fullWidth  />
                                </form>
                            </Container>
                        </Grid>
                    </Grid>
               </div>
           </div>
        </ProfileLayout>
    )
}

export default Profile
