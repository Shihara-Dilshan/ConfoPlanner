import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TableBody, TableHead, TableCell, TableFooter, TableRow, Table, CircularProgress, Button } from '@material-ui/core'
import { API } from '../../../config'
import SinglePaper from './SinglePaper'
import ReviewLayout from './ReviewLayout'

const useStyles = makeStyles((theme) => ({
    root: {

    }
}))

const ViewResearchPapers = (props) => {

    const classes = useStyles()

    const [papers, setPapers] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchPapers = () => {
        setLoading(true)
        return new Promise((resolve,reject) => {
            fetch(`${API}/paper/getall`)
                .then(res=> {return res.json()})
                .then(res=> {
                    setLoading(false)
                    console.log(res.result)
                    setPapers(res.result)
                }).catch(err=> {
                    setLoading(false)
                    console.log(err)
                })
        })
    }


    useEffect(() => {
        fetchPapers()
    },[])

    return (
        <ReviewLayout>
            <h2>Review Research Papers</h2>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Research Paper</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loading ? (<CircularProgress />)
                     : papers.map((paper, index) => (
                        <SinglePaper props={props} paper={paper} index={index} />
                     ))}
                </TableBody>
            </Table>
        </ReviewLayout>
    )
}

export default ViewResearchPapers
