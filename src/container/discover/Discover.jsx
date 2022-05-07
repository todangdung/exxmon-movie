import React from "react";
import { useParams } from "react-router-dom";
import { category, movieType } from "../../api/movieApi";
import { CatalogSlide, MovieGrid, Header } from "../../components";

import "./discover.scss";

const Discover = () => {
  const params = useParams();

  return (
    <div className="discover ">
      <div className="section movie-grid__header">
        <Header path="discover" />
      </div>
      <div className="section">
        <CatalogSlide discover="discover" />
      </div>
      <MovieGrid
        category={params.category}
        discover="discover"
        path="discover"
      />
    </div>
  );
};

export default Discover;
