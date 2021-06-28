import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@material-ui/data-grid';
import { Table, TableBody, TableCell, TableRow, TableHead } from '@material-ui/core';

export default class ViewSchedule extends React.Component {
    constructor(props) {
        super(props);
        this.loadData = this.loadData.bind(this);
        this.sortData = this.sortData.bind(this);
        this.state = {
            researchPapers: '',
            workshops: '',
            rows: [],
            schedule: []
        }
    }

    sortData() {
        let sortedSchedule = 
        this.state.researchPapers.researchPapers.concat(this.state.workshops.workshops);

        sortedSchedule.sort((a, b) => {
            let c = new Date(a.startTime);
            let d = new Date(b.startTime);
            return c-d;
        });

        this.setState({ schedule: sortedSchedule });
    }

    loadData() {
        let tempRows = []
        this.state.schedule.map((item, index) => {
            let start = new Date(item.startTime);
            let end = new Date(item.endTime);
            let tempObj = {
                id: index,
                startTime: `${start.getUTCHours()}:${start.getUTCMinutes()}`,
                endTime: `${end.getUTCHours()}:${end.getUTCMinutes()}`,
                title: item.paper ? item.paper.title : item.workshop.title
            }
            tempRows.push(tempObj);
        });
        this.setState({ rows: tempRows });
    }

    componentDidMount() {
        axios
        .get('http://localhost:5000/api/conferences/60d76048aa132a4cf07b74dd')
        .then(res => {
            let conference = res.data.conference;
            this.setState({ researchPapers: conference.sortedPaperSchedule });
            this.setState({ workshops: conference.sortedWorkshopSchedule });          
            this.sortData();
            this.loadData();
        }).catch(err => console.log(err));
    }


    render() {
        return (
            <div>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Start Time</TableCell>
                            <TableCell>End Time</TableCell>
                            <TableCell>Title</TableCell>                            
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.state.rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.startTime}</TableCell>
                            <TableCell>{row.endTime}</TableCell>
                            <TableCell>{row.title}</TableCell>
                        </TableRow>
                    ))}

                    </TableBody>
                </Table>
            </div>
        )
    }
}