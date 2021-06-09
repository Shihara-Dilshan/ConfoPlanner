import { Container, Typography } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    footer: {
        backgroundColor: theme.palette.grey[500],
        padding: theme.spacing(6, 0),
    },
    footerContent: {
        textAlign: 'center'
    }
}))

const Footer = () => {

    const classes = useStyles()

    return (
        <footer className={classes.footer}>
            <Container className={classes.footerContent} maxWidth="lg">
                <Typography variant="h4">
                    ConfoPlanner
                </Typography>
                <Typography>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore incidunt praesentium commodi doloremque aperiam velit similique tempora. Eveniet, dolor fugiat in ipsa hic nostrum dignissimos! Corporis libero voluptas iste eveniet?
                </Typography>
            </Container>
        </footer>
    )
}

export default Footer
