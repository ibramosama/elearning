import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ videoId }) => {
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    // Make an API request to your Django backend to retrieve the video file URL for the given videoId
    // You can use the Fetch API, Axios, or any other library of your choice
    fetch(`/api/videos/${videoId}/url`)
      .then(response => response.json())
      .then(data => setVideoUrl(data.url))
      .catch(error => console.error('Error:', error));
  }, [videoId]);

  return (
    <div>
      {videoUrl && <ReactPlayer url={videoUrl} controls />}
    </div>
  );
};

export default VideoPlayer;