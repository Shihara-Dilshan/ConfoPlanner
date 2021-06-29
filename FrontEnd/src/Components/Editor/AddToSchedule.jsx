import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {TextField, Button} from '@material-ui/core';
import Select from 'react-select';
import { useRef } from 'react';
import ViewSchedule from './ViewSchedule';
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
}));

export default function AddToSchedule() {
  const classes = useStyles();

  const [editPaper, setEditPaper] = useState(false);
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
    
    if(editPaper) {
      let paperToApprove = {
        isApproved: false,
        startTime: startTimeRef.current.value,
        endTime: endTimeRef.current.value,
        paper: selectedPaper
      }
      sendToDB(paperToApprove);
      console.log(paperToApprove);
    } else {
      let workshopToApprove = {
        isApproved: false,
        startTime: startTimeRef.current.value,
        endTime: endTimeRef.current.value,
        workshop: selectedWorkshop
      }
      sendToDB(workshopToApprove)
      console.log(workshopToApprove);
    } 
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
        axios.get('http://localhost:5000/api/paper/get/approved')
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
      <>
          <ViewSchedule />
                    
          <form className={classes.container} noValidate>
              <Select 
              options={workshopList}
              onChange={onItemSelect}
              placeholder={editPaper ? "Select Paper" : "Select Workshop"} />
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

              <Button variant="contained" color="primary"
                  onClick={submitData}>
                  Assign Time
              </Button>
          </form>
      </>
  );
}
