import React, {useContext, useEffect, useState} from 'react'
import { useTheme, makeStyles } from '@material-ui/core/styles'
import ProfileLayout from './ProfileLayout'
import { Grid, Paper, Avatar, Typography, Container, TextField, CircularProgress, Button } from '@material-ui/core'
import { AuthContext } from '../../util/Auth'
import { LoginContext } from '../../context/loginContext'
import { storageRef } from '../../util/firebase'
import { API } from '../../config'

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
    },
    textContain: {
        marginTop: '10px'
    },
    buttonContain: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '10px'
    },
    label: {
        fontSize: '10px'
    }
}))

const Profile = () => {

    const classes = useStyles()
    const theme = useTheme()

    const [currentUser, setCurrentUser] = useContext(AuthContext) 
    const [user, setUser] = useState({})

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [profilePic, setProfilePic] = useState(null)
    const [profilePicUrl, setProfilePicUrl] = useState('')

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
                setName(res.result.name)
                setEmail(res.result.email)
                setProfilePicUrl(res.result.profilePicture)
                resolve(res)
            },1000)
        })
    }

    const validateProfilePic = () => {

    }

    const updateProfile = (id) => {
        fetch(`${API}/user/update/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                name: name,
                email: email,
                profilePicture: profilePicUrl
            })
        })
        .then(res => {return res.json()})
        .then(res => {
            setUser(res.result)
        })
    }

    const uploadProfilePic = () => {
        return new Promise((resolve, reject) => {
            try {
                
                const upload = storageRef
                .ref(`profilepic/${name}`)
                .put(profilePic)
            
                upload.on("stage_changed", (snapshot) => {},
                (err) => {
                    console.log(err)
                },
                () => {
                    storageRef
                        .ref("paperstemp")
                        .child(name)
                        .getDownloadURL()
                        .then((url) => {
                            console.log(url)
                            resolve(url)
                            setProfilePicUrl(url)
                        })
                })    

            } catch (err) {
                reject("Something went wrong")
            }
           
        })
    }

    const handleProfileUpdate = (e) => {
        e.preventDefault()
        uploadProfilePic().then(res => {
            updateProfile(localStorage.getItem("userId"))
        })
    }

    const onChangeProfilePic = (e) => {
        if(e.target.files.length>0) {
            setProfilePic(e.target.files[0])
        }
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
                                    <TextField type="file" onChange={onChangeProfilePic}  />
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
                                    <p>My Personal Details</p>
                                    <div className={classes.textContain}>
                                        <p className={classes.label}>Name: </p><TextField fullWidth value={user.name} onChange={(e) => {setName(e.target.value)}}  />
                                    </div>
                                    <div className={classes.textContain}>
                                        <p className={classes.label}>Email: </p><TextField fullWidth value={user.email} onChange={(e) => {setEmail(e.target.value)}} />
                                    </div> 
                                    <div className={classes.buttonContain}>
                                        <Button variant="contained" onClick={handleProfileUpdate}>Save</Button>
                                        <Button variant="outlined">Cancel</Button>
                                    </div>
                                    
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
