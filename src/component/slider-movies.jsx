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
        align-items: center!important;
        justify-content: space-between!important;
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
    @media screen and (max-width: 300px) {
        .slick-slide {
            max-width: 290px!important;
            min-width: 160px!important;
            margin: 0 10px!important;
        };
    }
`;

export default function SliderMovies(props) {
    const classes = useStyles()

    var settingsSlider = {
        dots: true,
        autoplay: true,
        infinite: true,
        autoplaySpeed: 3000,
        speed: 200,
        slidesToShow: 6,
        slidesToScroll: 2,
        swipe: true,
        swipeToSlide: false,
        touchThreshold: 20,
        pauseOnFocus: true,
        // cssEase: 'cubic-bezier(0.45, 0, 0.55, 1)',
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 3,
                dots: false
              }
            },
            {
                breakpoint: 740,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 2,
                  dots: false
                }
            },
            {
                breakpoint: 512,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
                  dots: false
                }
            },
            {
                breakpoint: 384,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
                  dots: false
                }
              },
            {
                breakpoint: 300,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  dots: false
                }
            }
        ],
      };

      const eachData = () => {
        return props.data.map((item) => (
            <MovieItem onMovieClick={props.onMovieClick} key={item.id} data={item} />
        ))
    }

      return (
        <div className={classes.container}>
            <h1 className={classes.title}>Фильмы:</h1>
            <div className={classes.content}>
            <StyledSlider {...settingsSlider} className={classes.slick}>
                {/* <Slider> */}
                    {eachData()}
                {/* </Slider> */}
            </StyledSlider>   
            </div>
        </div> 
      )

}