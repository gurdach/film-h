import Header from './component/header'
import { search, film } from './api/newapi'
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Slider from './component/main-slider'
import SliderVideos from './component/slider-videos'
import ResultSearch from './component/results'
import MovieBackdrop from './component/backdrop'
import Player from './component/player'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    paddingBottom: '100px',
    backgroundColor: '#010A10',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'hidden',
  }
}))

function App() {
  const classes = useStyles()

  const [result, setResult] = useState({})
  const [isSearch, setSearchState] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [queryType, setQueryType] = useState('all')
  const [isFetching, setFetchingState] = useState(true)
  const [error, setError] = useState(null)
  const [backdropIsOpened, setBackdropState] = useState(false)
  const [iframeSrc, setIframeSrc] = useState('')
  const [searchActive, setSearchActive] = useState(false)

  const getMovies = () => {

    if (isSearch) {
      film({ title: searchQuery}).then(result => {
        setFetchingState(false)
        console.log(result.results)
        setResult(result)
        setSearchState(true)
      })
    } else {
      if (currentPage === 0) {
        setCurrentPage(1)
      }
      search({ page: currentPage, type: queryType }).then(result => {
        setFetchingState(false)
        console.log(result)
        setResult(result)
      }).catch(error => {
        setError(error)
      })
    }
  }

  useEffect(() => {
    setSearchState(false)
    getMovies()
  }, [currentPage])

  const logoClickHandler = () => {
    setSearchState(false)
    setCurrentPage(0)
  }

  const searchHandler = (query) => {
    setSearchState(true)
    setSearchQuery(query)
    film({ title: query }).then(result => {
      setFetchingState(false)
      setResult(result)
    })
  }

  const handleMovieClick = (playerSrc) => {
    setBackdropState(true)
    setIframeSrc(playerSrc)
  }

  const handleCloseBackdrop = () => {
    setBackdropState(false)
    setIframeSrc('')
  }

  const formClickHandler = () => {
    setBackdropState(true)
    setSearchActive(true)
  }

  const formCloseHandler = () => {
    setSearchActive(false)
    iframeSrc ? setBackdropState(true) : setBackdropState(false)
  }

  const fetchData = () => {
    if (isFetching) {
      return <></>
    }

    if (error) {
      return <div>{error.message}</div>
    }

    if (result.results) {
      if (isSearch) {
        return <>
        <ResultSearch result={result.results} onMovieClick={handleMovieClick} searchQuery={searchQuery}/>
      </>
      }

      if (!isFetching) {
        return <>
        <SliderVideos type={'films'} data={result.results} onMovieClick={handleMovieClick}/>
        
      </>
      }

    } else {
      return <div className="not-found">Ничего не найдено</div>
    }
  }

  return (
    <div className={classes.root}>
      {!iframeSrc
        ? <Header onLogoClick={logoClickHandler} onSearch={searchHandler} formClickHandler={formClickHandler} formCloseHandler={formCloseHandler}/>
        : ''
      }
      {searchActive 
        ? <MovieBackdrop opened={backdropIsOpened} onClose={handleCloseBackdrop} />
        : ''
      }

      {!isSearch 
        ? <Slider onWatchClick={handleMovieClick}/>
        : ''
      }

      {fetchData()}
      
      <MovieBackdrop opened={backdropIsOpened} onClose={handleCloseBackdrop}>
        {!searchActive
          ? <Player iframeSrc={iframeSrc} />
          : ''
        }
      </MovieBackdrop>
    </div>
    
  );
}

export default App;
