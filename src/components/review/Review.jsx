import React, { useState, useEffect } from "react";

import movieApi from "../../api/movieApi";

import "./review.scss";

const Review = (props) => {
  const [item, setItem] = useState([]);

  useEffect(() => {
    let response = null;

    const getVideos = async () => {
      response = await movieApi.reviews(props.category, props.id);

      setItem(response.results.slice(0, 2));
    };

    getVideos();
  }, [props.category, props.id]);

  return (
    <>
      {item.length > 0 ? (
        <>
          <div className="section">
            <h2 className="mb-2">Review</h2>
          </div>
          <div className="review section">
            {item.map((item, index) => (
              <div className="review__item" key={index}>
                <div className="review__item__info">
                  <div className="review__item__info__avatar">
                    <img
                      src={
                        item.author_details.avatar_path &&
                        item.author_details.avatar_path.slice(1)
                      }
                      alt=""
                    />
                  </div>
                  <div className="review__item__info__author">
                    <h3 className="author">{item.author}</h3>
                    <div className="rated">
                      {item.author_details.rating && (
                        <span className="rating">
                          {item.author_details.rating + " / 10"}
                        </span>
                      )}
                      <span className="date">
                        {" "}
                        {item.created_at.slice(0, 10)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="review__item__content">{item.content}</div>
              </div>
            ))}
          </div>{" "}
        </>
      ) : null}
    </>
  );
};

export default Review;
