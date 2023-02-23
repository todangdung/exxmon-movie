import React, {
    useEffect,
    useState,
    useCallback,
    useRef,
    useContext,
} from "react";

import { Link, useNavigate } from "react-router-dom";
import "./movie-card.scss";
import StarRatings from "react-star-ratings";

import movieApi from "../../api/movieApi";

import apiConfig from "../../api/apiConfig";
import { category } from "../../api/movieApi";

import { TransparentButton } from "../button/Button";

import { AuthContext } from "../../context/AuthProvider";

const MovieCard = (props) => {
    const item = props.item;
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [link, setLink] = useState("");

    useEffect(() => {
        if (Object.keys(user).length > 0) {
            setLink("/" + category[props.category] + "/" + item.id);
        } else {
            setLink("");
        }
    }, [user, item.id, props.category]);

    const checkLogin = () => {
        if (Object.keys(user).length === 0) {
            navigate("/sign-in");
        }
    };

    const buttonRef = useRef(null);
    const cardRef = useRef(null);
    const [store, setStore] = useState([]);

    const movie = JSON.parse(localStorage.getItem(props.category));

    useEffect(() => {
        if (cardRef && cardRef.current) {
            buttonRef.current.firstChild.classList.remove("active");
        }
        if (movie) {
            movie.forEach((e) => {
                if (
                    cardRef &&
                    cardRef.current &&
                    e === parseInt(cardRef.current.id)
                ) {
                    buttonRef.current.firstChild.classList.add("active");
                }
            });
        }
    }, [item, props.category, movie]);

    const saveLocal = useCallback(
        (id) => {
            const movie = JSON.parse(localStorage.getItem(props.category));

            if (movie) {
                setStore(movie);
            } else {
                localStorage.setItem(props.category, JSON.stringify([id]));
                buttonRef.current.firstChild.classList.add("active");
            }
            const check = movie.includes(id);
            const filter = movie.filter((item) => id !== item);

            if (check) {
                localStorage.setItem(
                    props.category,
                    JSON.stringify([...filter])
                );
                buttonRef.current.firstChild.classList.remove("active");
            } else {
                localStorage.setItem(
                    props.category,
                    JSON.stringify([...movie, id])
                );
            }
        },
        [props.category]
    );

    return (
        <div
            className="movie-card"
            id={item.id}
            ref={cardRef}
            onClick={checkLogin}
        >
            <Link to={link}>
                <div className="movie-card__poster">
                    <img
                        src={apiConfig.w500Image(
                            item.poster_path || item.backdrop_path
                        )}
                        alt=""
                    />
                </div>
                <div className="movie-card__info">
                    <div className="movie-card__info__title">
                        <h4 className="name">{item.title || item.name}</h4>
                    </div>
                    <div className="rated">
                        <StarRatings
                            rating={item.vote_average && item.vote_average / 2}
                            starDimension="15px"
                            starSpacing="0px"
                            starRatedColor="#FFCC33"
                            numberOfStars={5}
                            name="rating"
                        />
                    </div>
                </div>
            </Link>
            <div className="button" ref={buttonRef}>
                <TransparentButton
                    className="white"
                    onClick={() => saveLocal(item.id)}
                >
                    <h2>
                        <i className="bi bi-plus-lg"></i>
                    </h2>
                </TransparentButton>
            </div>
        </div>
    );
};

export const CardSmall = (props) => {
    const [movie, setMovie] = useState();

    const navigate = useNavigate();
    const [link, setLink] = useState("");
    const { user } = useContext(AuthContext);
    useEffect(() => {
        if (Object.keys(user).length > 0) {
            setLink("/" + category[props.category] + "/" + props.id);
        } else {
            setLink("");
        }
    }, [user, props.id, props.category]);

    const checkLogin = () => {
        if (Object.keys(user).length === 0) {
            navigate("/sign-in");
        }
    };

    useEffect(() => {
        const getMovie = async () => {
            let response = null;
            const params = {};

            response = await movieApi.detail(props.category, props.id, {
                params,
            });

            setMovie(response);
        };

        getMovie();
    }, [props.category, props.item, props.id]);

    return (
        <div className="card-small" onClick={checkLogin}>
            <Link to={link}>
                <div className="card-small__item">
                    <div className="card-small__item__image">
                        <img
                            src={
                                movie
                                    ? apiConfig.w500Image(
                                          movie.poster_path ||
                                              movie.backdrop_path
                                      )
                                    : null
                            }
                            alt=""
                        />
                    </div>
                    <div className="card-small__item__info">
                        <div className="card-small__item__info__desc">
                            <h4 className="title">
                                {movie ? movie.title || movie.name : null}
                            </h4>
                            <div className="genres">
                                {movie
                                    ? movie.genres
                                          .slice(0, 2)
                                          .map((item, index) => (
                                              <span
                                                  className="genre"
                                                  key={index}
                                              >
                                                  {item.name},
                                              </span>
                                          ))
                                    : null}
                            </div>
                        </div>
                        <div className="card-small__item__info__rated">
                            <span className="imdb">IMDb</span>
                            <span
                                className={`rate ${
                                    movie &&
                                    (movie.vote_average >= 8
                                        ? "green"
                                        : movie.vote_average >= 6
                                        ? "yellow"
                                        : "red")
                                }`}
                            >
                                {movie && movie.vote_average}
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default MovieCard;
