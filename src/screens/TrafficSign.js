import React, { useState } from 'react';
import '../App.css';

function TrafficSign() {
  const [image, setImage] = useState(null);
  const [classification, setClassification] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 108;
        canvas.height = 110;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, 108, 110);
        
        setImage(canvas.toDataURL('image/jpeg', 1.0));
      };
      img.src = reader.result;
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const classifyImage = async () => {
    if (!image) return;

    setIsLoading(true);
    try {
      const response = await fetch('https://0a01-35-230-113-221.ngrok-free.app/api/classify_sign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: image }),
      });

      const data = await response.json();
      setClassification(data);
    } catch (error) {
      console.error('Error classifying image:', error);
      setClassification(null);
    }
    setIsLoading(false);
  };

  return (
    <div style={{color: 'black', zoom:'70%'}} className="traffic-sign-container">
      <h1>Traffic Sign Classification</h1>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {image && (
        <div>
          <img src={image} alt="Uploaded" style={{ width: '108px', height: '110px', marginTop: '20px' }} />
          <button onClick={classifyImage} disabled={isLoading}>
            {isLoading ? 'Classifying...' : 'Classify Sign'}
          </button>
        </div>
      )}
      {classification && (
        <div className="classification-result">
          <h2>Classification Result:</h2>
          <p>Sign: {classification.sign}</p>
          <p>Confidence: {(classification.confidence * 100).toFixed(2)}%</p>
        </div>
      )}
    </div>
  );
}

export default TrafficSign;