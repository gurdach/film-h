import React, { useEffect, useState } from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    root: {
        cursor: "pointer"
    },
    img: {
        width: "100%",
        minWidth: "150px",
        minHeight: "240px"
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
        if (!props.data.info.poster.indexOf('https://st.kp.yandex.net')) {
            getBase64(props.data.info.poster, {type: 'proxy'}).then(result => {
            setResult(result.result);
            }).then(() => {
                setFetchingState(false)
            }).catch(error => error)
        } else {
            setResult(props.data.info.poster)
            setTimeout(() => setFetchingState(false), 1000)
        }

        // find(props.data.imdb_id, {
        //     language: "ru_RU",
        //     external_source: "imdb_id"
        // }).then(result => {
        //     setResult(result)
        // })
        //     .then(() => {
        //         setFetchingState(false)
        //     })
        //     .catch(error => {
        //         setError(error)
        //     })
    }, [props.data.info.poster])

    const getBase64 = async (url, options) => {
        const urlFetch = options.type === 'normal' ? url : 'https://film-h.herokuapp.com/photo?url=' + url;
        return fetch(urlFetch).then(res => res.json())
        .catch(error => error)
    }

    const getPosterImage = () => {

        if (isFetching) {
            return <img className={classes.img} src={'https://via.placeholder.com/160x240/041e30/FFFFFF?text=loading...'} alt="" />
        }

        if (error) {
            return <div>{error.message}</div>
        }

        if (result) {
            const FILE_PATH = () => {
                return result;
            }
            return <><img className={classes.img} data-lazy={'https://via.placeholder.com/150x220/041e30/FFFFFF?text=loading...'} src={FILE_PATH()} alt=""/></>
        }

    }

    const handleMovieClick = () => {
        const iframe_src = 'https://film-h.herokuapp.com/embed/' + props.data.link.slice(37)
        props.onMovieClick(iframe_src)
    }

    const classes = useStyles()

    return (
        <React.Fragment>
            <li className={classes.root} onClick={handleMovieClick}>
                {getPosterImage()}
                <Typography className={classes.title} align="center">{props.data.info.rus}</Typography>
            </li >
        </React.Fragment>
    )
}