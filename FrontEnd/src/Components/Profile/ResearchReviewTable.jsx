import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const approve = () => {
    alert("Approve")
}

const reject = () => {
    alert("Reject")
}

export default function ResearchReviewTable(props) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Title</StyledTableCell>
            <StyledTableCell align="left">Tumbnail</StyledTableCell>
            <StyledTableCell align="right">Content</StyledTableCell>
            <StyledTableCell align="right">Review</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.title}
              </StyledTableCell>
              <StyledTableCell align="right">
              <Avatar alt="Remy Sharp" src={row.thumbnail} onClick={ () => {window.open(row.thumbnail, '_blank').focus()}}/>
              </StyledTableCell>
              <StyledTableCell align="right">
                <Button variant="outlined" color="primary" onClick={ () => {window.open(row.url, '_blank').focus()}}>
                  View Content
                </Button>
              </StyledTableCell>
              <StyledTableCell align="right">
              <Button variant="outlined" color="primary" style={{marginRight: 4}} onClick={approve}>
                  Approve
                </Button>
                <Button variant="outlined" color="secondary" onClick={reject}>
                  Reject
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
