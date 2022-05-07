import React from "react";
import { useParams } from "react-router-dom";
import { category, movieType, tvType } from "../../api/movieApi";
import { CatalogSlide, Header, MovieGrid } from "../../components";
import "./now-playing.scss";
const NowPlaying = () => {
  const params = useParams();

  const type =
    params.category === category.movie
      ? movieType.now_playing
      : tvType.on_the_air;

  return (
    <div className="now-playing">
      <div className="section">
        <Header path="nowplaying" />
      </div>
      <div className="section">
        <CatalogSlide category={params.category} type={type} />
      </div>
      <MovieGrid category={params.category} type={type} path="nowplaying" />
    </div>
  );
};

export default NowPlaying;
