"use client"
import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';

const CustomToaster = () => {
  const [prefersDarkMode, setPrefersDarkMode] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setPrefersDarkMode(mediaQuery.matches);
    const handleChange = (event:any) => setPrefersDarkMode(event.matches);
    mediaQuery.addEventListener('change', handleChange);

    // Clean up the event listener on component unmount
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        duration: 1000,
        style: prefersDarkMode
          ? {
              background: "white",
              color: "black",
            }
          : {
              background: "black",
              color: "white",
            },
        success: {
          iconTheme: prefersDarkMode
            ? {
                primary: "black",
                secondary: "white",
              }
            : {
                primary: "white",
                secondary: "black",
              },
        },
      }}
    />
  );
};

export default CustomToaster;
