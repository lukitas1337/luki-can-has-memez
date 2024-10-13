import { useContext, useEffect, useState } from 'react';
import { MemeContext } from '../context/MemeContext';

const Gallery = () => {
  const { state } = useContext(MemeContext);
  const [timeRemaining, setTimeRemaining] = useState({});

  const ONE_WEEK_IN_MS = 7 * 24 * 60 * 60 * 1000; // One week in milliseconds

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const newTimeRemaining = {};

      state.savedMemes.forEach((meme, index) => {
        const memeAge = now - meme.timestamp;
        const timeLeft = ONE_WEEK_IN_MS - memeAge;

        if (timeLeft > 0) {
          const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
          const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

          newTimeRemaining[index] = {
            days,
            hours,
            minutes,
            seconds
          };
        } else {
          newTimeRemaining[index] = { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
      });

      setTimeRemaining(newTimeRemaining);
    };

    // Update countdown every second
    const intervalId = setInterval(updateCountdown, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [state.savedMemes]);

  // Function to download the meme image
  const downloadMeme = (meme) => {
    const link = document.createElement('a');
    link.href = meme.base64; // Use the Base64 image data
    link.download = `${meme.name}.jpeg`; // Name of the file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="gallery">
      <h1>Saved Memes</h1>
      {state.savedMemes.length ? (
        state.savedMemes.map((meme, index) => (
          <div key={index} className="meme">
            <img src={meme.base64} alt={meme.name} />
            <p>{meme.topText}</p>
            <p>{meme.bottomText}</p>
            <p>Created on: {meme.date}</p>
            <p>
              THIS MEME IS DOOMED IN:{" "}
              {timeRemaining[index] ? (
                <>
                  {timeRemaining[index].days} DAYS /{" "}
                  {timeRemaining[index].hours} HOURS /{" "}
                  {timeRemaining[index].minutes} MINUTES /{" "}
                  {timeRemaining[index].seconds} SECONDS
                </>
              ) : (
                "EXPIRED"
              )}
            </p>
            {/* Download Button */}
            <button onClick={() => downloadMeme(meme)}>Download Meme</button>
          </div>
        ))
      ) : (
        <p>No saved memes yet.</p>
      )}
    </div>
  );
};

export default Gallery;
