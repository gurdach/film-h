import React, { useEffect, useState } from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { find } from '../api/tmdb'
import { Skeleton } from '@material-ui/lab'

const useStyles = makeStyles(theme => ({
    root: {
        cursor: "pointer"
    },
    img: {
        width: "100%"
    },
    link: {
        textDecoration: "none"
    },
    title: {
        color: '#fff',
        fontFamily: 'Montserrat',
        fontWeight: "400",
        fontSize: "16px",
        lineHeight: '16px',
        paddingTop: '10px',
        paddingBottom: '20px',
    },
}))

export default function MovieItem(props) {

    const [result, setResult] = useState({})
    const [isFetching, setFetchingState] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        find(props.data.imdb_id, {
            language: "ru_RU",
            external_source: "imdb_id"
        }).then(result => {
            setResult(result)
        })
            .then(() => {
                setFetchingState(false)
            })
            .catch(error => {
                setError(error)
            })
    }, [props.data.imdb_id])

    const getPosterImage = () => {

        const BASE_URL = "https://image.tmdb.org/t/p/"
        const FILE_SIZE = "w400"

        if (isFetching) {
            return <Skeleton variant="rect" animation="pulse" width={150} height={250} />
        }

        if (error) {
            return <div>{error.message}</div>
        }

        if (result) {


            const FILE_PATH = () => {
                if (result.movie_results.length) {
                    // console.log(result.movie_results)
                    return BASE_URL + FILE_SIZE + '/' + result.movie_results[0].poster_path
                }
                else if (result.tv_results.length) {
                    return BASE_URL + FILE_SIZE + '/' + result.tv_results[0].poster_path
                }
                else {
                    return 'https://via.placeholder.com/150x220/eee'
                }
            }
            // console.log(FILE_PATH())
            return <><img className={classes.img} src={FILE_PATH()} alt="" /></>
        }

    }

    const handleMovieClick = () => {
        const iframe_src = 'http://192.168.1.2:3005/getFilm' + props.data.iframe_src.slice(26)
        console.log(iframe_src)
        props.onMovieClick(iframe_src)
    }

    const classes = useStyles()

    return (
        <React.Fragment>
            <li className={classes.root} onClick={handleMovieClick}>
                {getPosterImage()}
                <Typography className={classes.title} align="center">{props.data.ru_title || props.data.title}</Typography>
            </li >
        </React.Fragment>
    )
}