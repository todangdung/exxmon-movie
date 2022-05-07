import React, { useEffect, useRef, useState } from "react";
import movieApi from "../../api/movieApi";

const Videos = (props) => {
  const [item, setItem] = useState([]);

  useEffect(() => {
    let response = null;

    const getVideos = async () => {
      response = await movieApi.getVideos(props.category, props.id);

      setItem(response.results.slice(0, 3));
    };

    getVideos();
  }, [props.category, props.id]);

  return (
    <div className="videos section">
      {item.map((item, index) => (
        <VideoContent item={item} key={index} />
      ))}
    </div>
  );
};

const VideoContent = (props) => {
  const item = props.item;
  const iframeRef = useRef(null);

  useEffect(() => {
    const height = (iframeRef.current.offsetWidth * 9) / 16 + "px";

    iframeRef.current.setAttribute("height", height);
  }, []);

  return (
    <div className="video__item mb-4">
      <h2 className="mb-1">{item && item.name}</h2>
      <iframe
        src={`https://youtube.com/embed/${item.key}`}
        width="100%"
        ref={iframeRef}
      ></iframe>
    </div>
  );
};

export default Videos;
