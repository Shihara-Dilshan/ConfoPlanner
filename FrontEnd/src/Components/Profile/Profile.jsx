import React, {useContext, useEffect, useState} from 'react'
import { useTheme, makeStyles } from '@material-ui/core/styles'
import ProfileLayout from './ProfileLayout'
import { Grid, Paper, Avatar, Typography, Container, TextField, CircularProgress } from '@material-ui/core'
import { AuthContext } from '../../util/Auth'
import { LoginContext } from '../../context/loginContext'

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

    const [currentUser, setCurrentUser] = useContext(AuthContext) 
    const [user, setUser] = useState({})

    const [islLoggedIn, setIslLoggedIn] = useContext(LoginContext)

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        console.dir(currentUser)
        setLoading(true)
        fetchUser().then(res=> {
            waitForSetUserData(res).then(res=> {
                setLoading(false)
            }).catch(err=> {
                setLoading(true)
            })
            //setUser(res.result)
            //setLoading(false)
        }).catch(err=> {
            setLoading(true)
            console.log(err)
        })
    },[])

    const waitForSetUserData = (res) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                setUser(res.result)
                resolve(res)
            },1000)
        })
    }

    const fetchUser = () => {
        return new Promise((resolve,reject) => {
            fetch(`http://localhost:5000/api/user/singleuser/${localStorage.getItem('userId')}`)
            .then((res)=> {return res.json()})
            .then((res) => {
                console.log(res)
                if(res.result!==undefined) {
                    resolve(res)
                }else {
                    reject(res)
                }
            }).catch((err) => {
                console.log(err)
                reject(err)
            })
        })
    }


    return (
        <ProfileLayout>
           <div>
               <h2>My Profile</h2>
               <div className={classes.profileContainer}>
                    <Grid container>
                        <Grid item md="6" xs="12">
                            {loading ? (
                                <div>
                                   <CircularProgress />
                              </div>
                            ): (
                                <div>
                                    <Paper className={classes.profileCard}>
                                    <Avatar alt="profile image" className={classes.avatar} src={`${user.profilePicture}`} />
                                    <div className={classes.profileCardBottum}>
                                        <h4>{user.name}</h4>
                                        <h5>{user.role}</h5>
                                    </div>
                                    </Paper>
                                </div>
                            )}
                        </Grid>
                        {/* {JSON.stringify(user)} */}
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
