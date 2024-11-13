import { useState, useEffect } from 'react';

const POPUP_INTERVAL = 45 * 60 * 1000; // 45 minutes in milliseconds
const LAST_POPUP_KEY = 'lastSafetyPopupTime';

export function useSafetyPopup() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const lastPopupTime = localStorage.getItem(LAST_POPUP_KEY);
    const currentTime = new Date().getTime();

    if (!lastPopupTime || currentTime - parseInt(lastPopupTime) >= POPUP_INTERVAL) {
      // Show popup with 33% chance
      if (Math.random() < 0.33) {
        setShowPopup(true);
        localStorage.setItem(LAST_POPUP_KEY, currentTime.toString());
      }
    }
  }, []);

  const closePopup = () => {
    setShowPopup(false);
  };

  return { showPopup, closePopup };
}