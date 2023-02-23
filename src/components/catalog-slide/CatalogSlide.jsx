import React, { useEffect, useState, useRef, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";

import movieApi from "../../api/movieApi";
import { category } from "../../api/movieApi";
import { Button, TransparentButton } from "../index";

import apiConfig from "../../api/apiConfig";

import "./catalog-slide.scss";
import Modal, { ModalContent } from "../modal/Modal";
import { AuthContext } from "../../context/AuthProvider";

const CatalogSlide = (props) => {
    const [items, setItems] = useState([]);

    const param = useParams();

    useEffect(() => {
        const getMovies = async () => {
            let response = null;

            if (props.discover) {
                const params = {};
                switch (param.category) {
                    case category.movie:
                        response = await movieApi.discover(param.category, {
                            params,
                        });
                        break;
                    default:
                        response = await movieApi.discover(param.category, {
                            params,
                        });
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
                        response = await movieApi.getTvList(props.type, {
                            params,
                        });
                        break;
                }
            }
            setItems(response.results.slice(0, 4));
        };

        getMovies();
    }, [param.category, props.type, props]);

    const settings = {
        dots: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        infinite: true,
    };
    return (
        <div className="catalog-slide">
            <Slider {...settings}>
                {items.map((item, index) => (
                    <CatalogSlideItem
                        item={item}
                        key={index}
                        category={param.category}
                    />
                ))}
            </Slider>
            {items.map((item, index) => (
                <TrailerModal item={item} key={index} />
            ))}
        </div>
    );
};

const CatalogSlideItem = (props) => {
    const item = props.item;
    const navigate = useNavigate();

    const { user } = useContext(AuthContext);

    const setActiveModal = async () => {
        const modalElement = document.querySelector(`#modal__${item.id}`);

        const src = await movieApi.getVideos(props.category, item.id);
        const videoSrc = "https://youtube.com/embed/" + src.results[0].key;

        modalElement
            .querySelector(".modal__content > iframe")
            .setAttribute("src", videoSrc);

        modalElement.classList.add("active");
    };

    const checkLogin = () => {
        if (Object.keys(user).length === 0) {
            navigate("/sign-in");
        } else {
            navigate("/" + props.category + "/" + item.id);
        }
    };

    return (
        <div className="catalog-slide__item">
            <div className="catalog-slide__item__banner">
                <img
                    src={apiConfig.originalImage(
                        item.backdrop_path || item.poster_path
                    )}
                    alt=""
                />
            </div>
            <div className="catalog-slide__item__info">
                <div className="catalog-slide__item__info__content">
                    <h1 className="title">{item.title || item.name}</h1>
                    <p className="overview">{item.overview}</p>
                    <div className="btns">
                        <Button onClick={checkLogin}>Watch now</Button>
                        <TransparentButton onClick={setActiveModal}>
                            Trailer
                        </TransparentButton>
                    </div>
                </div>
                <div className="catalog-slide__item__info__image">
                    <img
                        src={apiConfig.w500Image(
                            item.poster_path || item.backdrop_path
                        )}
                        alt=""
                    />
                </div>
            </div>
        </div>
    );
};

const TrailerModal = (props) => {
    const item = props.item;

    const iframeRef = useRef();

    const onClose = () => {
        iframeRef.current.setAttribute("src", "");
    };

    return (
        <Modal id={`modal__${item.id}`}>
            <ModalContent onClose={onClose}>
                <iframe
                    width="100%"
                    height="600px"
                    ref={iframeRef}
                    title="modal"
                ></iframe>
            </ModalContent>
        </Modal>
    );
};

export default CatalogSlide;
