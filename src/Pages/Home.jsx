import { useContext, useRef } from 'react';
import { MemeContext } from '../context/MemeContext';
import domtoimage from 'dom-to-image';

const Home = () => {
  const { state, dispatch } = useContext(MemeContext);
  const myImage = useRef(null);

  const handleRandom = () => {
    const randomIndex = Math.floor(Math.random() * state.images.length);
    dispatch({ type: 'SET_MEME', payload: state.images[randomIndex] });
  };

  const handleTextChange = (e) => {
    if (e.target.name === 'topText') {
      dispatch({ type: 'SET_TOP_TEXT', payload: e.target.value });
    } else {
      dispatch({ type: 'SET_BOTTOM_TEXT', payload: e.target.value });
    }
  };

  const saveMeme = () => {
    domtoimage.toJpeg(myImage.current, { quality: 0.95 }).then((dataUrl) => {
      const memeData = {
        url: dataUrl,
        topText: state.topText,
        bottomText: state.bottomText,
        name: state.currentMeme.name
      };
      dispatch({ type: 'SAVE_MEME', payload: memeData });
    });
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
      <div ref={myImage}>
        {state.currentMeme && (
          <img src={state.currentMeme.url} alt="Current Meme" />
        )}
        <p>{state.topText}</p>
        <p>{state.bottomText}</p>
      </div>
      <button onClick={saveMeme}>Save Meme</button>
    </div>
  );
};

export default Home;
