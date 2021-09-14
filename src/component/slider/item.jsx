import { Paper, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        
    },
    item: {
        height: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        backgroundSize: 'cover',
        backgroundPosition: 'center 33%',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#010A10',
        [theme.breakpoints.down('sm')]: {
            height: '75vh',
        },
    },
    infoList: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: '200px',
        minWidth: '100px',
        paddingTop: '15px',
        textShadow: '0 0 10px black;'
    },
    filmName: {
        fontFamily: 'Montserrat',
        fontWeight: '800',
        fontSize: '64px',
        margin: 0,
        [theme.breakpoints.down('sm')]: {
            fontSize: '30px',
        },
    },
    filmInfo : {
        fontFamily: 'Montserrat',
        fontWeight: '400',
        fontSize: '21px',
        margin: 0,
        [theme.breakpoints.down('sm')]: {
            fontSize: '18px',
        },
    },
    sliderContent: {
        maxWidth: '850px',
        minWidth: '500px',
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            maxWidth: '850px',
            minWidth: '200px',
            width: '90%',
        },
    },
    sliderButton: {
        fontFamily: 'Montserrat',
        fontWeight: '600',
        color: 'white',
        width: '140px',
        height: '43px',
        backgroundColor: '#FF0000',
        borderRadius: '0',
        marginTop: '50px',
        fontSize: '18px',
        '&:hover': {
            backgroundColor: '#7E0000',
        },
        [theme.breakpoints.down('sm')]: {
            width: '120px',
            height: '40px',
            fontSize: '16px',
        },
    }
    
    
  }));

export default function Item(props) {
    const classes = useStyles(); 

    return (
        <Paper elevation={0} className={classes.item} style={{backgroundImage: `url('${props.item.img}')`}}>
            <div className={classes.sliderContent}>
                <h2 className={classes.filmName}>{props.item.name}</h2>
                <div className={classes.infoList}>
                    <p className={classes.filmInfo}><span style={{fontSize: '16px'}}>IMDb </span>{props.item.imdb}</p>
                    <p className={classes.filmInfo}><span style={{fontSize: '16px'}}>год: </span>{props.item.year}</p>
                </div>

                <Button className={classes.sliderButton}>
                    Смотреть
                </Button>
            </div>
        </Paper>
    )
}