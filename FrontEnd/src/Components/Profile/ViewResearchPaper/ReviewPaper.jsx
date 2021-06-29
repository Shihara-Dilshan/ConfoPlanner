import React, {useState, useEffect} from 'react'
import { API } from '../../../config'
import { getUserById } from '../../../Auth'
import { Grid, Button, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import emailjs from 'emailjs-com'
import ReviewLayout from './ReviewLayout'

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

const ReviewPaper = (props) => {

    const classes = useStyles()

    const [user, setUser] = useState({})
    const [paper, setPaper] = useState({})
    const [approving, setApproving] = useState(false)
    const [loading, setLoading] = useState(false)
    const [reviewer, setReviewr] = useState({})

    const fetchPaperDetails = (id) => {
        setLoading(true)
        return new Promise((resolve, reject) => {
            fetch(`${API}/paper/get/${id}`)
            .then(res => { return res.json() })
            .then(res => {
                setLoading(false)
                console.log(res)
                setPaper(res)
                resolve(res)
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
                reject(err)
            })
        })
       
    }

    const getPaperId = () => {
        let id = localStorage.getItem("reviewPaperId")
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

    const approvePaper = (approveStatus) => {
        setApproving(true)
        fetch(`${API}/paper/update/${getPaperId()}`, {
            headers: {
                'Content-Type': 'application/json',
                token: `${localStorage.getItem("token")}`
            },
            method: 'PUT',
            body: JSON.stringify({
                url: paper.url,
                title: paper.title,
                thumbnail: paper.thumbnail,
                status: approveStatus
            })
        })
        .then(res => {return res.json()})
        .then(res => {
            setApproving(false)
            console.log('updated',res)
            setPaper(res.result)
            emailjs.send("service_onyqcs5","template_dua19hi", {
                from_name: user.name,
                to_name: reviewer.name,
            })
            
        }).catch(err => {
            setApproving(false)
            console.log(err)
        })
    }

    useEffect(() => {
        let id = getPaperId()
        fetchPaperDetails(id).then(res => {
            getUserDetails(res.ownerRef)
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
                    {/* <Grid item xs="12" md="5">
                        <img src={`${paper.thumbnail}`} width="200" height="200" />
                    </Grid>
                    <Grid item xs="12" md="4">
                        <p>{paper.title}</p>
                    </Grid>
                    <Grid item xs="12" md="3">
                        <Button variant="outlined" color="primary"><a href={`${paper.url}`}>Download Paper</a></Button>
                    </Grid> */}
                    <Grid container>
                        <Grid item xs="12" md="6">
                            <div className={classes.userData}>
                                <img src={`${paper.thumbnail}`} width="200" height="200" />
                            </div>
                            <div className={classes.userData}>
                                <p>Title: {paper.title}</p>
                            </div>
                            <div className={classes.userData}>
                                <Button variant="outlined" color="primary"><a href={`${paper.url}`}>Download Paper</a></Button>
                            </div>
                        </Grid>
                        <Grid item xs="12" md="6">
                            <div className={classes.userData}>Owner Name: {user.name}</div>
                            <div className={classes.userData}>Owner Email: {user.email}</div>
                            <div>{paper.status=='initial' ? 
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
                            {paper.status=='initial' ? (
                                <Button className={classes.ApproveBtn} variant="contained" color="black" onClick={()=>{approvePaper("reviewd")}}>
                                    {approving ? (
                                        <div>Loading</div>
                                    ) : (
                                        <div>Approve Paper</div>
                                    )}
                                </Button>
                            ) : (
                                <Button className={classes.ApproveBtn} variant="contained" color="black" onClick={()=>{approvePaper("initial")}}>
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

export default ReviewPaper
