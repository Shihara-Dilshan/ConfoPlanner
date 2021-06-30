import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

export default function ConferenceData() {
  const LATEST_CONF_ID = '60c222945db06535f0f8edef';
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [startDate, setStartDate] = useState('Loading...');
  const [endDate, setEndDate] = useState('Loading...')

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect( () => {
    axios
        .get(`https://blooming-garden-43432.herokuapp.com/api/conferences/${LATEST_CONF_ID}`)
        .then(res =>  {
            console.log(res.data.conference);
            setStartDate(res.data.conference.startDate.substring(0,10));
            setEndDate(res.data.conference.endDate.substring(0,10));
        })
        .catch(err => console.log(err))
  }, []);

  return (
    <div className={classes.root} style={{marginBottom: 50}}>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>Venue </Typography>
          <Typography className={classes.secondaryHeading}>SLIIT main hall</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          SLIIT Main Auditorium, SLIIT malabe
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography className={classes.heading}>Start Date</Typography>
          <Typography className={classes.secondaryHeading}>
            {startDate}
          </Typography>
        </AccordionSummary>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography className={classes.heading}>End Date</Typography>
          <Typography className={classes.secondaryHeading}>
            {endDate}
          </Typography>
        </AccordionSummary>
      </Accordion>
     
    </div>
  );
}