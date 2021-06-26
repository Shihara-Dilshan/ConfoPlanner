import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import { Avatar, Button, Checkbox, Container, CssBaseline, FormControlLabel, Grid, Paper, TextField, Typography } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Link } from 'react-router-dom';

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

const Login = () => {

    const classes = useStyles()

    return (
        <Container maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign In
                </Typography>
                <form className={classes.form}>
                    <TextField
                        variant="outlined"
                        type="email"
                        margin="normal"
                        required
                        fullWidth
                        label="Email"
                        id="email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
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
                    />
                    {/* <FormControlLabel control={<Checkbox value="remember" color="primary"/>}
                     label="Remember Me" /> */}
                     <Button 
                        type="submit"
                        fullWidth
                        variant="contained"
                        className={classes.submit}
                     >
                         Sign In
                     </Button>
                     <Grid container>
                        <Grid item xs>
                            <Link className={classes.link} href="#">Forgot Password</Link>
                        </Grid>
                        <Grid item>
                            <Link className={classes.link} to="/register">Don't have account? Sign Up Now</Link>
                        </Grid>
                     </Grid>
                </form>
            </div>
        </Container>
    )
}

export default Login
