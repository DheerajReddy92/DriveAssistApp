import React, { useRef, useEffect, useState } from 'react';
import '../App.css';

const API_URL = 'http://192.168.1.77:5001/api/classify_sign'; // Updated to match your traffic sign API endpoint

function TrafficLiveSign() {
  const videoRef = useRef(null);
  const [classification, setClassification] = useState(null);
  const [isStreaming, setIsStreaming] = useState(false);

  useEffect(() => {
    startVideoStream();
    return () => stopVideoStream();
  }, []);

  const startVideoStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
          setIsStreaming(true);
        };
      }
    } catch (err) {
      console.error("Error accessing webcam:", err);
    }
  };

  const stopVideoStream = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
    setIsStreaming(false);
  };

  const captureAndSendFrame = async () => {
    if (videoRef.current && isStreaming) {
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
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const result = await response.json();
        setClassification(result);
      } catch (error) {
        console.error("Error sending frame:", error);
        setClassification(null); // Reset classification on error
      }
    }
  };

  useEffect(() => {
    let intervalId;
    if (isStreaming) {
      intervalId = setInterval(captureAndSendFrame, 1000); // Send frame every second
    }
    return () => clearInterval(intervalId);
  }, [isStreaming]);

  return (
    <div className="traffic-live-sign">
      <h2>Live Traffic Sign Detection</h2>
      <video 
        ref={videoRef} 
        style={{ width: '100%', maxWidth: '640px', height: 'auto' }} 
        autoPlay 
        playsInline 
        muted
      />
      {classification && (
        <div className="classification-result">
          <h3>Detected Sign: {classification.sign} </h3>
          <p>Confidence: {(classification.confidence * 100).toFixed(2)}%</p>

        </div>
      )}
    </div>
  );
}

export default TrafficLiveSign;