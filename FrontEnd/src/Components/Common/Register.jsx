import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import { Avatar, Button, Checkbox, Container,RadioGroup, CssBaseline, FormControlLabel, Grid, Paper, TextField, Typography } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Link } from 'react-router-dom';
import './style.css'
import Layout from '../Common/Layout'


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: 'black',
      },
      form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
        background: 'black',
        color: 'white',
        '&:hover': {
            color: 'black'
        }
      },
      link: {
          textDecoration: 'none',
          color: 'black',
          '&:hover': {
              textDecoration: 'underline'
          }
      }
}))

const Register = (props) => {
    const radios = document.getElementsByName('role');

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repassword, setRepassword] = useState('')
    const [role, setRole] = useState('');
    const [loading, setLoading] = useState(false)

    const [userdata, setUserdata] = useState({
        name: '',
        email: '',
        password: ''
    })

    
    const handleForm = (e) => {
        e.preventDefault()
        setLoading(true)
        for (var i = 0, length = radios.length; i < length; i++) {
            if (radios[i].checked) {
              setRole(radios[i].value);
              break;
            }
        }
    
        if(validateInputs()) {
            let userData = {
                name: name,
                email: email,
                password: password,
                role: role,
                profilePicture: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
            }
            console.log(userData)
            postData(userData).then(res=> {
                console.log('get', res)
                setLoading(false)
                let success = document.getElementById("success")
                success.classList.remove('hide')
                success.innerHTML = 'sign up successfully!'
                setTimeout(() => {
                    success.classList.add('hide')
                    setName('');
                    setEmail('');
                    setPassword('');
                    setRepassword('');
                    handleNevigate();
                },2000)
               
            }).catch(error=> {
                setLoading(false)
                let err = document.getElementById("commonErr")
                err.classList.remove('hide')
                err.innerHTML = `${error}`
                setTimeout(() => {
                    err.classList.add('hide')
                },2000)
            })
        }else {
            setLoading(false)
        }
    }

    const handleNevigate = () => {
        if(role === "Attendee"){
            props.history.push("/login");
        }else if(role === "Researcher"){
            props.history.push("/addpaper");
        }
    }

    const validateInputs = () => {
      let isNameValid = validateName()
      let isEmailValid = validateEmail()
      let isPasswordValid = validatePassword()
      let isRepasswordValid = validateRePassword()
      return (isNameValid&&isEmailValid&&isPasswordValid&&isRepasswordValid)
    }

    const validateName = () => {
        if(name==='') {
            let err = document.getElementById("nameErr")
            err.classList.remove('hide')
            err.innerHTML = "Please Enter Name" 
            setTimeout(() => {
                err.classList.add('hide')
            },2000)
            return false
       }else {
           return true
       }
    }

    const validateEmail = () => {
        if(email==='') {
            let err = document.getElementById('emailErr')
            err.classList.remove('hide')
             err.innerHTML = "Please Enter Email" 
             setTimeout(() => {
                 err.classList.add('hide')
             },2000)
             return false
        }else if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
             let err = document.getElementById('emailErr')
             err.classList.remove('hide')
             err.innerHTML = "Please Enter Valid Email Address" 
             setTimeout(() => {
                 err.classList.add('hide')
             },2000)
             return false 
        }else {
            return true
        }
    }

    const validatePassword = () => {
        if(password==='') {
            let err = document.getElementById('passwordErr')
            err.classList.remove('hide')
            err.innerHTML = "Please Enter Password" 
            setTimeout(() => {
                err.classList.add('hide')
            },2000) 
            return false
       }else {
           return true
       }
    }

    const validateRePassword = () => {
        if(repassword==='') {
            let err = document.getElementById('repasswordErr')
            err.classList.remove('hide')
            err.innerHTML = "Please Enter Confirm Password" 
            setTimeout(() => {
                err.classList.add('hide')
            },2000) 
            return false
        }else if(password!==repassword) {
            let err = document.getElementById('repasswordErr')
            err.classList.remove('hide')
            err.innerHTML = "Password didn't match" 
            setTimeout(() => {
                err.classList.add('hide')
            },2000) 
            return false
        }else {
            return true
        }
    }

    const postData = (userData) => {
        return new Promise((resolve, reject) => {
            fetch('http://localhost:5000/api/auth/signup', {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(userData)
            }).then((res) => {
                return res.json()
            }).then((res) => {
                console.log('res',res)
                if(res.message!==undefined) {
                    resolve(res.message)
                }else {
                    reject(res.details)
                }
                
            }).catch((err) => {
                console.log(err)
                reject(err)
            })
        })
    }


    const classes = useStyles()

    return (
        <Layout>
        <Container maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <form className={classes.form}>
                    <p id="commonErr" className="hide err"></p>
                    <p id="success" className="hide success"></p>
                    <TextField
                        variant="outlined"
                        type="text"
                        margin="normal"
                        required
                        fullWidth
                        label="Name"
                        id="name"
                        name="name"
                        value={name}
                        autoComplete="name"
                        autoFocus
                        onChange={(e)=> {setName(e.target.value)}}
                    />
                    <p id="nameErr" className="hide err"></p>
                    <TextField
                        variant="outlined"
                        type="text"
                        margin="normal"
                        required
                        fullWidth
                        label="Email"
                        id="email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(e)=> {setEmail(e.target.value)}}
                    />
                    <p id="emailErr" className="hide err"></p>
                    <TextField
                        variant="outlined"
                        type="password"
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        id="password"
                        name="password"
                        autoComplete="password"
                        autoFocus
                        onChange={(e)=> {setPassword(e.target.value)}}
                    />
                    <p id="passwordErr" className="hide err"></p>
                      <TextField
                        variant="outlined"
                        type="password"
                        margin="normal"
                        required
                        fullWidth
                        label="Confirm Password"
                        id="repassword"
                        name="repassword"
                        autoComplete="repassword"
                        autoFocus
                        onChange={(e)=> {setRepassword(e.target.value)}}
                    />
                    <br />
                    <label htmlFor="sss">Choose your role</label><br />
                    <p id="repasswordErr" className="hide err"></p>
                    <input type="radio" id="researcher" name="role" value="Researcher" />
                    <label for="researcher">Researcher</label><br/>
                    <input type="radio" id="wp" name="role" value="Workshop presenter" />
                    <label for="wp">Workshop presenter</label><br/>
                    <input type="radio" id="attendee" checked="checked" name="role" value="Attendee" />
                    <label for="attendee">Attendee</label>
                    {/* <FormControlLabel control={<Checkbox value="remember" color="primary"/>}
                     label="Remember Me" /> */}
                     <Button 
                        type="submit"
                        fullWidth
                        variant="contained"
                        className={classes.submit}
                        onClick={handleForm}
                     >
                         {loading ? (<>Loading...</>): (<>SignUp</>)}
                     </Button>
                     <Grid container>
                        <Grid item>
                            <Link className={classes.link} to="/login">Already have account? Sign In Now</Link>
                        </Grid>
                     </Grid>
                     {JSON.stringify(name)}
                </form>
            </div>
        </Container>
        </Layout>
    )
}

export default Register
