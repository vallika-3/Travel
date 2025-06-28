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

const API_BASE = 'http://localhost:5001/api';

const ReelsPage = () => {
  const [reels, setReels] = useState([]);

  useEffect(() => {
    // Fetch reels from the backend
    fetch(`${API_BASE}/reels`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setReels(data);
        } else {
          console.warn('Fetched data is not an array:', data);
          setReels([]); // Ensure reels is an array even if backend sends something else
        }
      })
      .catch((err) => {
        console.error('Error fetching reels:', err);
        setReels([]);
      });
  }, []); // Empty dependency array means this runs once on component mount

  return (
    <div className="reels-page">
      {/* Conditionally render ReelCard only if reels is an array and has items */}
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
  // MOCK_USER_ID: In a real application, this would come from your authenticated user's ID
  // For now, let's use a consistent mock ID for testing likes/comments.
  const MOCK_USER_ID = 'mockUser123';

  // Check if the current mock user has liked the reel initially
  const [liked, setLiked] = useState(
    Array.isArray(reel.likedBy) && reel.likedBy.includes(MOCK_USER_ID)
  );
  const [activePanel, setActivePanel] = useState(null); // 'comments' or 'options'
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isLoadingComments, setIsLoadingComments] = useState(false);

  // Auto-play video on component mount
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
      const res = await fetch(`${API_BASE}/reels/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Send the mock user ID to the backend
        body: JSON.stringify({ reelId: reel._id, userId: MOCK_USER_ID }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const updatedReel = await res.json();
      console.log('Updated reel after like:', updatedReel);

      // Update the liked state based on the response from the backend
      setLiked(Array.isArray(updatedReel.likedBy) && updatedReel.likedBy.includes(MOCK_USER_ID));
    } catch (err) {
      console.error('Like error:', err);
      alert('Failed to update like. Check console for details.');
    }
  };

  const handleShare = () => {
    // In a real app, you might want to generate a specific reel URL
    navigator.clipboard.writeText(window.location.href);
    alert('Reel link copied to clipboard!');
  };

  const openComments = async () => {
    setActivePanel('comments');
    setIsLoadingComments(true);
    setComments([]); // Clear previous comments when opening

    try {
      console.log('Fetching comments for reel:', reel._id);
      const res = await fetch(`${API_BASE}/comments/${reel._id}`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      console.log('Fetched comments:', data);

      if (Array.isArray(data)) {
        setComments(data);
      } else {
        console.warn('Fetched comments data is not an array:', data);
        setComments([]);
      }
    } catch (err) {
      console.error('Failed to fetch comments:', err);
      setComments([]); // Ensure comments is an array on error
      alert('Failed to load comments. Check console for details.');
    } finally {
      setIsLoadingComments(false);
    }
  };

  const openOptions = () => setActivePanel('options');

  const closePanel = () => {
    setActivePanel(null);
    // Optionally clear comments/new comment when panel closes
    setComments([]);
    setNewComment('');
  };

  const postComment = async (e) => {
    e.preventDefault(); // Prevent default form submission
    const text = newComment.trim();
    if (!text) {
      alert('Comment cannot be empty!');
      return;
    }

    try {
      console.log('Posting comment:', { reelId: reel._id, user: MOCK_USER_ID, text });
      const res = await fetch(`${API_BASE}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reelId: reel._id,
          user: MOCK_USER_ID, // Use the mock user ID for posting comments
          text,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const savedComment = await res.json();
      console.log('Comment posted:', savedComment);
      // Add the newly posted comment to the top of the comments list
      setComments((prev) => [savedComment, ...prev]);
      setNewComment(''); // Clear the input field
    } catch (err) {
      console.error('Error posting comment:', err);
      alert('Failed to post comment. Check console for details.');
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