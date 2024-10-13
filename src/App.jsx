import './index.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Pages/Home';
import Gallery from './Pages/Gallery';
import { useContext } from 'react'; 
import { ThemeContext } from './context/ThemeContext';  
import Navbar from './Components/Navbar';


function App() {

const { theme, changeTheme } = useContext(ThemeContext);  // Access theme and changeTheme


  return (
    <>
    <Router>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ma-mema-needs-memez" element={<Gallery />} />
      </Routes>
    </Router>



    </>
  )
}

export default App
