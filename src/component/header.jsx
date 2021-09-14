import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import Search from './search'
import '../header.css'

const useStyles = makeStyles((theme) => ({
  root: {
      // width: '100%',
      
  },
  header: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px',
    transition: 'background 0.6s ease-in-out',
    backgroundPosition: '100px',
  },
  menuButton: {
      marginRight: theme.spacing(2),
  },
  title: {
      flexGrow: 1,
      display: "flex",
      alignItems: "center",
  },
  logo: {
      color: "#fff",
      display: "inline-flex",
      alignItems: "center",
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: '900',
      fontSize: '36px',
      lineHeight: '42px',
      textShadow: '0px 0px 6px #112839',
      [theme.breakpoints.down('sm')]: {
        fontSize: '28px',

    },
  },
  button: {
      display: "flex",
      alignItems: "center",
      '&:hover': {
        backgroundColor: 'transparent',
    },
  },
  toolbar: {
      display: "flex",
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      minWidth: '850px',
      [theme.breakpoints.down('sm')]: {
          padding: "10px",
          minWidth: '0px',
          maxWidth: '840px',
          width: '100%',
      },
  },
  shadowHeader: {
    background: '-moz-linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 39%, rgba(255,255,255,0) 100%)',
    background: '-webkit-linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 39%, rgba(255,255,255,0) 100%)',
    background: 'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 39%, rgba(255,255,255,0) 100%)',
    filter: 'progid:DXImageTransform.Microsoft.gradient(startColorstr="#000000",endColorstr="#ffffff",GradientType=1)',
  },
}));

const spanRed = {
    color: '#F32A2A',
  };

function Header(props) {
  const classes = useStyles();

  const [shadowHeader, setShadowHeader] = React.useState(false)

  const listenScrollEvent = e => {
    if (window.scrollY > 50) {
      console.log('scroll 400')
      setShadowHeader(true)
    }
    if (window.scrollY < 50) {
      console.log('scroll down 400')
      setShadowHeader(false)
    }
  }

  React.useEffect(() => {
    window.addEventListener('scroll', listenScrollEvent)
  },[])

  return (
    <div className={classes.root}>
            <AppBar className={`${classes.header} ${shadowHeader ? classes.shadowHeader : ''}`} position="fixed">
                <Toolbar className={classes.toolbar}>
                    <div className={classes.title}>
                        <Button className={classes.button} onClick={props.onLogoClick}>
                            <Typography variant="h1" className={classes.logo}>FILMS <span style={spanRed}>-H</span></Typography>
                        </Button>
                    </div>
                    <Search onSearch={props.onSearch} formClickHandler={props.formClickHandler} formCloseHandler={props.formCloseHandler}/>
                </Toolbar>
            </AppBar>
        </div>
  );
}

export default Header;
