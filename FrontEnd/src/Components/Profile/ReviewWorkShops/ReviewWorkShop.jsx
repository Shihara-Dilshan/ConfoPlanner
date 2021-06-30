import React, {useState, useEffect} from 'react'
import { API } from '../../../config'
import { getUserById } from '../../../Auth'
import { Grid, Button, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import emailjs from 'emailjs-com'
import ReviewLayout from '../ViewResearchPaper/ReviewLayout'

const useStyles = makeStyles((theme) => ({
    userData: {
        marginTop: '10px',
    },
    status: {
        display: 'flex',
        alignItems: 'center'
    },
    ApproveBtn: {
        marginTop: theme.spacing(1),
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white
    }
}))

const ReviewWorkShop = () => {

    const classes = useStyles()

    const [user, setUser] = useState({})
    const [workshop, setWorkshop] = useState({})
    const [approving, setApproving] = useState(false)
    const [loading, setLoading] = useState(false)
    const [reviewer, setReviewr] = useState({})

    const fetchWorkshopDetails = (id) => {
        setLoading(true)
        return new Promise((resolve, reject) => {
            fetch(`${API}/workshop/viewbyid/${id}`)
            .then(res => { return res.json() })
            .then(res => {
                setLoading(false)
                console.log('workshop',res.result[0])
                setWorkshop(res.result[0])
                resolve(res.result[0])
            })
            .catch(err => {
                setLoading(false)
                console.log('workshop err',err)
                reject(err)
            })
        })
       
    }

    const getWorkshopId = () => {
        let id = localStorage.getItem("workshopId")
        return id
    }

    const getUserDetails = async(id) => {
        setLoading(true)
        try {
            let res = await getUserById(id)
            console.log('single user', res)
            setUser(res.result)
            setLoading(false)
        } catch (err) {
            setLoading(false)
            console.log(err)
        }
    }

    const getReviewerDetails = async(id) => {
        setLoading(true)
        try {
            let res = await getUserById(id)
            console.log('reviewer user', res)
            setReviewr(res.result)
            setLoading(false)
        } catch (err) {
            setLoading(false)
            console.log(err)
        }
    }

    const approveWorkshop = (approveStatus) => {
        setApproving(true)
        fetch(`${API}/workshop/updatestatus/${getWorkshopId()}`, {
            headers: {
                'Content-Type': 'application/json',
                token: `${localStorage.getItem("token")}`
            },
            method: 'PUT',
            body: JSON.stringify({
                status: approveStatus
            })
        })
        .then(res => {return res.json()})
        .then(res => {
            setApproving(false)
            console.log('updated',res)
            setWorkshop(res.result)
            emailjs.send("service_onyqcs5","template_dua19hi", {
                from_name: user.name,
                to_name: reviewer.name,
                message: 'Your Workshop has been approved',
                user_email: user.email,
            }, 'user_hTZQq5uFzSAnCR7Dthq5u').then(res => {
                console.log(res.text)
            }).catch(err => {
                console.log(err.text)
            })
            
        }).catch(err => {
            setApproving(false)
            console.log(err)
        })
    }

    useEffect(() => {
        let id = getWorkshopId()
        fetchWorkshopDetails(id).then(res => {
            getUserDetails(res.PresenterRef)
        })
        getReviewerDetails(localStorage.getItem("userId"))
    },[])

    return (
        <ReviewLayout>
            <h3>Approve Research Paper</h3>
            {loading ? (
                <CircularProgress />
            ) : (
                <form>
                <Grid container>
                    <Grid container>
                        <Grid item xs="12" md="6">
                            <div className={classes.userData}>
                                <p>Title: {workshop.title}</p>
                            </div>
                            <div className={classes.userData}>
                                <p>Description: {workshop.description}</p>
                            </div>
                            <div className={classes.userData}>
                                <Button variant="outlined" color="primary"><a href={`${workshop.presentationFileURL}`}>Download Percentages</a></Button>
                            </div>
                        </Grid>
                        <Grid item xs="12" md="6">
                            <div className={classes.userData}>Owner Name: {user.name}</div>
                            <div className={classes.userData}>Owner Email: {user.email}</div>
                            <div>{workshop.status=='initial' ? 
                                (
                                <div className={classes.status}>
                                    <p>Not Approved</p>
                                    <span style={{marginLeft: '10px'}}><HighlightOffIcon color='error' /></span>
                                </div>
                                ) 
                                : 
                                (
                                <div className={classes.status}>
                                    <p>Approved</p>
                                    <span style={{marginLeft: '10px'}}><CheckCircleOutlineIcon color='primary' /></span>
                                    </div>
                                )} 
                            </div>
                            {workshop.status=='initial' ? (
                                <Button className={classes.ApproveBtn} variant="contained" color="black" onClick={()=>{approveWorkshop("reviewd")}}>
                                    {approving ? (
                                        <div>Loading</div>
                                    ) : (
                                        <div>Approve Paper</div>
                                    )}
                                </Button>
                            ) : (
                                <Button className={classes.ApproveBtn} variant="contained" color="black" onClick={()=>{approveWorkshop("initial")}}>
                                    {approving ? (
                                        <div>Loading</div>
                                    ) : (
                                        <div>Dis-Approve Paper</div>
                                    )}
                                </Button>
                            )}
                            
                        </Grid>        
                    </Grid>
                </Grid>
                {/* {JSON.stringify(paper)}<br />
                {JSON.stringify(user)} */}
            </form>
            )}
            
        </ReviewLayout>
    )
}

export default ReviewWorkShop
