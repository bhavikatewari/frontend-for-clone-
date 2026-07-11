
import { useEffect, useState } from "react";
import axios from "axios";
import VideoCard from "../components/VideoCard";

const API_URL = import.meta.env.VITE_API_URL;

function Home() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/videos`);
        setVideos(res.data);
      } catch (error) {
        console.error("Failed to load videos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  if (loading) return <p className="loading-text">Loading videos...</p>;

  return (
    <div className="video-grid">
      {videos.length === 0 ? (
        <p className="loading-text">No videos yet — upload the first one!</p>
      ) : (
        videos.map((video) => <VideoCard key={video._id} video={video} />)
      )}
    </div>
  );
}

export default Home;
