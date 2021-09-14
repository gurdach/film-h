import React, { useState } from 'react'
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import { alpha , makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    search: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        borderRadius: theme.shape.borderRadius = 25,
        backgroundColor: alpha('#1b385e', 0.8),
        '&:hover': {
            backgroundColor: alpha('#1b385e', 1),
        },
        marginLeft: 0,
        width: '42px',
        height: '42px',
        [theme.breakpoints.down('sm')]: {
            width: "42px"
        },
        transition: theme.transitions.create('all', {duration: '0.8s'}),
        zIndex: '2000',
    },
    searchActive: {
        width: "35%",
        justifyContent: 'flex-start',
        cursor: 'default',
        [theme.breakpoints.down('sm')]: {
            flexGrow: '6',
        },
    },
    searchIcon: {
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        top: '50%',
        left: '50%',
        transform: 'translateX(-50%) translateY(-50%)',
        transition: theme.transitions.create('all', {duration: '600ms'}),
    },
    searchIconActive: {
        paddingLeft: '15px',
        top: '0%',
        left: '0%',
        transform: 'translateX(0%) translateY(0%)'
    },
    inputRoot: {
        color: 'inherit',
        width: "100%",
    },
    inputInput: {
        padding: theme.spacing(1, 2, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        opacity: 0,
        cursor: 'pointer',
    },
    inputInputActive: {
        display: 'block',
        cursor: 'text',
        opacity: 1,
    }
}));


export default function Search(props) {

    const [searchQuery, setSearchQuery] = useState('')
    const [searchActive, setSearchActive] = useState(false)

    const classes = useStyles()

    const searchHandler = (e) => {
        e.preventDefault()
        props.onSearch(searchQuery)
        setSearchQuery('')
        handleClickAway()
        formBlur(e)
    }

    const formClickHandler = () => {
        setSearchActive(true)
        props.formClickHandler()
    }

    const handleClickAway = (e) => {
        setSearchActive(false)
        props.formCloseHandler()
    }

    const formBlur = (e) => {
        console.dir(e.target[0].blur())
    }

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <form className={(searchActive ? `${classes.search + ' ' + classes.searchActive}` : classes.search)} onSubmit={searchHandler} onClick={() => formClickHandler()}>
                <div className={(searchActive ? `${classes.searchIcon + ' ' + classes.searchIconActive}` : classes.searchIcon)}>
                    <SearchIcon />
                </div>
                <InputBase
                    placeholder="Поиск"
                    classes={{
                        root: classes.inputRoot,
                        input: (searchActive ? `${classes.inputInput + ' ' + classes.inputInputActive}` : classes.inputInput),
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    value={searchQuery}
                    onChange={e => { setSearchQuery(e.target.value) }}
                    onFocus={formClickHandler}
                    onBlur={handleClickAway}
                />
            </form>
        </ClickAwayListener>
        
    )
}