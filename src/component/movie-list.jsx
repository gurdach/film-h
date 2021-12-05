import React from 'react'
import MovieItem from './movie-item'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    root: {
        padding: "20px"
    },
    list: {
        margin: 0,
        padding: 0,
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr);",
        gridGap: "20px",
        listStyle: "none",
        marginBottom: "20px",
        [theme.breakpoints.down('md')]: {
            gridTemplateColumns: "repeat(5,1fr)"
        },
        [theme.breakpoints.down('sm')]: {
            gridTemplateColumns: "repeat(3,1fr)"
        },
        [theme.breakpoints.down('xs')]: {
            gridTemplateColumns: "repeat(1,1fr)"
        }
    }
}))



export default function MovieList(props) {

    const classes = useStyles()

    const eachData = () => {
        return props.data.map((item) => (
            <MovieItem onMovieClick={props.onMovieClick} key={item.kinopoisk_id + item.date} data={item} />
        ))
    }

    return (
        <div className={classes.root}>
            <ul className={classes.list}>
                {eachData()}
            </ul>
        </div>
    )
}