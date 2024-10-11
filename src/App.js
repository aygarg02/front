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
import Rfmid from './Application/Rfmid'
import { useSelector } from "react-redux"; // Import useSelector
function App() {
  const { isLoggedIn, patientId, name, email } = useSelector((state) => state.auth);
  return (

    <div className="App">
      <Router>
      <div className='parent'>
      
        <div className="sidebar">
          {(isLoggedIn)&&(<div style={{display : 'flex'}}>
            <img src="reti.JPG" alt="Home" style={{ width: '30px', marginLeft: '10px'}} />
        <b style={{ width: '30px', marginLeft: '15px', filter: 'brightness(0) invert(1)' }} >{ name }</b>
        </div>
        )}

      

          <ul>
            <li>
              <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
                Home
                <img src="home.png" alt="Home" style={{ width: '20px', marginLeft: '10px', filter: 'brightness(0) invert(1)' }} />
              </Link>
            </li>
            <li>
              <Link to="/Team" style={{ display: 'flex', alignItems: 'center' }}>
                Team
                <img src="people.png" alt="Team" style={{ width: '20px', marginLeft: '10px', filter: 'brightness(0) invert(1)' }} />
              </Link>
            </li>
            <li className="dataset-dropdown">
              <Link to="/DataSet" style={{ display: 'flex', alignItems: 'center' }}>
                DataSet
                <img src="dataset (1).png" alt="DataSet" style={{ width: '20px', marginLeft: '10px', filter: 'brightness(0) invert(1)' }} />
                <img src="arrow-right (1).png" alt="DataSet" style={{ width: '20px', marginLeft: '20px', filter: 'brightness(0) invert(1)' }} />
              </Link>
              {/* Sub-menu for DataSet */}
              <ul className="dropdown-content">
                <li><Link to="/rfmid"  style={{ display: 'flex', alignItems: 'center' }}>RFMID<img src="dataset (1).png" alt="DataSet" style={{ width: '20px', marginLeft: '10px', filter: 'brightness(0) invert(1)' }} /></Link></li>
                <li><Link to="/strave"  style={{ display: 'flex', alignItems: 'center' }}>Strave<img src="dataset (1).png" alt="DataSet" style={{ width: '20px', marginLeft: '10px', filter: 'brightness(0) invert(1)' }} /></Link></li>
                <li><Link to="/some-other"  style={{ display: 'flex', alignItems: 'center' }}>Some Other</Link></li>
              </ul>
            </li>
            <li>
              <Link to="/Login" style={{ display: 'flex', alignItems: 'center' }}>
                Patient
                <img src="tools.png" alt="Anotation" style={{ width: '20px', marginLeft: '10px', filter: 'brightness(0) invert(1)' }} />
              </Link>
            </li>
            <li>
              <Link to="/Search" style={{ display: 'flex', alignItems: 'center' }}>
                Search
                <img src="tools.png" alt="Anotation" style={{ width: '20px', marginLeft: '10px', filter: 'brightness(0) invert(1)' }} />
              </Link>
            </li>
            <li>
              <Link to="/Show" style={{ display: 'flex', alignItems: 'center' }}>
                Diagnosis
                <img src="eye (1).png" alt="DR" style={{ width: '20px', marginLeft: '10px', filter: 'brightness(0) invert(1)' }} />
              </Link>
            </li>
         
          </ul>
        </div>

        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
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
