import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function WorkshopCard(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root} style={{margin: 10}}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {props.workshopData.title}
        </Typography>
        <Typography variant="h6" component="h6">
        Estimated Duration : {props.workshopData.estimatedDuration}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
        status : {props.workshopData.status}
        </Typography>
        <Typography variant="body2" component="p">
          {props.workshopData.description}
          <br />
          
        </Typography>
      </CardContent>
    </Card>
  );
}