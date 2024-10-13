import { createContext, useState , useEffect} from 'react';

// Create the ThemeContext
export const ThemeContext = createContext();

// ThemeProvider component to wrap your app and manage theme state
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('acid'); // Default theme

const changeTheme = (newTheme) => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme); // Update the HTML attribute
};

useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme); // Set the initial theme
  }, [theme]);

return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
    {children}
    </ThemeContext.Provider>
);
};