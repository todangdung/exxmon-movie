import React, { useEffect, useState } from "react";

import movieApi, { category } from "../../api/movieApi";

import "./movie-list.scss";
import Slider from "react-slick";
import MovieCard from "../movie-card/MovieCard";
import { PrevArrow, NextArrow } from "../index";
const MovieList = (props) => {
  const [items, setItems] = useState([]);
  const [ids, setIds] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      let response = null;
      const params = {};
      if (props.type !== "recommendations") {
        switch (props.category) {
          case category.movie:
            response = await movieApi.getMovieList(props.type, { params });
            break;
          default:
            response = await movieApi.getTvList(props.type, { params });
        }
      } else {
        response = await movieApi.recommendations(props.category, props.id);
      }

      setItems(response.results);
    };

    getMovies();
  }, [props.category, props.type, props.id]);

  useEffect(() => {
    if (props.ids) {
      let results = [];

      const params = {};
      props.ids.forEach(async (e) => {
        const response = await movieApi.detail(props.category, e, { params });
        results.push(response);
        if (results.length > 0)
          setIds(results /* .slice(0, results.length / 2) */);
      });
    }
  }, [props.category, props.ids]);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: props.slidesToShow ? props.slidesToShow : 4,
    slidesToScroll: 4,
    nextArrow: <NextArrow class="next-custom" />,
    prevArrow: <PrevArrow class="prev-custom" />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: props.slidesToShow ? props.slidesToShow - 2 : 3,
          slidesToScroll: 3,
          initialSlide: 3,
          infinite: true,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {props.ids
        ? ids.map((item, index) => (
            <MovieCard
              item={item}
              key={index}
              category={props.category}
              id={props.id}
            />
          ))
        : items.map((item, index) => (
            <MovieCard
              item={item}
              key={index}
              category={props.category}
              id={props.id}
            />
          ))}
    </Slider>
  );
};

export default MovieList;
