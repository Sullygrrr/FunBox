import { useState, useEffect } from 'react';
import { Theme, THEMES } from '../types/theme';

export function useTheme(): Theme {
  const [theme, setTheme] = useState<Theme>(() => {
    // Get a random theme on initial load
    return THEMES[Math.floor(Math.random() * THEMES.length)];
  });

  useEffect(() => {
    // Change theme every time the app is opened/refreshed
    const newTheme = THEMES[Math.floor(Math.random() * THEMES.length)];
    setTheme(newTheme);
  }, []);

  return theme;
}