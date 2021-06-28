import React from 'react'
import ProfileLayout from './ProfileLayout'
import { makeStyles } from '@material-ui/core/styles'
import { TableBody, TableHead, TableCell, TableFooter, TableRow, Table } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {

    }
}))

const ViewResearchPapers = () => {

    const classes = useStyles()


    return (
        <ProfileLayout>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>id</TableCell>
                        <TableCell>id</TableCell>
                        <TableCell>id</TableCell>
                        <TableCell>id</TableCell>
                    </TableRow>
                </TableHead>
            </Table>
        </ProfileLayout>
    )
}

export default ViewResearchPapers
