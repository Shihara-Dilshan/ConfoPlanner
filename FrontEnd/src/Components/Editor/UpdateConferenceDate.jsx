import React, { useEffect, useState, useRef } from 'react';
import { Grid, TextField, makeStyles, Button, Typography } from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));

export default function UpdateConferenceDate() {

    const classes = useStyles();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const startDateRef = useRef('');
    const endDateRef = useRef('');
    const [formattedStart, setFormattedStart] = useState('');
    const [formattedEnd, setFormattedEnd] = useState('');    

    useEffect(() => {

        function getData() {
            axios.get('http://localhost:5000/api/conferences/60d76048aa132a4cf07b74dd')
            .then(res => {
                let start = new Date(res.data.conference.startDate);
                let end = new Date(res.data.conference.endDate);
                setStartDate(start);
                setEndDate(end);   
                let sDate = formateDate(start);
                let eDate = formateDate(end);            
                setFormattedStart(sDate);
                setFormattedEnd(eDate);
            })
            .catch(err => console.log(err));
        }
        getData();
    }, []);

    function formateDate(date) {
        let newDate = new Date(date);
        let day, month, year = ''
        day = newDate.getUTCDate();
        month = newDate.getUTCMonth()+1;
        year = newDate.getFullYear();
        if(day < 10) day = `0${day}` 
        if(month < 10) month = `0${month}` 
        return `${month}-${day}-${year}`
    }

    function updateDate() {
        let conferenceUpdate = {
            startDate: startDateRef.current.value,
            endDate: endDateRef.current.value
        }

        axios.patch('http://localhost:5000/api/conferences/update-conference-date/60d76048aa132a4cf07b74dd',
        conferenceUpdate)
        .then(res => {
            if(res.status == 200){
                alert('Date updated');
            }
            window.location.reload(false);
        }).catch(err => console.log(err));
    }

    return (
        <div>
            
            <Grid container item xs={12} spacing={2}>
                <Grid item xs={12}>
                <Typography variant="h6">
                    Current Conference Start Date: {formattedStart}
                </Typography>
                <Typography variant="h6">
                    Current Conference End Date: {formattedEnd}
                </Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="date"
                        label="Start Date"
                        type="date"
                        inputRef={startDateRef}
                        defaultValue="2021-07-01"
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="date"
                        label="End Date"
                        type="date"
                        inputRef={endDateRef}
                        defaultValue="2021-07-01"
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Button variant="contained" color="primary"
                        onClick={updateDate}>
                        Update Conference Date
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}