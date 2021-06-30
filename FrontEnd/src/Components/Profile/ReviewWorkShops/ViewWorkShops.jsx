import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TableBody, TableHead, TableCell, TableFooter, TableRow, Table, CircularProgress, Button } from '@material-ui/core'
import { API } from '../../../config'
import ReviewLayout from '../ViewResearchPaper/ReviewLayout'
import SingleWorkShop from './SingleWorkShop'

const useStyles = makeStyles((theme) => ({
    root: {

    }
}))

const ViewWorkShops = (props) => {

    const [workshops, setWorkshops] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchWorkShops = () => {
        setLoading(true)
        return new Promise((resolve,reject) => {
            fetch(`${API}/workshop/view/all`)
                .then(res=> {return res.json()})
                .then(res=> {
                    setLoading(false)
                    console.log(res.result)
                    setWorkshops(res.result)
                }).catch(err=> {
                    setLoading(false)
                    console.log(err)
                })
        })
    }

    useEffect(() => {
        fetchWorkShops()
    },[])

    return (
        <ReviewLayout>
             <h2>Review Workshops</h2>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell></TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loading ? (<CircularProgress />)
                     : workshops.map((workshop, index) => (
                        <SingleWorkShop props={props} workshop={workshop} index={index} />
                     ))}
                </TableBody>
            </Table>
        </ReviewLayout>
    )
}

export default ViewWorkShops
