
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function VideoPage() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      const res = await axios.get(`${API_URL}/api/videos/${id}`);
      setVideo(res.data);
    };
    fetchVideo();
  }, [id]);

  if (!video) return <p className="loading-text">Loading...</p>;

  return (
    <div className="video-page">
      <video controls src={video.videoUrl}></video>
      <h2>{video.title}</h2>
      <p>{video.description}</p>
    </div>
  );
}

export default VideoPage;
