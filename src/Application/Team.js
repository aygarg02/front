import React from 'react';
import './Team.css'; // Ensure you import the CSS file for styles

function Team() {
  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Member Details</h1> {/* Centering the text */}

   {/* Team Member 1 */}
<div className="team-member">
  <div className="member-photo">
    <img src='/image.png' alt="Tony" /> {/* Image path */}
  </div>
  <div className="member-details">
    <h2>Dr. Meera Dhabu</h2> {/* Main heading: Member Name */}
    <h3 style={{ margin: '5px 0', color: 'lightgray' }}>ASSOCIATE PROFESSOR</h3> {/* Subheading: Position */}
    <h3  style={{ margin: '5px 0', color: 'lightgray' }}>Speciality: Data Mining, Soft Computing, Network Security, Smart Grid.</h3> {/* Additional details */}
  </div>
</div>
<div className="team-member">
  <div className="member-photo">
    <img src='/c.png' alt="Tony" /> {/* Image path */}
  </div>
  <div className="member-details">
    <h2>Dr. Ashish S. Tiwari </h2> {/* Main heading: Member Name */}
    <h3 style={{ margin: '5px 0', color: 'lightgray' }}>ASSISTANT PROFESSOR</h3> {/* Subheading: Position */}
    <h3  style={{ margin: '5px 0', color: 'lightgray' }}>Speciality: Mobile Communication, Information Security, Operating Systems</h3> {/* Additional details */}
  </div>
</div>
<div className="team-member">
  <div className="member-photo">
    <img src='/8.png' alt="Tony" /> {/* Image path */}
  </div>
  <div className="member-details">
    <h2>Ayush Garg</h2> {/* Main heading: Member Name */}
    <h3 style={{ margin: '5px 0', color: 'lightgray' }}>Software Engineer</h3> {/* Subheading: Position */}
    <h3  style={{ margin: '5px 0', color: 'lightgray' }}>Details: This section can contain more information about Ayush.</h3> {/* Additional details */}
  </div>
</div>
<div className="team-member">
  <div className="member-photo">
    <img src='/Tony.png' alt="Tony" /> {/* Image path */}
  </div>
  <div className="member-details">
    <h2>Suvendu </h2> {/* Main heading: Member Name */}
    <h3 style={{ margin: '5px 0', color: 'lightgray' }}>Software Engineer</h3> {/* Subheading: Position */}
    <h3  style={{ margin: '5px 0', color: 'lightgray' }}>Details: This section can contain more information about Ayush.</h3> {/* Additional details */}
  </div>
</div>


      


    

      {/* Add more team members as needed */}
    </>
  );
}

export default Team;
