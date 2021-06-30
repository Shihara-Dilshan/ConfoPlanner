import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AddToSchedule from './AddToSchedule';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Container, Grid } from '@material-ui/core';
import ViewSchedule from './ViewSchedule';
import UpdateConferenceDate from './UpdateConferenceDate';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "auto",
    //marginRight: "-82px"
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  }
}));

export default function Editor() {
  const classes = useStyles();

  return (
    <div className={classes.root} >
      <AppBar position="static">
        <Toolbar>
          
          <Typography variant="h6" className={classes.title}>
            Editor Dashboard
          </Typography>
          
        </Toolbar>
      </AppBar>
        <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={5}>
                <Grid item xs={12}>
                    <Card className={classes.root} variant="outlined">
                        <CardContent>
                            <Typography className={classes.title} style={{ fontSize: 20 }}>
                                Schedule To Be Approved
                            </Typography>
                            <ViewSchedule isEditor={true} />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card className={classes.root} variant="outlined">
                        <CardContent>
                            <Typography className={classes.title} style={{ fontSize: 20 }}>
                                Assign Timeslot
                            </Typography>
                            <AddToSchedule />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card className={classes.root} variant="outlined">
                        <CardContent>
                            <Typography className={classes.title} style={{ fontSize: 20 }}>
                                Update Conference Date
                            </Typography>
                            <UpdateConferenceDate />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
            
    </div>
  );
}
