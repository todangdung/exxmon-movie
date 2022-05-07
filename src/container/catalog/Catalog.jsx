import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { movieType } from "../../api/movieApi";
import { MovieGrid, Header, Input } from "../../components";

import "./catalog.scss";

const Catalog = () => {
  const params = useParams();

  const [keyword, setKeyword] = useState();

  return (
    <div className="catalog">
      <div className="section movie-grid__header">
        <Header path="catalog" />
      </div>
      <div className="movie-grid__search">
        <Input
          placeholder="Search"
          onChange={(e) => setKeyword(e.target.value)}
          value={keyword}
          width={300}
        />
      </div>
      <MovieGrid
        type={movieType.popular}
        category={params.category}
        path="catalog"
        keyword={keyword}
      />
    </div>
  );
};

export default Catalog;
