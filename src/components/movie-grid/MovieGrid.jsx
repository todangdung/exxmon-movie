import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import movieApi, { category, movieType, tvType } from "../../api/movieApi";
import { Button, Footer, Header, Input, MovieCard } from "../../components";

import "./movie-grid.scss";

const MovieGrid = (props) => {
  const param = useParams();
  const [item, setItem] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [pages, setPages] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    const getMovies = async () => {
      let response = null;
      if (props.keyword) {
        const params = {
          query: props.keyword,
        };
        response = await movieApi.search(param.category, { params });
      } else if (props.discover) {
        const params = {};
        switch (param.category) {
          case category.movie:
            response = await movieApi.discover(param.category, { params });
            break;
          default:
            response = await movieApi.discover(param.category, { params });
            break;
        }
      } else {
        const params = {};
        switch (param.category) {
          case category.movie:
            response = await movieApi.getMovieList(props.type, {
              params,
            });
            break;
          default:
            response = await movieApi.getTvList(props.type, { params });
            break;
        }
      }
      setItem(response.results);
      setTotalPage(response.total_pages);
    };

    getMovies();
  }, [param.category, keyword, props.type, props.keyword]);

  const showMore = async () => {
    let response = null;
    if (keyword) {
      const params = {
        query: keyword,
        page: pages + 1,
      };
      response = await movieApi.search(param.category, { params });
    } else {
      const params = {
        page: pages + 1,
      };
      switch (param.category) {
        case category.movie:
          response = await movieApi.getMovieList(movieType.popular, {
            params,
          });
          break;
        default:
          response = await movieApi.getTvList(tvType.popular, { params });
          break;
      }
      setItem([...item, ...response.results]);
      setPages(pages + 1);
    }
  };

  return (
    <div className="movie-grid">
      <div className="movie-grid__body section">
        <div className="movie-grid__body__list">
          {item.map((item, index) => (
            <MovieCard item={item} key={index} category={param.category} />
          ))}
        </div>
        {pages < totalPage ? (
          <div className="movie-grid__body__btn">
            <Button onClick={showMore}>Show more</Button>
          </div>
        ) : null}
      </div>
      <Footer />
    </div>
  );
};

export default MovieGrid;
