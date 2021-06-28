import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {TextField, Button} from '@material-ui/core';
import Select from 'react-select';
import { useRef } from 'react';
import ViewSchedule from './ViewSchedule';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 220,
  },
}));

export default function AddToSchedule() {
  const classes = useStyles();

  const [editPaper, setEditPaper] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState('');
  const [selectedWorkshop, setSelectedWorkshop] = useState('');
  const startTimeRef = useRef('');
  const endTimeRef = useRef('');

  const submitData = () => {
    // let paper = {
    //     isApproved: false,
    //     startTime: startTimeRef.current.value,
    //     endTime: endTimeRef.current.value
    // } 
    console.log(selectedPaper);

  }

  const selectResearch = (e) => {
    editPaper ? setSelectedPaper(e.target.value) :
    setSelectedWorkshop(e.target.value);
  }

  const editWorkshop = () => {
      setEditPaper(!editPaper);
  }

  useEffect(() => {
    function getData() {
        
    }
  }, [])

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

  return (
      <>
          <ViewSchedule />
                    
          <form className={classes.container} noValidate>
              <Select 
              options={options}
              placeholder={editPaper ? "Select Paper" : "Select Workshop"} />
              <TextField
                  id="startTime"
                  label="Start Time"
                  type="datetime-local"
                  defaultValue="2021-01-01T10:30"
                  inputRef={startTimeRef}
                  className={classes.textField}
                  InputLabelProps={{
                      shrink: true,
                  }}
              />

              <TextField
                  id="endTime"
                  label="End Time"
                  type="datetime-local"
                  defaultValue="2021-01-01T10:30"
                  inputRef={endTimeRef}
                  className={classes.textField}
                  InputLabelProps={{
                      shrink: true,
                  }}
              />

              <Button variant="contained" color="primary"
                  onClick={submitData}>
                  Assign Time
              </Button>
          </form>
      </>
  );
}
