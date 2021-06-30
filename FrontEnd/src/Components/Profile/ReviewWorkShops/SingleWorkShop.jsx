import React from 'react'
import { TableBody, TableHead, TableCell, TableFooter, TableRow, Table, CircularProgress, Button } from '@material-ui/core'

const SingleWorkShop = ({workshop, index, props}) => {

    const reviewItem = () => {
        localStorage.setItem("workshopId", workshop._id)
        props.history.push("/reviewworkshop")
    }

    return (
        <TableRow key={index}>
            <TableCell>
                {workshop.title}
            </TableCell>
            <TableCell>
                {workshop.description}
            </TableCell>
            <TableCell>
                <Button><a href={`${workshop.presentationFileURL}`}>Download</a></Button>
            </TableCell>
            <TableCell>
                {workshop.status}
            </TableCell>
            <TableCell>
                <Button color="secondary" onClick={reviewItem}>Review</Button>
            </TableCell>
        </TableRow>
    )
}

export default SingleWorkShop
