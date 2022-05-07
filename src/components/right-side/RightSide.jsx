import React, { useState, useEffect, useCallback } from "react";
import "./right-side.scss";
import { CardSmall } from "../movie-card/MovieCard";

import { category, movieType, tvType } from "../../api/movieApi";

import { Input, StandingList } from "../index";
import { useParams, useNavigate } from "react-router-dom";

import movieApi from "../../api/movieApi";

const RightSide = () => {
  const [keyword, setKeyword] = useState("");
  const cate = useParams();
  const [items, setItems] = useState();

  const navigate = useNavigate();

  return (
    <div className="right-side">
      <div className="right-header">
        <Input
          placeholder="Search"
          onChange={(e) => setKeyword(e.target.value)}
          value={keyword}
        />
      </div>
      <div className="right-body">
        <div className="section-header">
          <h3 className="title">{keyword ? "Movie" : "Now playing movie"}</h3>
        </div>
        <StandingList
          category={category.movie}
          type={movieType.now_playing}
          keyword={keyword}
        />
        <div className="section-header">
          <h3 className="title">{keyword ? "TV" : "Popular TV"}</h3>
        </div>
        <StandingList
          category={category.tv}
          type={tvType.popular}
          keyword={keyword}
        />
      </div>
    </div>
  );
};

export default RightSide;
