import React, { useEffect, useState } from "react";
import apiConfig from "../../api/apiConfig";
import movieApi from "../../api/movieApi";

const CastList = (props) => {
  const [item, setItem] = useState([]);

  useEffect(() => {
    let response = null;

    const getCast = async () => {
      response = await movieApi.credits(props.category, props.id);
      setItem(response.cast.slice(0, 5));
    };

    getCast();
  }, [props.category, props.id]);

  return (
    <>
      {item.map((item, index) => (
        <div className="cast__content__item" key={index}>
          <div className="cast__content__item__image">
            <img src={apiConfig.w500Image(item.profile_path)} alt="" />
          </div>
          <div className="cast__content__item__name">{item.name}</div>
        </div>
      ))}
    </>
  );
};

export default CastList;
