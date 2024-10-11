import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Application/Home';
import Team from './Application/Team';
import DataSet from './Application/DataSet';
import Anotation from './Application/Anotation';
import Show from './Application/Diag/Show';
import Patient from './Application/Patient';
import Search from './Application/search/Parent';
import Login from './Application/WrtP/Entry';
import HR from './Application/HR';
import Rfmid from './Application/Rfmid';
import { useSelector } from "react-redux"; // Import useSelector

// Import images
import homeImage from './static/public/home.png';
import teamImage from './static/public/people.png';
import datasetImage from './static/public/dataset (1).png';
import arrowImage from './static/public/arrow-right (1).png';
import toolsImage from './static/public/tools.png';
import eyeImage from './static/public/eye (1).png';
import retiImage from './static/public/reti.JPG';

function App() {
  const { isLoggedIn, patientId, name, email } = useSelector((state) => state.auth);
  return (
    <div className="App">
      <Router>
        <div className='parent'>
          <div className="sidebar">
            {(isLoggedIn) && (
              <div style={{ display: 'flex' }}>
                <img src={retiImage} alt="Home" style={{ width: '30px', marginLeft: '10px' }} />
                <b style={{ width: '30px', marginLeft: '15px', filter: 'brightness(0) invert(1)' }}>{name}</b>
              </div>
            )}

            <ul>
              <li>
                <Link to="/front" style={{ display: 'flex', alignItems: 'center' }}>
                  Home
                  <img src={homeImage} alt="Home" style={{ width: '20px', marginLeft: '10px', filter: 'brightness(0) invert(1)' }} />
                </Link>
              </li>
              <li>
                <Link to="/Team" style={{ display: 'flex', alignItems: 'center' }}>
                  Team
                  <img src={teamImage} alt="Team" style={{ width: '20px', marginLeft: '10px', filter: 'brightness(0) invert(1)' }} />
                </Link>
              </li>
              <li className="dataset-dropdown">
                <Link to="/DataSet" style={{ display: 'flex', alignItems: 'center' }}>
                  DataSet
                  <img src={datasetImage} alt="DataSet" style={{ width: '20px', marginLeft: '10px', filter: 'brightness(0) invert(1)' }} />
                  <img src={arrowImage} alt="Arrow" style={{ width: '20px', marginLeft: '20px', filter: 'brightness(0) invert(1)' }} />
                </Link>
                {/* Sub-menu for DataSet */}
                <ul className="dropdown-content">
                  <li>
                    <Link to="/rfmid" style={{ display: 'flex', alignItems: 'center' }}>
                      RFMID
                      <img src={datasetImage} alt="RFMID" style={{ width: '20px', marginLeft: '10px', filter: 'brightness(0) invert(1)' }} />
                    </Link>
                  </li>
                  <li>
                    <Link to="/strave" style={{ display: 'flex', alignItems: 'center' }}>
                      Strave
                      <img src={datasetImage} alt="Strave" style={{ width: '20px', marginLeft: '10px', filter: 'brightness(0) invert(1)' }} />
                    </Link>
                  </li>
                  <li><Link to="/some-other" style={{ display: 'flex', alignItems: 'center' }}>Some Other</Link></li>
                </ul>
              </li>
              <li>
                <Link to="/Login" style={{ display: 'flex', alignItems: 'center' }}>
                  Patient
                  <img src={toolsImage} alt="Anotation" style={{ width: '20px', marginLeft: '10px', filter: 'brightness(0) invert(1)' }} />
                </Link>
              </li>
              <li>
                <Link to="/Search" style={{ display: 'flex', alignItems: 'center' }}>
                  Search
                  <img src={toolsImage} alt="Anotation" style={{ width: '20px', marginLeft: '10px', filter: 'brightness(0) invert(1)' }} />
                </Link>
              </li>
              <li>
                <Link to="/Show" style={{ display: 'flex', alignItems: 'center' }}>
                  Diagnosis
                  <img src={eyeImage} alt="DR" style={{ width: '20px', marginLeft: '10px', filter: 'brightness(0) invert(1)' }} />
                </Link>
              </li>
            </ul>
          </div>

          <div className="content">
            <Routes>
              <Route path="/front" element={<Home />} />
              <Route path="/Team" element={<Team />} />
              <Route path="/rfmid" element={<Rfmid />} />
              <Route path="/DataSet" element={<DataSet />} />
              <Route path="/Anotation" element={<Anotation />} />
              <Route path="/Show" element={<Show />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Search" element={<Search />} />
              <Route path="/DR" element={<HR />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
