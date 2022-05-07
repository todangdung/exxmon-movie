import React, { useCallback, useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { CardSmall } from "../movie-card/MovieCard";
import movieApi, { category, movieType, tvType } from "../../api/movieApi";
import Button, { TransparentButton } from "../button/Button";

import "./standing-list.scss";

const StandingList = (props) => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const [slice, setSlice] = useState(3);

  useEffect(() => {
    const getMovies = async () => {
      let response = null;

      if (!props.keyword) {
        const params = {};

        switch (props.category) {
          case category.movie:
            response = await movieApi.getMovieList(movieType.popular, {
              params,
            });
            break;
          default:
            response = await movieApi.getTvList(tvType.popular, { params });
        }
      } else {
        const params = {
          query: props.keyword && props.keyword,
        };

        switch (props.category) {
          case category.movie:
            response = await movieApi.search(category.movie, {
              params,
            });
            break;
          default:
            response = await movieApi.search(category.tv, { params });
        }
      }

      setItems(response.results.slice(0, slice));
    };
    getMovies();
  }, [props.category, slice, props.keyword]);

  const seeMore = () => {
    setSlice(10);
  };

  const seeLess = () => {
    setSlice(3);
  };

  /* const getMovies = useCallback(async () => {
    let response = null;
    const params = {
      query: props.keyword && props.keyword,
    };

    switch (props.category) {
      case category.movie:
        response = await movieApi.search(category.movie, {
          params,
        });
        break;
      default:
        response = await movieApi.search(category.tv, { params });
    }

    setItems(response.results.slice(0, slice));

    console.log(response.results);
  }, [props.keyword, props.category, slice]); */

  /* useEffect(() => {
    const enterEvent = (e) => {
      e.preventDefault();
      if (e.keyCode === 13) {
        console.log(123);
      }
    };
    document.addEventListener("keyup", enterEvent);
    return () => {
      document.removeEventListener("keyup", enterEvent);
    };
  }, [props.keyword, getMovies]); */

  return (
    <div className="standing-list">
      {items.map((item, index) => (
        <CardSmall id={item.id} category={props.category} key={index} />
      ))}
      <div className="button">
        {items.length < 4 ? (
          <Button onClick={seeMore}>See more</Button>
        ) : (
          <Button onClick={seeLess}>See less</Button>
        )}
      </div>
    </div>
  );
};

export default StandingList;
