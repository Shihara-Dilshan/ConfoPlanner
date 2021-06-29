import { Grid, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import background from '../img/background.jpg'

const useStyles = makeStyles((theme) => ({
    mainFeature: {
        position: 'relative',
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        marginBottom: theme.spacing(4),
        backgroundImage: `url('https://image.freepik.com/free-photo/rear-view-audience-listening-speakers-stage-conference-hall-seminar-meeting_41418-3371.jpg')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
       
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,.3)',
    },
    mainFeaturedPostContent: {
        position: 'relative',
        padding: theme.spacing(3),
        [theme.breakpoints.up('md')]: {
          padding: theme.spacing(6),
          paddingRight: 0,
        },
      },
}))

const Carousel = (props) => {

    const classes = useStyles()

    const {img} = props

    return (
        <Paper className={classes.mainFeature}>
                <div className={classes.overlay}></div>
                <Grid container>
                    <Grid item md={6}>
                        <div className={classes.mainFeaturedPostContent}>
                            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                                ICAF
                            </Typography>
                            <Typography variant="h5" color="inherit" paragraph>
                            ICAF is the powerful conference management software that supports you in the planning and implementation of your event with perfectly coordinated functions. Our software is particularly tried and tested in the organization of scientific conferences, but it also shows its strengths to the full at congresses and meetings from other areas. Always clear, user-friendly and completely web-based.
                            </Typography>
                        </div>
                    </Grid>
                </Grid>
            
        </Paper>
    )
}

export default Carousel
