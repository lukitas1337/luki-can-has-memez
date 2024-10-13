import './index.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Pages/Home';
import Gallery from './Pages/Gallery';
import Navbar from './Components/Navbar';


function App() {


  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ma-mema-needs-memez" element={<Gallery />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
