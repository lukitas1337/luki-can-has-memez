import { createContext, useState, useEffect } from 'react';

// Create the ThemeContext
export const ThemeContext = createContext();

// ThemeProvider component to wrap your app and manage theme state
export const ThemeProvider = ({ children }) => {
  // Initialize theme from localStorage or default to 'acid'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'acid'; // Load from localStorage, or default to 'acid'
  });

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme); // Update the HTML attribute
    localStorage.setItem('theme', newTheme); // Store the theme in localStorage
  };

  // On component mount, apply the theme from localStorage (or default)
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme); // Update the state to the stored theme on mount
      document.documentElement.setAttribute('data-theme', savedTheme); // Apply the saved theme to the HTML element
    }
  }, []); // This runs only on the initial render

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};