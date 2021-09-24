import React from "react";
import { makeStyles } from '@material-ui/core/styles'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import MovieItem from "./movie-item"

const useStyles = makeStyles(theme => ({
    root: {
        paddingRight: "20px"
    },
    container: {
        paddingTop: '20px',
        width: "100%",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "column",
        [theme.breakpoints.down('sm')]: {
            padding: '0 10px',
        },
    },
    content: {
        maxWidth: '1165px',
        width: '100%',
        [theme.breakpoints.down('md')]: {
            maxWidth: 'none',
        },
    },
    slick: {
        // overflow: 'hidden',
    },
    title: {
        fontFamily: 'Montserrat',
        fontWeight: '400',
        fontSize: '18px',
        color: 'white',
        maxWidth: "835px",
        width: '100%',
        margin: 'auto',
        paddingTop: '20px',
    },
}))

const StyledSlider = styled(Slider)`
    .slick-list {
        height: 100%!important;
    };
    .slick-track {
        height: 100%!important;
        display: flex!important;
        align-items: flex-start!important;
        justify-content: space-between!important;
        padding: 25px 0 0;
    };
    .slick-slider {
        padding: 0!important;
        max-height: 380px!important;
        min-height: 280px!important;
        overflow: hidden!important;
    };
    .slick-slide {
        height: 100%!important;
        max-width: 280px!important;
        min-width: 150px!important;
        margin: 0 8px!important;
    };
    .slick-dots li button {
        color: #fff!important;
    };
    @media screen and (max-width: 340px) {
        .slick-slide {
            max-width: 320px!important;
            min-width: 160px!important;
            margin: 0 10px!important;
        };
    }
    @media screen and (max-width: 1284px) {
        .slick-next {
            right: 15px!important;
            width: 50px!important;
            height: 50px!important;
        };
        .slick-next:before {
            font-size: 40px;
        };
        .slick-prev {
            z-index: 100;
            left: 10px!important;
            width: 50px!important;
            height: 50px!important;
        };
        .slick-prev:before {
            font-size: 40px;
        };
    }
`;

export default function SliderVideos(props) {
    const classes = useStyles()

    var settingsSlider = {
        dots: true,
        autoplay: true,
        infinite: true,
        autoplaySpeed: 3000,
        speed: 200,
        slidesToShow: 6,
        slidesToScroll: 2,
        touchThreshold: 50,
        pauseOnFocus: true,
        lazyLoad: 'progressive',
        swipe: false,
        // cssEase: 'cubic-bezier(0.45, 0, 0.55, 1)',
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 3,
                dots: false
              },
              
            },
            {
                breakpoint: 740,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 2,
                  dots: false
                },
                
            },
            {
                breakpoint: 512,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
                  dots: false
                },
                
            },
            {
                breakpoint: 384,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
                  dots: false
                },
                
              },
            {
                breakpoint: 340,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  dots: false
                },
                
            }
        ],
      };

      const eachData = (params) => {
        console.log(props.data.map(item => console.log('item', item)))
        if (params.type === 'films') {
            return props.data.map(item => (
                <MovieItem onMovieClick={props.onMovieClick} key={item.kinopoisk_id + item.date} data={item} />
            ))
        }
        if (params.type === 'serials') {
            return props.data.map(item => (
                <MovieItem onMovieClick={props.onMovieClick} key={item.kinopoisk_id + item.date} data={item} />
            ))
        }
        
    }

      return (
        <div className={classes.container}>
            <div className={classes.content}>
            <StyledSlider {...settingsSlider} className={classes.slick}>
                {/* <Slider> */}
                    {eachData({type: props.type})}
                {/* </Slider> */}
            </StyledSlider>
             
            </div>
        </div> 
      )

}