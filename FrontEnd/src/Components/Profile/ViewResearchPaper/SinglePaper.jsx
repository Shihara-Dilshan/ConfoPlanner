import React from 'react'
import { TableBody, TableHead, TableCell, TableFooter, TableRow, Table, CircularProgress, Button } from '@material-ui/core'

const SinglePaper = ({paper, index, props}) => {

    const reviewItem = () => {
        localStorage.setItem("reviewPaperId", paper._id)
        props.history.push("/reviewpaper")
    }

    return (
        <TableRow key={index}>
            <TableCell>
                <img src={`${paper.thumbnail}`} width="50" height="50" />
            </TableCell>
            <TableCell>
                {paper.title}
            </TableCell>
            <TableCell>
                <Button><a href={`${paper.url}`}>Download</a></Button>
            </TableCell>
            <TableCell>
                {paper.status}
            </TableCell>
            <TableCell>
                <Button color="secondary" onClick={reviewItem}>Review</Button>
            </TableCell>
        </TableRow>
    )
}

export default SinglePaper
