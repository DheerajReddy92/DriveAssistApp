import React, { useState, useEffect, useRef } from 'react';
import '../App.css';

const API_URL = 'https://9a00-35-230-113-221.ngrok-free.app/detect-drowsiness';
const EAR_THRESHOLD = 0.01;

function Main() {
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const [isDrowsy, setIsDrowsy] = useState(false);
  const [faceDetected, setFaceDetected] = useState(true);
  const [drowsinessScore, setDrowsinessScore] = useState(null);
  const streamRef = useRef(null);

  useEffect(() => {
    // Initialize audio with loop property
    audioRef.current = new Audio(process.env.PUBLIC_URL + '/alarm.mp3');
    audioRef.current.loop = true;

    // Add event listener for window unload
    const handleUnload = () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };

    window.addEventListener('beforeunload', handleUnload);

    // Cleanup function
    return () => {
      window.removeEventListener('beforeunload', handleUnload);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  useEffect(() => {
    const startVideoStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
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
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    const playAlarmLoop = async () => {
      if (isDrowsy && audioRef.current) {
        try {
          await audioRef.current.play();
        } catch (err) {
          console.error("Error playing alarm:", err);
        }
      } else if (!isDrowsy && audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };

    playAlarmLoop();
  }, [isDrowsy]);

  const captureAndSendFrame = async () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
      const frameData = canvas.toDataURL('image/jpeg');

      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          body: JSON.stringify({ image: frameData }),
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) throw new Error(`Network response was not ok: ${response.statusText}`);

        const result = await response.json();

        if (result.error) {
          console.error(result.error);
          return;
        }

        const scoreValue = result["Drowsiness Score"] === "N/A" ? null : result["Drowsiness Score"];
        
        setDrowsinessScore(scoreValue);
        setIsDrowsy(typeof scoreValue === "number" && scoreValue < EAR_THRESHOLD);
        setFaceDetected(result["Drowsiness Score"] !== "N/A");
        
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
      {faceDetected && isDrowsy && (
        <div className="alert">
          Drowsiness Detected! Please take a break!
          <div className="alarm-indicator">🚨 Alarm Active 🚨</div>
        </div>
      )}
      {faceDetected && !isDrowsy && <div className="info">Webcam is active. Monitoring for drowsiness...</div>}
      
      <div>Current Drowsiness Score: {drowsinessScore !== null ? drowsinessScore.toFixed(2) : 'N/A'}</div>
    </div>
  );
}

export default Main;
