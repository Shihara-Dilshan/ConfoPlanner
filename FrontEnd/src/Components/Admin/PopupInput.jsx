import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    popupBox: {
        position: 'fixed',
        background: '#00000050',
        width: '110%',
        height: '100vh',
        top: '100px',
        left: '0',
    },
  
    box:{
        position: 'relative',
        width: '20%',
        margin: '0 auto',
        height: 'auto',
        maxheight: '70vh',
        marginTop: 'calc(100vh - 85vh - 20px)',
        background: '#fff',
        borderRadius: '4px',
        padding: '20px',
        border: '1px solid #999',
        overflow: 'auto'
    },
    closeIcon:{
        content: 'x',
        cursor: "pointer",
        position: 'fixed',
        right: 'calc(33% - 30px)',
        top: 'calc(100vh - 85vh + 55px)',
        background: '#ededed',
        width: '25px',
        height: '25px',
        borderRadius: '50%',
        lineHeight: '20px',
        textAlign: 'center',
        border: '1px solid #999',
        fontSize: '20px'
    }
  }));
 
const PopupInput = props => {
    const classes = useStyles();
  return (
    <div className={classes.popupBox}>
      <div className={classes.box}>
        <span className={classes.closeIcon} onClick={props.handleClose}>x</span>
        {props.content}
      </div>
    </div>
  );
};
 
export default PopupInput;