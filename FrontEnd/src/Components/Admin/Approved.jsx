import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import Title from "./Title";
import Popup from "./PopupInput";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },

  rejectBtn: {
    fontSize: "10px",
  },
  rejectBtn2: {
    fontSize: "10px",
    top: "20px",
    left: "190px",
  },
  viewBtn: {
    fontSize: "10px",
  },
  approveBtn: {
    background: "#228B22",
    "&:hover": {
      background: "#006400",
    },
    color: "white",
    fontSize: "10px",
  },
  tableCell: {
    fontSize: "11px",
  },
}));

export default function CompShedule() {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [response, setResponse] = useState({});

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/conferences/60d76048aa132a4cf07b74dd")
      .then((res) => {
        setResponse(res.data);
      })

      .catch((err) => console.log(err));
  }, []);

  function rejectSchedule(Shedule) {
    console.log(Shedule);
    if (confirm("Are you sure?")) {
      axios
        .patch(
          "http://localhost:5000/api/conferences/reject-schedule/60d76048aa132a4cf07b74dd",
          Shedule
        )
        .then((res) => {
          if (res.status == 200) {
            alert("updated");
          } else {
            alert("Error Updating!");
          }
        })
        .then(() => {
          window.location.reload(false);
        });
    }
  }

  return (
    <React.Fragment>
      <Table>
        <TableBody>
          <TableCell>
            <Title>Approved Shedules</Title>
          </TableCell>
          <TableCell>
            <div className={classes.seeMore}>
              <Link to="/admin/all-approvings" color="primary">
                See All Approvings
              </Link>
            </div>
          </TableCell>
        </TableBody>
      </Table>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Start Time</TableCell>
            <TableCell>End Time</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        {response.conference === undefined ? null : (
          <TableBody>
            {[
              ...response.conference.sortedWorkshopSchedule.workshops.filter(
                (data) => data.isApproved == true
              ),
              ...response.conference.sortedPaperSchedule.researchPapers.filter(
                (data) => data.isApproved == true
              ),
            ].map((row) => (
              <TableRow>
                <TableCell className={classes.tableCell}>
                  {row.startTime}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {row.endTime}
                </TableCell>
                {row.paper ? (
                  <TableCell className={classes.tableCell}>
                    {row.paper !== undefined
                      ? row.paper.title
                      : row.workshop.title}
                    - Paper
                  </TableCell>
                ) : (
                  <TableCell className={classes.tableCell}>
                    {row.paper !== undefined
                      ? row.paper.title
                      : row.workshop.title}
                    - Workshop
                  </TableCell>
                )}

                {row.isApproved === false ? (
                  <TableCell className={classes.tableCell}>
                    Not Approved
                  </TableCell>
                ) : (
                  <TableCell className={classes.tableCell}>Approved</TableCell>
                )}
                <TableCell align="right">
                  <Button
                    className={classes.rejectBtn}
                    onClick={(e) => rejectSchedule(row)}
                    variant="contained"
                    size="small"
                    color="secondary"
                  >
                    Reject
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <Button
                    className={classes.viewBtn}
                    variant="contained"
                    size="small"
                    color="primary"
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </React.Fragment>
  );
}
