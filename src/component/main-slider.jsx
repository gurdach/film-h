import React from 'react';
import Carousel from 'react-material-ui-carousel'
import Item from './slider/item'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        margin: '0',
        width: '100%',
    },
    indicators: {
        position: 'absolute',
        margin: '0',
        top: '95%',
    }
    
  }));

export default function Slider(props) {
    const classes = useStyles();

    var items = [{
            name: "Джентльмены",
            year: 2019,
            imdb: "7.8",
            img: "./img/image1.jpg",
            url: "/getFilm/movie/34936",
        },
        {
            name: "Интерстеллар",
            imdb: "8.6",
            year: 2014,
            img: "./img/image2.jpg",
            url: "/getFilm/movie/16",
        },
        {
            name: "Гнев человеческий",
            imdb: "7.2",
            year: 2021,
            img: "./img/image4.jpg",
            url: "https://v1631803079.bazon.site/embed/1bec6099d7b9c87c2d3ddd4f1f99d0b3",
        },
    ]

    
    return (
    <Carousel className={classes.root} navButtonsAlwaysInvisible={true}
            indicatorContainerProps={{className: classes.indicators}}
            autoPlay={true} interval={8000}>
            {
                items.map( (item, i) => <Item key={i} item={item} onWatchFilm={props.onWatchClick}/> )
            }
    </Carousel>
    )
}