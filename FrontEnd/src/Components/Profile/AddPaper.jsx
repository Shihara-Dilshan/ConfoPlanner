import React, {useState} from 'react'
import ProfileLayout from './ProfileLayout'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, TextField, Button } from '@material-ui/core'
import './style.css'
import { storageRef } from '../../util/firebase'

const useStyles = makeStyles((theme) => ({
    formContainer: {
        marginTop: '20px',
    },
    left: {
        marginRight: '20px'
    },
    thumbnail: {
        width: theme.spacing(20),
        height: theme.spacing(20)
    },
    input: {
        display: 'none'
    },
    thumbnailContainer: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    imageUpload: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    dropImage: {
        border: '1px solid black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        borderStyle: 'dashed',
        color: '#6d7079'
    },
    button: {
        marginTop: '20px',
        background: 'black',
        color: 'white',
        '&:hover': {
            color: 'black',
            background: 'white',
            border: '1px solid black'
        }
    },
    upload: {
        border: `1px solid ${theme.palette.divider}`,
        padding: theme.spacing(3),
        marginTop: '5px'
    }
}))

const AddPaper = () => {

    const classes = useStyles()
    const [thumbnail, setThumbnail] = useState(null)
    const [paper, setPaper] = useState(null)
    const [thumbnailError, setThumbnailError] = useState('')
    const [title, setTitle] = useState('')
    const [thumbPreview,setThumbPreview] = useState('')
    const [researchPaper, setResearchPaper] = useState({
        url: '',
        thumbnail: '',
        title: ''
    })
    const [loading, setLoading] = useState(false)


    const isLoading = () => (
        <div>
            <p>Loading....</p>
        </div>
    )

    const validateTitle = () => {
        if(title=='') {
            let paperErr = document.getElementById("titleErr")
            paperErr.classList.remove('hide')
            paperErr.innerHTML = 'Please Enter Title'
             setTimeout(() => {
                 paperErr.classList.add('hide')
             },2000)
            return false
        }else {
            setResearchPaper({...researchPaper, title: title})
            return true    
        }
    }

    const validatePaper = () => {
        if(!paper) {
            let paperErr = document.getElementById("paperErr")
            paperErr.classList.remove('hide')
            paperErr.innerHTML = 'Please Upload Paper'
             setTimeout(() => {
                 paperErr.classList.add('hide')
             },2000)
            return false
        }

        if(paper.type!=='application/pdf') {
            let paperErr = document.getElementById("paperErr")
            paperErr.classList.remove('hide')
            paperErr.innerHTML = 'Please Upload PDF'
             setTimeout(() => {
                 paperErr.classList.add('hide')
             },2000)
            return false
        }

        return true
    }

    const validateThumbnail = () => {
        if(!thumbnail) {
            let thumbErr = document.getElementById("thumbErr")
            thumbErr.classList.remove("hide")
            thumbErr.innerHTML = 'Please Upload Thumbnail'
            setTimeout(() => {
                thumbErr.classList.add("hide")
            },2000)
            return false
        }
        return true
    }

    const validateInputs = () => {
        const isPaper = validatePaper()
        const isThumb = validateThumbnail()
        const isTitle = validateTitle()
        return (
            isPaper&&isThumb&&isTitle
        )
    }

    const uploadResearchPaper = () => {
        return new Promise((resolve,reject) => {
            try {
                const upload = storageRef
                .ref(`paperstemp/${paper.name}`)
                .put(paper)

                upload.on("stage_changed", (snapshot) => {},
                    (err) => {
                        console.log(err)
                    },
                    () => {
                        storageRef
                            .ref("paperstemp")
                            .child(paper.name)
                            .getDownloadURL()
                            .then((url) => {
                                console.log(url)
                                resolve(url)
                                setResearchPaper({...researchPaper, url: url})
                            })
                    })     
            } catch (err) {
                reject("Something went wrong")
            }
           

        })
    }

    const uploadThumbnail = () => {
        return new Promise((resolve,reject) => {
            try {
                const upload = storageRef
                .ref(`imagestemp/${thumbnail.name}`)
                .put(thumbnail);
                
                 upload.on("stage_changed", (snapshot) => {},
                    (err) => {
                        console.log(err)
                        reject(err)
                    },
                    () => {
                     storageRef
                         .ref("imagestemp")
                         .child(thumbnail.name)
                         .getDownloadURL()
                         .then((url) => {
                             console.log(url)
                             resolve(url)
                             setResearchPaper({...researchPaper, thumbnail: url})
                         })
                 })
            } catch (err) {
                reject(err)
            }
          
        })
    }

    

    const addPaper = (e) => {
        setLoading(true)
        e.preventDefault()
        if(validateInputs()) {
            console.log('thumbnail: ',thumbnail)
            uploadThumbnail().then(() => {
                console.log('thumnail uploaded')
                uploadResearchPaper().then(() => {
                    setLoading(false)
                    console.log('research paper uploaded')
                }).catch((err) => {
                    setLoading(false)
                    alert(err)
                })
            }).catch(err=> {
                setLoading(false)
                alert(err)
            })
        }else {
            setLoading(false)
        }
        
    }

    const postPaper = () => {

    }

    const onChangePaper = (e) => {
        let length = e.target.files.length
        console.log(e.target.files[0]);
        let file = e.target.files[0]
        if(length>0) {
            setPaper(file)
        }
    }

   const onChangeThumbnail = (e) => {
       let length = e.target.files.length
       console.log(URL.createObjectURL(e.target.files[0]))
       if(length>0) {
           setThumbnail(e.target.files[0])
           setThumbPreview(URL.createObjectURL(e.target.files[0]))
       }
   }


    return (
        <ProfileLayout>
            <h3>Add Research Paper</h3>
            <div className={classes.formContainer}>
                <form>
                    <Grid container>
                        <Grid item xs="6" className={classes.left}>
                            <p>Add Thumbnail</p>
                            <div className={classes.thumbnailContainer}>
                                <div>
                                    <img className={classes.thumbnail} src={thumbPreview} alt="thumbnail" />
                                    <input className={classes.upload} id="paper-upload-btn" onChange={onChangeThumbnail} multiple type="file" />
                                    <p id="thumbErr" style={{color: 'red', fontSize: '12px'}} className="hide"></p>
                                </div>
                            </div>
                            <p>Add Research Paper</p>
                            <div className={classes.thumbnailContainer}>
                                <div>
                                    <input className={classes.upload} id="paper-upload-btn" onChange={onChangePaper} multiple type="file" />
                                    <p id="paperErr" style={{color: 'red', fontSize: '12px'}} className="hide"></p>
                                </div>
                            </div>
                            <p>Enter Research Paper Title</p>
                            <div className={classes.thumbnailContainer}>
                                <div>
                                    <TextField onChange={(e) => {setTitle(e.target.value)}} id="standard-basic" label="Paper Title" fullWidth />
                                    <p id="titleErr" style={{color: 'red', fontSize: '12px'}} className="hide"></p>
                                </div>
                            </div>
        
                            <Button onClick={addPaper} color="primary" className={classes.button}>
                                {!loading ? (
                                    <div>Upload Research Paper</div>
                                ): (
                                    <div>Loading...</div>
                                )}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </ProfileLayout>
    )
}

export default AddPaper
