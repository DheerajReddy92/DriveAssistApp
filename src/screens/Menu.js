import React, { useState } from 'react';
import '../App.css';
import d1 from '../images/d1.gif'; 
import d2 from '../images/d2.gif'; 
import Main from '../screens/Main.js';

function Menu() {
    const [activeIndex, setActiveIndex] = useState(0); // Set initial state to 0 (Drowsiness active)
    const [showMain, setShowMain] = useState(false);

    const handleOptionClick = (index) => {
        // Only allow click if the option is active
        if (index === 0) {
            // For the first option, show Main if it's already active
            if (activeIndex === 0) {
                setShowMain(true);
            } else {
                setActiveIndex(0); // Set it to active
                setShowMain(false); // Ensure Main is hidden when switching
            }
        } else {
            // For other options, only set as active if it's clicked
            if (activeIndex === index) {
                // If the same option is clicked again, do nothing
                return;
            } else {
                setActiveIndex(index);
                setShowMain(false); // Ensure Main is hidden for other options
            }
        }
    };

    const handleCloseMain = () => {
        setShowMain(false);
        setActiveIndex(0); // Reset to Drowsiness as the default active option
    };

    return (
        <div className="options">
            {/* First Option: Drowsiness or Main Component */}
            {showMain ? (
                <div className="main-option">
                    <Main onClose={handleCloseMain} />
                    <button className="close-button" onClick={handleCloseMain}>Close</button>
                </div>
            ) : (
                <div
                    className={`option ${activeIndex === 0 ? 'active' : ''}`} // Active class based on state
                    style={{ backgroundImage: `url(${d1})` }}
                    onClick={() => handleOptionClick(0)} // Click handler for Drowsiness
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
            )}

            {/* Second Option: Traffic Signs */}
            <div
                className={`option ${activeIndex === 1 ? 'active' : ''}`}
                style={{ backgroundImage: `url(${d2})` }}
                onClick={() => handleOptionClick(1)} // Click handler for Traffic Signs
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
                onClick={() => handleOptionClick(2)} // Click handler for Traffic Signs Classification
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
                onClick={() => handleOptionClick(3)} // Click handler for Drowsy and Traffic Signs
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