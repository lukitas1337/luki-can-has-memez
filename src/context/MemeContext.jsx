import { createContext, useReducer, useEffect } from 'react';

export const MemeContext = createContext();

const initialState = {
  images: [],
  savedMemes: JSON.parse(localStorage.getItem('savedMemes')) || [],
  currentMeme: null,
  topText: '',
  bottomText: ''
};

const memeReducer = (state, action) => {
  switch (action.type) {
    case 'SET_IMAGES':
      return { ...state, images: action.payload };
    case 'SET_MEME':
      return { ...state, currentMeme: action.payload };
    case 'SET_TOP_TEXT':
      return { ...state, topText: action.payload };
    case 'SET_BOTTOM_TEXT':
      return { ...state, bottomText: action.payload };
    case 'SAVE_MEME':
      const newSavedMemes = [...state.savedMemes, action.payload];
      localStorage.setItem('savedMemes', JSON.stringify(newSavedMemes));
      return { ...state, savedMemes: newSavedMemes };
    default:
      return state;
  }
};

export const MemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(memeReducer, initialState);

  useEffect(() => {
    // Fetch images from API
    fetch('https://api.imgflip.com/get_memes')
      .then(res => res.json())
      .then(data => dispatch({ type: 'SET_IMAGES', payload: data.data.memes }));
  }, []);

  return (
    <MemeContext.Provider value={{ state, dispatch }}>
      {children}
    </MemeContext.Provider>
  );
};
