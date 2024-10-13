import { useContext, useRef, useEffect, useState } from 'react';
import { MemeContext } from '../context/MemeContext';
import domtoimage from 'dom-to-image';
import Draggable from 'react-draggable'; // Import Draggable

const Home = () => {
  const { state, dispatch } = useContext(MemeContext);
  const myImage = useRef(null);

  // State for uploaded image
  const [customImage, setCustomImage] = useState(null);

  // State for text positions
  const [topTextPos, setTopTextPos] = useState({ x: 0, y: 0 });
  const [bottomTextPos, setBottomTextPos] = useState({ x: 0, y: 0 });

  // Load the last meme from local storage or fetch a new one on first visit
  useEffect(() => {
    const savedMeme = JSON.parse(localStorage.getItem('lastMeme'));
    if (savedMeme) {
      dispatch({ type: 'SET_MEME', payload: savedMeme });
      setTopTextPos(savedMeme.topTextPos || { x: 0, y: 0 });
      setBottomTextPos(savedMeme.bottomTextPos || { x: 0, y: 0 });
    } else {
      handleRandom(); // Automatically fetch a meme if it's the first visit
    }
  }, [dispatch]);

  // Random meme fetch function
  const handleRandom = () => {
    const randomIndex = Math.floor(Math.random() * state.images.length);
    const randomMeme = state.images[randomIndex];
    dispatch({ type: 'SET_MEME', payload: randomMeme });

    // Save the meme to local storage
    localStorage.setItem('lastMeme', JSON.stringify(randomMeme));
    setCustomImage(null); // Reset custom image when fetching a random one
  };

  // Handle text change
  const handleTextChange = (e) => {
    if (e.target.name === 'topText') {
      dispatch({ type: 'SET_TOP_TEXT', payload: e.target.value });
    } else {
      dispatch({ type: 'SET_BOTTOM_TEXT', payload: e.target.value });
    }
  };

  // Handle image upload
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCustomImage(imageUrl); // Set uploaded image as customImage
    }
  };

  // Save meme to localStorage with positions
  const saveMeme = () => {
    domtoimage.toJpeg(myImage.current, { quality: 0.95 }).then((dataUrl) => {
      const memeData = {
        base64: dataUrl,
        topText: state.topText,
        bottomText: state.bottomText,
        name: customImage ? 'Custom Image' : state.currentMeme.name, // Save custom image name if uploaded
        date: new Date().toLocaleDateString(),
        topTextPos,  // Store topText position
        bottomTextPos,  // Store bottomText position
        timestamp: new Date().getTime()
      };
      dispatch({ type: 'SAVE_MEME', payload: memeData });
    });
  };

  // Handlers for drag positions
  const handleTopTextDrag = (e, data) => {
    setTopTextPos({ x: data.x, y: data.y });
  };

  const handleBottomTextDrag = (e, data) => {
    setBottomTextPos({ x: data.x, y: data.y });
  };

  return (
    <div className="home">
      <input
        type="text"
        name="topText"
        value={state.topText}
        onChange={handleTextChange}
        placeholder="Top text"
      />
      <input
        type="text"
        name="bottomText"
        value={state.bottomText}
        onChange={handleTextChange}
        placeholder="Bottom text"
      />
      <button onClick={handleRandom}>Random Meme</button>

      {/* File input for uploading image */}
      <input type="file" accept="image/*" onChange={handleUpload} />

      <div ref={myImage} style={{ position: 'relative' }}>
        {customImage ? (
          <img src={customImage} alt="Uploaded Custom Meme" />
        ) : (
          state.currentMeme && <img src={state.currentMeme.url} alt="Current Meme" />
        )}
        
        {/* Draggable topText */}
        <Draggable
          position={topTextPos}
          onDrag={handleTopTextDrag}
        >
          <p
            className="top"
            style={{
              position: 'absolute',
              top: topTextPos.y,
              left: topTextPos.x,
              color: 'white',
              fontSize: '24px',
              fontWeight: 'bold'
            }}
          >
            {state.topText}
          </p>
        </Draggable>

        {/* Draggable bottomText */}
        <Draggable
          position={bottomTextPos}
          onDrag={handleBottomTextDrag}
        >
          <p
            className="bottom"
            style={{
              position: 'absolute',
              top: bottomTextPos.y,
              left: bottomTextPos.x,
              color: 'white',
              fontSize: '24px',
              fontWeight: 'bold'
            }}
          >
            {state.bottomText}
          </p>
        </Draggable>
      </div>

      <button onClick={saveMeme}>Save Meme</button>
    </div>
  );
};

export default Home;
