import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {TextField, Button, Paper, Grid} from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';
import Select from 'react-select';
import { useRef } from 'react';
import axios from 'axios';

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
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }
}));

export default function AddToSchedule() {
  const classes = useStyles();

  const [editPaper, setEditPaper] = useState(true);
  const [selectedPaper, setSelectedPaper] = useState('');
  const [selectedWorkshop, setSelectedWorkshop] = useState('');
  const [workshops, setWorkshops] = useState([]);
  const [researchPapers, setResearchPapers] = useState([]);
  const [workshopList, setWorkshopList] = useState([]);
  const [paperList, setPaperList] = useState([]);
  const startTimeRef = useRef('');
  const endTimeRef = useRef('');


  const sendToDB = data => {
    axios
    .patch('http://localhost:5000/api/conferences/update-conference/60d76048aa132a4cf07b74dd', data)
    .then(res => {
      if(res.status == 200) {
        alert('Updated');
      }
    })
    .catch(err => console.log(err));    
    
  }

  const submitData = () => {
    let start = new Date(startTimeRef.current.value).toUTCString();
    let end = new Date(endTimeRef.current.value).toUTCString();
    if(editPaper) {
      let paperToApprove = {
        isApproved: false,
        startTime: start,
        endTime: end,
        paper: selectedPaper
      }
      sendToDB(paperToApprove);
      // console.log(paperToApprove);
    } else {
      let workshopToApprove = {
        isApproved: false,
        startTime: start,
        endTime: end,
        workshop: selectedWorkshop
      }
      sendToDB(workshopToApprove)
      // console.log(workshopToApprove);
    } 
    window.location.reload(false);
  }

  const editWorkshop = () => {
      setEditPaper(!editPaper);
  }

  function onItemSelect(e) {
    editPaper ? setSelectedPaper(e ? e.value : '') :
    setSelectedWorkshop(e ? e.value : '');
  }

  useEffect(() => {

    function getData() {
        axios.get('http://localhost:5000/api/paper/get-approved')
        .then(res => {
            setResearchPapers(res.data.papers);

            let data = [];
            res.data.papers.map(paper => {
                let temp = {
                    value: paper._id,
                    label: paper.title
                }
                data.push(temp);
            });
            setPaperList(data);
        })
        .catch(err => console.log(err));

        axios.get('http://localhost:5000/api/workshop/view/approved')
        .then(res => {
            setWorkshops(res.data.workshops);

            let data = [];
            res.data.workshops.map(workshop => {
                let temp = {
                    value: workshop._id,
                    label: workshop.title
                }
                data.push(temp);
            });
            setWorkshopList(data);
        })
        .catch(err => console.log(err));
    }
    getData();
    
  }, [])

  return (
    
      <Grid container spacing={3}>
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={6}>
            <ToggleButton
              value={editPaper}
              selected={editPaper}
              onChange={editWorkshop}>
              Research Papers
            </ToggleButton>
            <ToggleButton
              value={editPaper}
              selected={!editPaper}
              onChange={editWorkshop}>
              Workshops
            </ToggleButton>
          </Grid>
        </Grid>
      <Grid container item xs={12} spacing={2}>
        <Grid item xs={6}>
          <Select
            options={editPaper ? paperList : workshopList }
            onChange={onItemSelect}
            placeholder={editPaper ? "Select Paper" : "Select Workshop"} >
          </Select>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="startTime"
            label="Start Time"
            type="datetime-local"
            defaultValue="2021-07-01T10:30"
            inputRef={startTimeRef}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="endTime"
            label="End Time"
            type="datetime-local"
            defaultValue="2021-07-01T10:30"
            inputRef={endTimeRef}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
        <Button variant="contained" color="primary"
          onClick={submitData}>
          Assign Time
        </Button>
        </Grid>
      </Grid>  
      </Grid>
    

  );
}
