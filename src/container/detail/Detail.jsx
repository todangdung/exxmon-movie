import React, { useEffect, useRef, useState } from "react";

import { useParams } from "react-router-dom";
import StarRatings from "react-star-ratings";
import movieApi from "../../api/movieApi";
import apiConfig from "../../api/apiConfig";
import CastList from "./CastList";
import "./detail.scss";
import { Footer, MovieList, Review, Videos } from "../../components";

const Detail = () => {
  const [item, setItem] = useState([]);
  const { id, category } = useParams();
  const detailRef = useRef(null);

  useEffect(() => {
    let response = null;
    const params = {};

    const getDetail = async () => {
      response = await movieApi.detail(category, id, { params });
      setItem(response);
    };

    detailRef.current.scrollTo(0, 0);

    getDetail();
  }, [id, category]);

  const bg = apiConfig.originalImage(item.backdrop_path || item.poster_path);

  return (
    <>
      <div className="detail" ref={detailRef}>
        <div className="detail__banner">
          <img src={bg} alt="" />
        </div>
        <DetailContent item={item} />
        <Videos category={category} id={id} />
        {item.backdrop_path ? (
          <div className="detail__image section">
            <h2 className="mb-2">Photos</h2>

            <div className="detail__image__content">
              <div className="detail__image__content__item">
                <img src={apiConfig.originalImage(item.backdrop_path)} alt="" />
              </div>
              <div className="detail__image__content__item">
                <img
                  src={apiConfig.originalImage(
                    item.belongs_to_collection &&
                      item.belongs_to_collection.backdrop_path
                  )}
                  alt=""
                />
              </div>
            </div>
          </div>
        ) : null}
        <Review category={category} id={id} />

        <div className="section ">
          <div className="section-header">
            <h2>Recommendations</h2>
          </div>
          <MovieList
            category={category}
            type="recommendations"
            id={id}
            slidesToShow={6}
          />
        </div>
        <Footer />
      </div>
    </>
  );
};

const DetailContent = (props) => {
  const item = props.item;
  const { id, category } = useParams();

  const poster = apiConfig.w500Image(item.poster_path || item.backdrop_path);

  return (
    <div className="detail__content section">
      <div className="detail__content__image">
        <img src={poster} alt="" />
      </div>
      <div className="detail__content__info">
        <h1 className="title">{item.title || item.name}</h1>
        <p className="tagline">{item.tagline}</p>
        <div className="rated">
          <StarRatings
            rating={item.vote_average && item.vote_average / 2}
            starDimension="17px"
            starSpacing="0px"
            starRatedColor="#FF9933	"
            numberOfStars={5}
            name="rating"
          />
          <span>({item.vote_count} Votes)</span>
        </div>
        <div className="more">
          <div className="rating">
            <span>Ratting</span>
            <span>{item.vote_average}</span>
          </div>
          <div className="date">
            <span>Release Date</span>
            <span>{item.release_date || item.first_air_date}</span>
          </div>
          <div className="runtime">
            <span>Runtime</span>
            <span className="runtime__content">{item.runtime} Mins</span>
          </div>
        </div>
        <div className="genres">
          {item.genres &&
            item.genres.map((item, index) => (
              <span key={index}>{item.name}</span>
            ))}
        </div>
        <div className="overview">
          <h3>Over view</h3>
          <p>{item.overview}</p>
        </div>
        <div className="cast">
          <h3>Casts</h3>
          <div className="cast__content">
            <CastList category={category} id={id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
