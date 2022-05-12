import React, { useEffect, useRef, useState, useCallback } from "react";

import "./movie-video.scss";

const MovieVideo = (props) => {
  const iframeRef = useRef(null);
  const [url, setUrl] = useState("");
  const [season, setSeason] = useState(1);
  const [episode, setEpisode] = useState(1);

  useEffect(() => {
    const height = (iframeRef.current.offsetWidth * 9) / 16 + "px";

    iframeRef.current.setAttribute("height", height);

    switch (props.category) {
      case "movie":
        setUrl(`https://www.2embed.ru/embed/tmdb/movie?id=${props.id}`);
        break;
      case "tv":
        setUrl(
          `https://www.2embed.ru/embed/tmdb/tv?id=${props.id}&s=${season}&e=${episode}`
        );
        break;
      default:
        setUrl("");
    }
  }, [props.category, props.id, season, episode]);

  const episodeCount = (props) => {
    let array = [];
    for (let i = 0; i < props; i++) {
      array.push(i);
    }

    return array;
  };

  return (
    <div className="movie-video mb-4 section">
      <h2 className="mb-1">{props.item.title || props.item.name}</h2>
      <iframe src={url} width="100%" ref={iframeRef} title="movie"></iframe>
      <div className="movie-video__info">
        {props.item.seasons && (
          <>
            <h3 className="title">Seasons</h3>
            <div className="seasons">
              {props.item.seasons?.map((item, index) => (
                <div className="movie-video__info__seasons" key={index}>
                  <button onClick={() => setSeason(index + 1)}>
                    {item.name}
                  </button>
                </div>
              ))}
            </div>
            <h3 className="title">Episode</h3>
            <div className="episode">
              {props.item.seasons?.map((item, index) => (
                <div className="movie-video__info__episode__item">
                  {index + 1 === season &&
                    episodeCount(item.episode_count).map((item, index) => (
                      <button onClick={() => setEpisode(index + 1)}>
                        {index + 1}
                      </button>
                    ))}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MovieVideo;
