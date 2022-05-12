import { useParams, useNavigate } from "react-router-dom";

import {
  Header,
  HeroSlide,
  MovieList,
  RightSide,
  Footer,
} from "../../components";

import { movieType, tvType } from "../../api/movieApi";

import "./home.scss";
import { useEffect } from "react";

const Home = () => {
  const { category } = useParams();
  const movie = JSON.parse(localStorage.getItem(category));

  const navigate = useNavigate();

  useEffect(() => {
    if (!category) {
      navigate("movie");
    }
  }, [category]);

  return (
    <>
      <div className="home ">
        <div className="middle-side container">
          <div className="section">
            <Header />
          </div>
          <div className="section header-height">
            <HeroSlide />
          </div>
          <div className="section ">
            <div className="section-header">
              <h3>Popular</h3>
            </div>
            <MovieList type={movieType.popular} category={category} />
          </div>
          <div className="section ">
            <div className="section-header">
              <h3>Top rated</h3>
            </div>
            <MovieList type={movieType.top_rated} category={category} />
          </div>
          <div className="section ">
            <div className="section-header">
              <h3>{category === "movie" ? "Up coming" : "Airing Today"}</h3>
            </div>
            <MovieList
              type={
                category === "movie" ? movieType.upcoming : tvType.airing_today
              }
              category={category}
            />
          </div>

          {movie && (
            <div className=" mb-6 section">
              <div className="section-header">
                <h3>Saved</h3>
              </div>
              <MovieList category={category} ids={movie && movie} />
            </div>
          )}
          <Footer />
        </div>
        <div className="right-section">
          <RightSide />
        </div>
      </div>
    </>
  );
};

export default Home;
