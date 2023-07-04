import React, { useRef, useState } from 'react';

const VideoPlayer = (props) => {
  const videoRef = useRef(null);
  const [progress, setProgress] = useState(0);

  // Function to update the progress bar
  const updateProgressBar = () => {
    const video = videoRef.current;
    const progress = (video.currentTime / video.duration) * 100;
    setProgress(progress);
  };

  // Function to handle seeking
  const seekVideo = (event) => {
    const progressBar = event.target;
    const video = videoRef.current;
    const seekPosition = (event.nativeEvent.offsetX / progressBar.offsetWidth) * 100;
    const seekTime = (seekPosition * video.duration) / 100;
    video.currentTime = seekTime;
  };

  return (
    <div>
      <video
        ref={videoRef}
        width="640"
        height="360"
        controls
        onTimeUpdate={updateProgressBar}
      >
        <source src={props.video} type="video/mp4" />
        {/* Add additional source elements for different video formats, if needed */}
      </video>
      <progress
        value={progress}
        max="100"
        onClick={seekVideo}
        style={{ width: '100%' }}
      />
    </div>
  );
};

export default VideoPlayer;