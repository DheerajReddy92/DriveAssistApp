
import React, { useState, useEffect, useRef } from 'react';
import '../App.css';
import d1 from '../images/d1.gif'; 
import d2 from '../images/d2.gif'; 

function Menu() {

    const [activeIndex, setActiveIndex] = useState(0);
 
    return (
        <div className="options">
          {/* First Option: Drowsiness */}
          <div
            className={`option ${activeIndex === 0 ? 'active' : ''}`}
            style={{ backgroundImage: `url(${d1})` }}
            onClick={() => setActiveIndex(0)}
          >
            <div className="shadow"></div>
            <div className="label">
              <div className="icon">
                <i className="fas fa-walking"></i>
              </div>
              <div className="info">
                <div className="main">Drowsiness</div>
                <div className="sub">Alert Driver when drowsy</div>
              </div>
            </div>
          </div>
    
          {/* Second Option: Traffic Signs */}
          <div
            className={`option ${activeIndex === 1 ? 'active' : ''}`}
            style={{ backgroundImage: `url(${d2})` }}
            onClick={() => setActiveIndex(1)}
          >
            <div className="shadow"></div>
            <div className="label">
              <div className="icon">
                <i className="fas fa-snowflake"></i>
              </div>
              <div className="info">
                <div className="main">Traffic Signs</div>
                <div className="sub">Find Traffic signs on video feed</div>
              </div>
            </div>
          </div>
    
          {/* Third Option: Traffic Signs Classification */}
          <div
            className={`option ${activeIndex === 2 ? 'active' : ''}`}
            style={{ backgroundImage: 'url(https://66.media.tumblr.com/5af3f8303456e376ceda1517553ba786/tumblr_o4986gakjh1qho82wo1_1280.jpg)' }}
            onClick={() => setActiveIndex(2)}
          >
            <div className="shadow"></div>
            <div className="label">
              <div className="icon">
                <i className="fas fa-tree"></i>
              </div>
              <div className="info">
                <div className="main">Traffic Signs</div>
                <div className="sub">Classify Traffic signs on image upload</div>
              </div>
            </div>
          </div>
    
          {/* Fourth Option: Drowsy and Traffic Signs */}
          <div
            className={`option ${activeIndex === 3 ? 'active' : ''}`}
            style={{ backgroundImage: 'url(https://66.media.tumblr.com/5516a22e0cdacaa85311ec3f8fd1e9ef/tumblr_o45jwvdsL11qho82wo1_1280.jpg)' }}
            onClick={() => setActiveIndex(3)}
          >
            <div className="shadow"></div>
            <div className="label">
              <div className="icon">
                <i className="fas fa-tint"></i>
              </div>
              <div className="info">
                <div className="main">Drowsy and Traffic Signs</div>
                <div className="sub">Omuke trughte a otufta</div>
              </div>
            </div>
          </div>
    
        </div>
      );
    }
    
    export default Menu;