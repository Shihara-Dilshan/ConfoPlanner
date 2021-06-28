import React from 'react';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Approved() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Approved Shedules</Title>
      <Typography component="p" variant="h4">
       Test
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        on 15 March, 2019
      </Typography>
      <div>
        <Link color="primary" to="/admin/all-approvings">
          View All
        </Link>
      </div>
    </React.Fragment>
  );
}