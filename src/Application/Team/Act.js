import React, { useState } from 'react';
import './Act.css';
import Team from './Team';
import AimsTeam from './AimsTeam';

function Act() {
    const [showAimsTeam, setShowAimsTeam] = useState(false); // State to toggle teams

    return (
        <div>
            <b>
                <h1 style={{ textAlign: 'center' }}> Member Details </h1>
            </b>
            <hr  />

            {/* Toggle Texts */}
            <div className="toggle-container">
                <span
                    className={!showAimsTeam ? "active-tab" : "inactive-tab"}
                    onClick={() => setShowAimsTeam(false)} // Show VNIT Team
                >
                    VNIT Team
                </span>
                <span
                    className={showAimsTeam ? "active-tab" : "inactive-tab"}
                    onClick={() => setShowAimsTeam(true)} // Show Aims Team
                >
                    Aims Team
                </span>
            </div>

            {/* Displaying the Teams */}
            <div className="team-container">
                {showAimsTeam ? <AimsTeam /> : <Team />}
            </div>
        </div>
    );
}

export default Act;
