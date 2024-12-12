import React, { useState, useEffect, useRef } from 'react';
import '../App.css';

const API_URL = 'http://127.0.0.1:5000/detect-drowsiness'; // Ensure this points to the correct endpoint
const EAR_THRESHOLD = 0.60;  // Adjust this value as needed

function Main() {
  const videoRef = useRef(null);
  const [isDrowsy, setIsDrowsy] = useState(false);
  const [faceDetected, setFaceDetected] = useState(true);
  const [drowsinessScore, setDrowsinessScore] = useState(null);
  const audioRef = useRef(new Audio(process.env.PUBLIC_URL + '/alarm.wav'));
  const streamRef = useRef(null);

  useEffect(() => {
    const startVideoStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await playVideo();
        }
      } catch (err) {
        console.error("Error accessing webcam:", err);
      }
    };

    startVideoStream();
    const intervalId = setInterval(captureAndSendFrame, 1000);

    return () => {
      clearInterval(intervalId);
      if (streamRef.current) {
        const tracks = streamRef.current.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (isDrowsy) {
      playAudio();
    } else {
      stopAudio();
    }
  }, [isDrowsy]);

  const playVideo = async () => {
    if (videoRef.current) {
      try {
        await videoRef.current.play();
        console.log("Video playback started");
      } catch (err) {
        console.error("Error starting video playback:", err);
      }
    }
  };

  const playAudio = async () => {
    try {
      await audioRef.current.play();
    } catch (err) {
      console.error("Error playing audio:", err);
    }
  };

  const stopAudio = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  const captureAndSendFrame = async () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
      const frameData = canvas.toDataURL('image/jpeg');

      try {
        const response = await fetch(API_URL, { // Use correct API URL
          method: 'POST',
          body: JSON.stringify({ image: frameData }), // Send as 'image'
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) throw new Error(`Network response was not ok: ${response.statusText}`);

        const result = await response.json();

        // Check for errors in the response
        if (result.error) {
          console.error(result.error);
          return;
        }

        // Assuming the API returns {"Drowsiness Score": score}
        const scoreValue =
          result["Drowsiness Score"] === "N/A" ? null : result["Drowsiness Score"];
        
        setDrowsinessScore(scoreValue); // Get the drowsiness score
        
        // Check against threshold only if scoreValue is a number
        setIsDrowsy(typeof scoreValue === "number" && scoreValue < EAR_THRESHOLD); 
        setFaceDetected(result["Drowsiness Score"] !== "N/A"); // Check if face was detected
        
      } catch (error) {
        console.error("Error sending frame:", error);
      }
    }
  };

  return (
    <div>
      <video 
        ref={videoRef} 
        style={{ width: '100%', height: 'auto' }} 
        autoPlay 
        playsInline 
        muted
      />
      {!faceDetected && <div className="warning">No faces detected</div>}
      {faceDetected && isDrowsy && <div className="alert">Drowsiness Detected! Please take a break!</div>}
      {faceDetected && !isDrowsy && <div className="info">Webcam is active. Monitoring for drowsiness...</div>}
      
      <div>Current Drowsiness Score: {drowsinessScore !== null ? drowsinessScore.toFixed(2) : 'N/A'}</div>
    </div>
  );
}

export default Main;
