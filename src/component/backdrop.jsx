import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Close from '@material-ui/icons/Close'

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: 100,
        color: '#fff',
    },
    button: {
        zIndex: theme.zIndex.drawer + 2,
        position: "fixed",
        top: "15px",
        right: "15px"
    },
    icon: {
        fill: "#fff"
    }
}));


export default function MovieBackdrop(props) {
    const classes = useStyles();

    return (
        <div hidden={!props.opened}>
            <Button className={classes.button} onClick={props.onClose}>
                <Close className={classes.icon} />
            </Button>
            <Backdrop className={classes.backdrop} open={props.opened}>
                {props.children}
            </Backdrop>
        </div>
    );
}
