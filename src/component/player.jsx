import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        width: "calc(100% - 50px)",
        height: "calc(100% - 120px)",
        [theme.breakpoints.down('sm')]: {
            height: "50%",
            width: "calc(100% - 10px)"
        }
    }
}))

export default function Player(props) {
    const classes = useStyles()
    return (
        <iframe id="playerjs" className={classes.root} title="qq" src={props.iframeSrc} allowFullScreen="true " frameBorder="0"></iframe>
    )
}