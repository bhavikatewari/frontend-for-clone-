
import { Link } from "react-router-dom";

function VideoCard({ video }) {
  return (
    <Link to={`/video/${video._id}`}>
      <div className="video-card">
        <img
          src={video.thumbnailUrl || "https://via.placeholder.com/300x170?text=Video"}
          alt={video.title}
        />
        <div className="info">
          <h4>{video.title}</h4>
          <p>{video.views || 0} views</p>
        </div>
      </div>
    </Link>
  );
}

export default VideoCard;
