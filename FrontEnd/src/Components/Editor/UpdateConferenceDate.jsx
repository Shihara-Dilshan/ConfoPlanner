import React, { useEffect, useState, useRef } from 'react';
import { Grid, TextField, makeStyles, Button } from '@material-ui/core';
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
    const [formattedStart, setFormattedStart] = useState('');
    const [formattedEnd, setFormattedEnd] = useState('2021-10-10');
    const startDateRef = useRef('');
    const endDateRef = useRef('');

    useEffect(() => {

        function getData() {
            axios.get('http://localhost:5000/api/conferences/60d76048aa132a4cf07b74dd')
            .then(res => {
                let start = new Date(res.data.conference.startDate);
                let end = new Date(res.data.conference.endDate);
                setStartDate(start);
                setEndDate(end);
                let sDate = formatDate(start);
                let eDate = formatDate(end);
                setFormattedStart(sDate);
                setFormattedEnd(eDate);
            })
            .catch(err => console.log(err));
        }
        getData();
    }, []);

    function formatDate(date) {
        let newDate = new Date(date);
        let month, day = ''
        if(newDate.getMonth() < 10) {
            month = `0${(newDate.getMonth() + 1)}`;
        }
        if(newDate.getUTCDate() < 10) {
            day = `0${newDate.getUTCDate()}`
        }
        newDate = `${newDate.getUTCFullYear()}-${month}-${day}`;
        return newDate;
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

    function handleChange(e){
        setStartDate(e.target.value);
    }

    return (
        <div>
            {console.log(formattedStart)}
            <Grid container item xs={12} spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        id="date"
                        label="Start Date"
                        type="date"
                        inputRef={startDateRef}
                        defaultValue={formattedStart}
                        className={classes.textField}
                        onChange={e => handleChange(e)}
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
                        defaultValue={formattedEnd}
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