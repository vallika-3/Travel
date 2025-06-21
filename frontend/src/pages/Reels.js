import React, { useRef, useState, useEffect } from 'react';
import './Reels.css';
import {
  FaHeart,
  FaCommentDots,
  FaShareAlt,
  FaVolumeMute,
  FaVolumeUp,
  FaEllipsisV,
  FaMusic,
} from 'react-icons/fa';

const reelsData = [
  {
    id: 1,
    username: 'booklover_21',
    profilePic: 'https://i.pravatar.cc/150?img=1',
    audio: 'Original Audio - Book Recs',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
  },
  {
    id: 2,
    username: 'litqueen',
    profilePic: 'https://i.pravatar.cc/150?img=2',
    audio: 'Original Audio - Book Talk',
    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
  },
];

const ReelsPage = () => {
  const [activePanel, setActivePanel] = useState(null); // 'comments' | 'options' | null
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const openComments = () => setActivePanel('comments');
  const openOptions = () => setActivePanel('options');
  const closePanel = () => setActivePanel(null);

  const postComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments((prev) => [...prev, newComment]);
      setNewComment('');
    }
  };

  return (
    <div className="reels-page">
      {reelsData.map((reel) => (
        <ReelCard
          key={reel.id}
          reel={reel}
          onOpenComments={openComments}
          onOpenOptions={openOptions}
        />
      ))}

      
      <div className={`side-panel ${activePanel === 'comments' ? 'show' : ''}`}>
        <div className="panel-content">
          <h4>Comments</h4>
          <div className="comment-input-area">
            <img src="https://i.pravatar.cc/100?u=me" alt="me" className="comment-avatar" />
            <form onSubmit={postComment}>
              <input
                type="text"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button type="submit">Post</button>
            </form>
          </div>
          <ul className="comment-list">
            {comments.length === 0 ? (
              <p className="no-comments">No comments yet.</p>
            ) : (
              comments.map((c, i) => (
                <li key={i}>
                  <strong>User{i + 1}</strong>
                  <span>{c}</span>
                  <div className="comment-actions">
                    <small>Just now</small>
                    <button>❤️</button>
                    <button>Reply</button>
                  </div>
                </li>
              ))
            )}
          </ul>
          <button className="close-btn" onClick={closePanel}>Close</button>
        </div>
      </div>

      {/* Options Panel */}
      <div className={`side-panel ${activePanel === 'options' ? 'show' : ''}`}>
        <div className="panel-content">
          <ul>
            <li onClick={() => alert('Saved!')}>Save Reel</li>
            <li onClick={() => alert('Reported!')}>Report</li>
            <li onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert('Link copied!');
            }}>Copy Link</li>
          </ul>
          <button className="close-btn" onClick={closePanel}>Close</button>
        </div>
      </div>
    </div>
  );
};

const ReelCard = ({ reel, onOpenComments, onOpenOptions }) => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  const toggleMute = () => setIsMuted(!isMuted);
  const toggleLike = () => setLiked(!liked);
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Reel link copied!');
  };

  return (
    <div className="reel-card">
      <video
        ref={videoRef}
        src={reel.videoUrl}
        muted={isMuted}
        loop
        autoPlay
        className="reel-video"
        playsInline
      />

      <div className="reel-overlay">
        <div className="reel-profile">
          <img src={reel.profilePic} alt="profile" />
          <div>
            <h4>@{reel.username}</h4>
            <p><FaMusic style={{ marginRight: '6px' }} />{reel.audio}</p>
          </div>
        </div>

        <div className="reel-controls">
          <button onClick={toggleMute}>
            {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
          </button>
          <button onClick={toggleLike} className={liked ? 'liked' : ''}>
            <FaHeart />
          </button>
          <button onClick={onOpenComments}>
            <FaCommentDots />
          </button>
          <button onClick={handleShare}>
            <FaShareAlt />
          </button>
          <button onClick={onOpenOptions}>
            <FaEllipsisV />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReelsPage;