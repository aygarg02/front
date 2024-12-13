import React from 'react';
import './Team.css'; // Ensure you import the CSS file for styles

// Import images
import member1 from '../../static/public/Dr_puja_Bang.jpg';
import member2 from '../../static/public/iyesr.jpg';
import member3 from '../../static/public/8.png';
import member4 from '../../static/public/suvendu.jpg';


function Team() {
  return (
    <>
   

      {/* Team Member 1 */}
      <div className="team-member">
        <div className="member-photo">
          <img src={member1} alt="Dr. Meera Dhabu" /> {/* Image path */}
        </div>
        <div className="member-details">
          <div class="Name">Dr. Puja Hingorani Bang</div> {/* Main heading: Member Name */}
          <h3 >Additional Professor</h3> {/* Subheading: Position */}
          <h3 >  Educational: MBBS, MS (Ophthalmology), DNB, FCPS (Ophthalmology), DOMS, Fellowship in Cornea</h3> {/* Additional details */}
        </div>
      </div>

      {/* Team Member 2 */}
      <div className="team-member">
        <div className="member-photo">
          <img src={member2} alt="Dr. Ashish S. Tiwari" /> {/* Image path */}
        </div>
        <div className="member-details">
        <div class="Name">Dr. Vandana Akshay Iyer</div> {/* Main heading: Member Name */}
          <h3 >ASSISTANT PROFESSOR</h3> {/* Subheading: Position */}
          <h3 >Educational: MBBS, MS Ophthalmology, FMRF</h3> {/* Additional details */}
        </div>
      </div>

      

      {/* Add more team members as needed */}
    </>
  );
}

export default Team;
