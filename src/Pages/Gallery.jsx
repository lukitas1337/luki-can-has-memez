import { useContext } from 'react';
import { MemeContext } from '../context/MemeContext';

const Gallery = () => {
  const { state } = useContext(MemeContext);

  return (
    <div className="gallery">
      <h1>Saved Memes</h1>
      {state.savedMemes.length ? (
        state.savedMemes.map((meme, index) => (
          <div key={index} className="meme">
            <img src={meme.url} alt={meme.name} />
            <p>{meme.topText}</p>
            <p>{meme.bottomText}</p>
          </div>
        ))
      ) : (
        <p>No saved memes yet.</p>
      )}
    </div>
  );
};

export default Gallery;