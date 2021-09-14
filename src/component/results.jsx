import MovieList from "./movie-list";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: "50px"
    },
    container: {
        width: "100%",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: "100px",
    },
    content: {
        maxWidth: '1165px',
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            width: '90%',
        },
    },
    title: {
        fontFamily: 'Montserrat',
        fontWeight: '400',
        fontSize: '18px',
        color: 'white',
        maxWidth: "835px",
        width: '100%',
        margin: 'auto',
    },
}))

export default function ResultSearch(props) {
    const classes = useStyles()

    return (
        <div className={classes.container}>
            <div className={classes.content}>
                <h2 className={classes.title}>Результат поиска "{props.searchQuery}":</h2>
                <MovieList data={props.result} onMovieClick={props.onMovieClick}/>
            </div>
        </div>
    )
}