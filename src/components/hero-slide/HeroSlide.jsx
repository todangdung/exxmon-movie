import React, { useContext, useEffect, useRef, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import Slider from "react-slick";
import apiConfig from "../../api/apiConfig";
import movieApi, { category, movieType, tvType } from "../../api/movieApi";
import { AuthContext } from "../../context/AuthProvider";
import Button, { TransparentButton } from "../button/Button";
import { NextArrow, PrevArrow, Modal, ModalContent } from "../index";

import "./hero-slide.scss";

const HeroSlide = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  let cate = useParams();

  if (!cate.category) {
    navigate("movie");
  }

  useEffect(() => {
    const getMovies = async () => {
      let response = null;
      const params = {};

      switch (cate.category) {
        case category.movie:
          response = await movieApi.getMovieList(movieType.popular, { params });
          break;
        default:
          response = await movieApi.getTvList(tvType.popular, { params });
      }

      setItems(response.results.slice(0, 4));
    };
    getMovies();
  }, [cate.category]);

  const settings = {
    dots: false,
    infinite: false,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    infinite: true,
    nextArrow: <NextArrow class="next" />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="hero-slide">
      <Slider {...settings}>
        {items.map((item, index) => (
          <HeroSlideItem id={item.id} category={cate.category} key={index} />
        ))}
      </Slider>
      {items.map((item, index) => (
        <TrailerModal item={item} key={index} />
      ))}
    </div>
  );
};

const HeroSlideItem = (props) => {
  const [movie, setMovie] = useState();
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getMovie = async () => {
      let response = null;
      const params = {};

      response = await movieApi.detail(props.category, props.id, { params });

      setMovie(response);
    };

    getMovie();
  }, [props.category, props.item, props.id]);

  const setModalActive = async () => {
    const modal = document.querySelector(`#modal_${props.id}`);
    const videos = await movieApi.getVideos(props.category, props.id);

    if (videos.results.length > 0) {
      const videoSrc = "https://WWW.youtube.com/embed/" + videos.results[0].key;
      modal
        .querySelector(".modal__content > iframe")
        .setAttribute("src", videoSrc);
    } else {
      modal.querySelector(".modal__content").innerHTML = "No trailer";
    }
    modal.classList.toggle("active");
  };

  const checkLogin = () => {
    if (Object.keys(user).length === 0) {
      navigate("/sign-in");
    } else {
      navigate(`${props.id}`);
    }
  };

  return (
    <div className="hero-slide__item">
      <div className="hero-slider__item__image">
        <img
          src={
            movie
              ? apiConfig.originalImage(
                  movie.backdrop_path || movie.poster_path
                )
              : null
          }
          alt=""
        />
      </div>
      <div className="hero-slide__item__info">
        <div className="hero-slide__item__info__title">
          <h1 className="title">{movie ? movie.title || movie.name : null}</h1>
        </div>
        <div className="hero-slide__item__info__genres">
          {movie
            ? movie.genres.slice(0, 4).map((item, index) => (
                <div className="genre" key={index}>
                  {item.name},
                </div>
              ))
            : null}
        </div>
        <div className="buttons">
          <div className="button">
            <Button onClick={checkLogin}>Watch</Button>
          </div>
          <div className="button">
            <TransparentButton onClick={setModalActive}>
              Trailer
            </TransparentButton>
          </div>
        </div>
      </div>
    </div>
  );
};

const TrailerModal = (props) => {
  const item = props.item;

  const iframeRef = useRef(null);

  const onClose = () => iframeRef.current.setAttribute("src", "");

  return (
    <Modal active={false} id={`modal_${item.id}`}>
      <ModalContent onClose={onClose}>
        <iframe ref={iframeRef} width="100%" height="600px"></iframe>
      </ModalContent>
    </Modal>
  );
};

export default HeroSlide;
