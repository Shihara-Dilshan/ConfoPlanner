
import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { green, purple } from '@material-ui/core/colors';
import Title from './Title';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(0, '16 Mar, 2019 - 08.00AM', 'Elvis Presley', 'pending', 'completed', 312.44),
  createData(1, '16 Mar, 2019 - 10.00AM', 'Paul McCartney', 'pending', 'completed', 866.99),
  createData(2, '16 Mar, 2019 - 01.00PM', 'Tom Scholz', 'pending', 'completed', 100.81),
  createData(3, '16 Mar, 2019 - 03.00AM', 'Michael Jackson', 'pending', 'completed', 654.39),
  createData(4, '15 Mar, 2019 - 05.00AM', 'Bruce Springsteen', 'pending', 'completed', 212.79),
];

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

export default function CompAllApprovedList() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>All Approved Shedules</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Payment</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right"><Button className={classes.rejectBtn} variant="contained" size = "small" color="secondary">Reject</Button></TableCell>
              <TableCell align="right"><Button className={classes.viewBtn} variant="contained" size = "small"color="primary">View</Button></TableCell>
              <TableCell align="right"><Button className={classes.approveBtn} variant="contained" size = "small" >Approve</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}