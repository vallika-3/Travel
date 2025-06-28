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
  FaTimes,
} from 'react-icons/fa';
import api from '../api';

const ReelsPage = () => {
  const [reels, setReels] = useState([]);

  useEffect(() => {
    const fetchReels = async () => {
      try {
        const res = await api.get('/api/reels');
        if (Array.isArray(res.data)) {
          setReels(res.data);
        } else {
          console.warn('Fetched data is not an array:', res.data);
          setReels([]);
        }
      } catch (err) {
        console.error('Error fetching reels:', err);
        setReels([]);
      }
    };

    fetchReels();
  }, []);

  return (
    <div className="reels-page">
      {Array.isArray(reels) && reels.length > 0 ? (
        reels.map((reel) => (
          <ReelCard key={reel._id} reel={reel} />
        ))
      ) : (
        <p className="no-reels-message">No reels to display. Try adding some to your backend!</p>
      )}
    </div>
  );
};

const ReelCard = ({ reel }) => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [liked, setLiked] = useState(
    Array.isArray(reel.likedBy) && reel.likedBy.includes('mockUser123')
  );
  const [activePanel, setActivePanel] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isLoadingComments, setIsLoadingComments] = useState(false);

  const MOCK_USER_ID = 'mockUser123';

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch((e) => console.warn('Autoplay failed:', e));
    }
  }, []);

  const toggleMute = () => setIsMuted(!isMuted);

  const toggleLike = async () => {
    try {
      console.log('Toggling like for reel:', reel._id, 'by user:', MOCK_USER_ID);
      const res = await api.post('/api/reels/like', { reelId: reel._id });

      const updatedReel = res.data;
      setLiked(Array.isArray(updatedReel.likedBy) && updatedReel.likedBy.includes(MOCK_USER_ID));
    } catch (err) {
      console.error('Like error:', err);
      alert('Failed to update like.');
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Reel link copied to clipboard!');
  };

  const openComments = async () => {
    setActivePanel('comments');
    setIsLoadingComments(true);
    setComments([]);

    try {
      console.log('Fetching comments for reel:', reel._id);
      const res = await api.get(`/api/comments/${reel._id}`);
      const data = res.data;

      if (Array.isArray(data)) {
        setComments(data);
      } else {
        console.warn('Fetched comments data is not an array:', data);
        setComments([]);
      }
    } catch (err) {
      console.error('Failed to fetch comments:', err);
      alert('Failed to load comments.');
    } finally {
      setIsLoadingComments(false);
    }
  };

  const openOptions = () => setActivePanel('options');

  const closePanel = () => {
    setActivePanel(null);
    setComments([]);
    setNewComment('');
  };

  const postComment = async (e) => {
    e.preventDefault();
    const text = newComment.trim();
    if (!text) {
      alert('Comment cannot be empty!');
      return;
    }

    try {
      console.log('Posting comment:', { reelId: reel._id, user: MOCK_USER_ID, text });
      const res = await api.post('/api/comments', {
        reelId: reel._id,
        user: MOCK_USER_ID,
        text,
      });

      const savedComment = res.data;
      setComments((prev) => [savedComment, ...prev]);
      setNewComment('');
    } catch (err) {
      console.error('Error posting comment:', err);
      alert('Failed to post comment.');
    }
  };


  return (
    <div className="reel-container">
      {/* Reel Content */}
      <div className="reel-wrapper">
        <div className="reel-card">
          <video
            ref={videoRef}
            src={reel.videoUrl}
            muted={isMuted}
            loop // Loop the video
            autoPlay // Autoplay the video
            className="reel-video"
            playsInline // Important for mobile browsers to play inline
          />
          <div className="reel-overlay"></div>
        </div>
      </div>

      {/* Left Profile */}
      <div className="reel-leftbar">
        <div className="reel-profile">
          <img src={reel.profilePic} alt="profile" />
          <div className="reel-profile-text">
            <h4>@{reel.username}</h4>
            <p>
              <FaMusic style={{ marginRight: '6px' }} />
              {reel.audio}
            </p>
          </div>
        </div>
      </div>

      {/* Right Controls */}
      <div className="reel-controls">
        <button onClick={toggleMute}>
          {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
        </button>
        {/* Add 'liked' class dynamically */}
        <button onClick={toggleLike} className={liked ? 'liked' : ''}>
          <FaHeart />
        </button>
        <button onClick={openComments}>
          <FaCommentDots />
        </button>
        <button onClick={handleShare}>
          <FaShareAlt />
        </button>
        <button onClick={openOptions}>
          <FaEllipsisV />
        </button>
      </div>

      {/* Side Panel - Comments */}
      {/* Use conditional rendering based on activePanel state */}
      <div className={`side-panel ${activePanel === 'comments' ? 'show' : ''}`}>
        <div className="panel-header">
          <h4>Comments</h4>
          <button onClick={closePanel}>
            <FaTimes />
          </button>
        </div>
        <div className="panel-content">
          <div className="comment-input-area">
            {/* Displaying a generic avatar for the current user */}
            <img src={`https://i.pravatar.cc/100?u=${MOCK_USER_ID}`} alt="me" className="comment-avatar" />
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
          <div className="comments-section">
            {isLoadingComments ? (
              <p className="loading-comments">Loading comments...</p>
            ) : !comments.length ? (
              <p className="no-comments">No comments yet.</p>
            ) : (
              comments.map((c) => (
                <div key={c._id} className="comment-card">
                  <div className="comment-header">
                    {/* Displaying a generic avatar for comment user */}
                    <img src={`https://i.pravatar.cc/100?u=${c.user}`} alt={c.user} className="comment-avatar" />
                    <div className="comment-meta">
                      <strong>{c.user}</strong>
                      {/* Format date nicely */}
                      <span>{new Date(c.createdAt).toLocaleString()}</span>
                    </div>
                  </div>
                  <p className="comment-body">{c.text}</p>
                  <div className="comment-actions">
                    {/* These buttons are placeholders, implement their logic if needed */}
                    <button>Like</button>
                    <button>Reply</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Side Panel - Options */}
      {/* Use conditional rendering based on activePanel state */}
      <div className={`side-panel ${activePanel === 'options' ? 'show' : ''}`}>
        <div className="panel-header">
          <h4>Options</h4>
          <button onClick={closePanel}>
            <FaTimes />
          </button>
        </div>
        <div className="panel-content">
          <ul>
            <li className="option-item" onClick={() => alert('Saved!')}>
              Save Reel
            </li>
            <li className="option-item" onClick={() => alert('Reported!')}>
              Report
            </li>
            <li
              className="option-item"
              onClick={() => {
                // Copy the video URL directly
                navigator.clipboard.writeText(reel.videoUrl);
                alert('Video link copied!');
              }}
            >
              Copy Link
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReelsPage;