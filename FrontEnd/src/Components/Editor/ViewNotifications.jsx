import React, { useState, useEffect } from 'react';
import {Grid, Card, CardContent, makeStyles, CircularProgress, FormHelperText} from '@material-ui/core'
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    messageTime: {
        textAlign: 'right'        
    },
    messageBox: {
        backgroundColor: '#f7ebcd',
        paddingRight: '10%'        
    }
}));

export default function ViewEditorNotifications() {

    const [messages, setMessages] = useState([]);
    const [isLoading, setisLoading] = useState(true);

    const classes = useStyles();

    function formatTime(time) {
        let newTime = new Date(time);
        return `${newTime.getHours()}:${newTime.getMinutes()}`;
    }

    useEffect(() => {
        console.log("messages");
        function getMessages(){ 
            axios.get('http://localhost:5000/api/notifications/view-notifications/60d9a9a6528bc923cc12ee3b')
            .then(res => {
                setMessages(res.data.notifications);
            })
            .then(() => { 
                setisLoading(false);
            })
            .catch(err => console.log(err));
        }
        getMessages();
        
    }, []);

    return(
        
        <Grid container item xs={12} spacing={2}>
            {console.log(messages.length)}
            {messages.length > 0 ? (                
                isLoading ? <CircularProgress /> :                
                messages.map(message => (                
                    <Grid item xs={12} key={message._id}>
                        <Card variant="outlined" className={classes.messageBox}>
                            <CardContent>
                                <h4>{message.message}</h4>
                                <h5 className={classes.messageTime}>
                                    {formatTime(message.createdAt)}
                                </h5>
                            </CardContent>
                        </Card>                        
                    </Grid>               
                ))                
            ) : "No messages"}
        </Grid>
    )
} 