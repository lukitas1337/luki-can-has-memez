import './index.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Pages/Home';
import Gallery from './Pages/Gallery';
import { useContext } from 'react'; 
import { ThemeContext } from './context/ThemeContext';  


function App() {

const { theme, changeTheme } = useContext(ThemeContext);  // Access theme and changeTheme


  return (
<Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/ma-mima-memez">Gallery</Link>
          </li>
        </ul>
      </nav>

      <select value={theme} onChange={(e) => changeTheme(e.target.value)} className="select select-bordered w-full max-w-xs">
          <option value="acid">ACID</option>
          <option value="dark">DARK</option>
          <option value="light">LIGHT</option>
        </select>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ma-mima-memez" element={<Gallery />} />
      </Routes>
    </Router>
  )
}

export default App
