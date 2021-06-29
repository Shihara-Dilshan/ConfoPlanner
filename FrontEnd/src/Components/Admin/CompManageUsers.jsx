
import React, {useContext, useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import axios from 'axios'

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },

  rejectBtn:{
    fontSize: '10px'
  },
  viewBtn:{
    fontSize: '10px'
  },
  approveBtn:{
    background: "#228B22",
    '&:hover': {
      background: "#006400",
    },
    color: 'white',
    fontSize: '10px'
  }
  
}));

export default function CompManageUsers() {
  const classes = useStyles();
  const [rows, setRows] = useState([]);

  function setUserRows(array) {
    let tempRows = [];
    array.map(user => {
      let row = {
        id: user._id,
        name: user.name,
        role: user.role,
        email: user.email
      }
      tempRows.push(row);
    });
    setRows(tempRows);
  }

  useEffect(() => {
    function getAllUsers() {
      axios.get('http://localhost:5000/api/user/getall')
      .then(res => {
        console.log(res.data.result);
        let attendees = res.data.result.filter(
          user => user.role == 'Attendee'
        );
        setUserRows(attendees);
      })
      .catch(err => console.log(err));
    }
  
    getAllUsers();
    console.log(`Rwos: ${rows}`)
  }, []);

  return (
    <React.Fragment>
      <Title>Manage User Roles</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Email</TableCell>
            <TableCell align="right"><TableCell>Change Role</TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.role}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"><Button className={classes.approveBtn} variant="contained" size = "small" >Approve</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}