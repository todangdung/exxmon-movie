import React, { useEffect, useRef, useState } from "react";
import movieApi from "../../api/movieApi";

const TrailerVideos = (props) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    let response = null;
    const getVideos = async () => {
      if (props.trailer === "trailer") {
        response = await movieApi.getVideos(props.category, props.id);

        setVideos(response.results.slice(0, 3));
      }
    };
    getVideos();
  }, [props.category, props.id, props.trailer]);

  return (
    <div className="videos section">
      {videos.map((video, index) => (
        <VideoContent
          item={props.item}
          key={index}
          video={video}
          trailer={props.trailer}
          category={props.category}
        />
      ))}
    </div>
  );
};

const VideoContent = (props) => {
  const video = props.video;
  const iframeRef = useRef(null);
  const [url, setUrl] = useState("");

  useEffect(() => {
    const height = (iframeRef.current.offsetWidth * 9) / 16 + "px";

    iframeRef.current.setAttribute("height", height);

    switch (props.trailer) {
      case "trailer":
        setUrl(`https://youtube.com/embed/${video.key}`);
        break;
      case "film":
        setUrl(
          `https://www.2embed.ru/embed/imdb/${props.category}?id=${props.item.imdb_id}`
        );
        break;
      default:
        setUrl(`https://youtube.com/embed/${video.key}`);
    }
  }, [props.category, props.item, props.trailer, video.key]);

  return (
    <div className="video__item mb-4">
      <h2 className="mb-1">{video && video.name}</h2>
      <iframe src={url} width="100%" ref={iframeRef}></iframe>
    </div>
  );
};

export default TrailerVideos;
