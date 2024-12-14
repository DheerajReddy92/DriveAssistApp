import React, { useState } from 'react';
import '../App.css';
import d1 from '../images/d1.gif'; 
import d2 from '../images/d2.gif'; 
import d3 from '../images/tf2.jpg'; 
import Main from '../screens/Main.js';
import TrafficSign from '../screens/TrafficSign.js'; 
import TrafficLiveSign from '../screens/TrafficLiveSign.js'; // Add this import

function Menu() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [showMain, setShowMain] = useState(false);
    const [showTrafficSign, setShowTrafficSign] = useState(false);
    const [showTrafficLiveSign, setShowTrafficLiveSign] = useState(false); // Add this state

    const handleOptionClick = (index) => {
        if (index === 0) {
            if (activeIndex === 0) {
                setShowMain(true);
            } else {
                setActiveIndex(0);
                setShowMain(false);
                setShowTrafficSign(false);
                setShowTrafficLiveSign(false); // Add this
            }
        } else if (index === 1) {
            if (activeIndex === 1) {
                setShowTrafficSign(true);
            } else {
                setActiveIndex(1);
                setShowMain(false);
                setShowTrafficSign(false);
                setShowTrafficLiveSign(false); // Add this
            }
        } else if (index === 2) { // Add this block for TrafficLiveSign
            if (activeIndex === 2) {
                setShowTrafficLiveSign(true);
            } else {
                setActiveIndex(2);
                setShowMain(false);
                setShowTrafficSign(false);
                setShowTrafficLiveSign(false);
            }
        } else {
            if (activeIndex === index) {
                return;
            } else {
                setActiveIndex(index);
                setShowMain(false);
                setShowTrafficSign(false);
                setShowTrafficLiveSign(false); // Add this
            }
        }
    };

    const handleCloseMain = () => {
        setShowMain(false);
        setActiveIndex(0);
    };

    const handleCloseTrafficSign = () => {
        setShowTrafficSign(false);
        setActiveIndex(1);
    };

    const handleCloseTrafficLiveSign = () => { // Add this function
        setShowTrafficLiveSign(false);
        setActiveIndex(2);
    };

    return (
        <div className="options">
            {showMain ? (
                <div className="main-option">
                    <Main onClose={handleCloseMain} />
                    <button className="close-button" onClick={handleCloseMain}>Close</button>
                </div>
            ) : showTrafficSign ? (
                <div className="main-option">
                    <TrafficSign onClose={handleCloseTrafficSign} />
                    <button className="close-button" onClick={handleCloseTrafficSign}>Close</button>
                </div>
            ) : showTrafficLiveSign ? ( // Add this block
                <div className="main-option">
                    <TrafficLiveSign onClose={handleCloseTrafficLiveSign} />
                    <button className="close-button" onClick={handleCloseTrafficLiveSign}>Close</button>
                </div>
            ) : (
                <>
                    {/* Drowsiness Option */}
                    <div
                        className={`option ${activeIndex === 0 ? 'active' : ''}`}
                        style={{ backgroundImage: `url(${d1})` }}
                        onClick={() => handleOptionClick(0)}
                    >
                         <div className="shadow"></div>
                        <div className="label">
                            <div className="icon">
                                <i className="fas fa-video"></i>
                            </div>
                            <div className="info">
                                <div className="main">Drowsiness Detection</div>
                                <div className="sub">Alert Driver by calculating ear</div>
                            </div>
                        </div>
                    </div>

                    {/* Traffic Signs Option */}
                    <div
                        className={`option ${activeIndex === 1 ? 'active' : ''}`}
                        style={{ backgroundImage: `url(${d2})` }}
                        onClick={() => handleOptionClick(1)}
                    >
                         <div className="shadow"></div>
                        <div className="label">
                            <div className="icon">
                                <i className="fas fa-video"></i>
                            </div>
                            <div className="info">
                                <div className="main">Traffic Signs</div>
                                <div className="sub">Find Traffic signs in a picture</div>
                            </div>
                        </div>
                    </div>

                    {/* Live Traffic Signs Option */}
                    <div
                        className={`option ${activeIndex === 2 ? 'active' : ''}`}
                        style={{ backgroundImage: `url(${d3})` }}
                        onClick={() => handleOptionClick(2)}
                    >
                         <div className="shadow"></div>
                        <div className="label">
                            <div className="icon">
                                <i className="fas fa-video"></i>
                            </div>
                            <div className="info">
                                <div className="main">Live Traffic Signs</div>
                                <div className="sub">Find Traffic signs on video feed</div>
                            </div>
                        </div>
                    </div>

                    {/* Fourth Option */}
                    <div
                        className={`option ${activeIndex === 3 ? 'active' : ''}`}
                        style={{ backgroundImage: 'url(https://66.media.tumblr.com/5516a22e0cdacaa85311ec3f8fd1e9ef/tumblr_o45jwvdsL11qho82wo1_1280.jpg)' }}
                        onClick={() => handleOptionClick(3)}
                    >
                        {/* ... (content remains the same) ... */}
                    </div>
                </>
            )}
        </div>
    );
}

export default Menu;