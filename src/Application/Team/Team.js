import React from 'react';
import './Team.css'; // Ensure you import the CSS file for styles

// Import images
import member1 from '../../static/public/image.png';
import member2 from '../../static/public/c.png';
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
        <div class="Name">Dr. Meera Dhabu</div> {/* Main heading: Member Name */}
          <h3 >ASSOCIATE PROFESSOR</h3> {/* Subheading: Position */}
          <h3 >Speciality: Data Mining, Soft Computing, Network Security, Smart Grid.</h3> {/* Additional details */}
        </div>
      </div>

      {/* Team Member 2 */}
      <div className="team-member">
        <div className="member-photo">
          <img src={member2} alt="Dr. Ashish S. Tiwari" /> {/* Image path */}
        </div>
        <div className="member-details">
        <div class="Name">Dr. Ashish S. Tiwari</div> {/* Main heading: Member Name */}
          <h3 >ASSISTANT PROFESSOR</h3> {/* Subheading: Position */}
          <h3 >Speciality: Mobile Communication, Information Security, Operating Systems</h3> {/* Additional details */}
        </div>
      </div>

      {/* Team Member 3 */}
      <div className="team-member">
        <div className="member-photo">
          <img src={member3} alt="Ayush Garg" /> {/* Image path */}
        </div>
        <div className="member-details">
        <div class="Name">Ayush Garg</div> {/* Main heading: Member Name */}
          <h3>Software Engineer</h3> {/* Subheading: Position */}
          <h3 >Details: This section can contain more information about Ayush.</h3> {/* Additional details */}
        </div>
      </div>

      {/* Team Member 4 */}
      <div className="team-member">
        <div className="member-photo">
          <img src={member4} alt="Suvendu" /> {/* Image path */}
        </div>
        <div className="member-details">
        <div class="Name">Suvendu</div> {/* Main heading: Member Name */}
          <h3 >Software Engineer</h3> {/* Subheading: Position */}
          <h3 >Details: This section can contain more information about Suvendu.</h3> {/* Additional details */}
        </div>
      </div>

      {/* Add more team members as needed */}
    </>
  );
}

export default Team;
