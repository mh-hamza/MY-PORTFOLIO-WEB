import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a ThemeContext
const ThemeContext = createContext();

// ThemeProvider to manage the light/dark mode
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Check system preference or localStorage
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    // Update the document class for Tailwind's dark mode
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Save theme preference in localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the ThemeContext
export const useTheme = () => useContext(ThemeContext);
