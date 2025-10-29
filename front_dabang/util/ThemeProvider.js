"use client"
import React, { useEffect, useState } from 'react';
import { ThemeProvider } from "@mui/material/styles";
import { createTheme, alpha, getContrastRatio } from '@mui/material/styles';
import { useTheme } from '../src/context/ThemeContext';

export default function MyThemeProvider({ children }) {
  const [theme, setTheme] = useState(null);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const root = document.documentElement;

    const primaryLightColor = getComputedStyle(root).getPropertyValue('--primary-light-color').trim();
    const primaryDarkColor = getComputedStyle(root).getPropertyValue('--primary-dark-color').trim();
    const secondaryColor = getComputedStyle(root).getPropertyValue('--secondary-color').trim();
    const secondaryLightColor = getComputedStyle(root).getPropertyValue('--secondary-light-color').trim();
    const secondaryDarkColor = getComputedStyle(root).getPropertyValue('--secondary-dark-color').trim();

    const violetBase = '#7F00FF';
    const yellowBase = '#eeff00';
    const violetMain = alpha(violetBase, 0.7);

    const myTheme = createTheme({
      palette: {
        mode: isDarkMode ? 'dark' : 'light',
        primary: {
          main: violetMain,
          light: primaryLightColor,
          dark: primaryDarkColor,
          contrastText: getContrastRatio(violetMain, '#fff') > 4.5 ? '#fff' : '#111',
        },
        secondary: {
          main: secondaryColor,
          light: secondaryLightColor,
          dark: secondaryDarkColor,
          contrastText: getContrastRatio(alpha(yellowBase, 0.8), '#fff') > 4.5 ? '#fff' : '#111',
        },
        background: {
          default: isDarkMode ? '#1a1a1a' : '#ffffff',
          paper: isDarkMode ? '#2d2d2d' : '#ffffff',
        },
        text: {
          primary: isDarkMode ? '#ffffff' : '#000000',
          secondary: isDarkMode ? '#b3b3b3' : '#666666',
        }
      },
      components: {
          MuiButton: {
            styleOverrides: {
              contained: ({ ownerState, theme }) => ({
                backgroundColor: theme.palette[ownerState.color || 'primary'].main,
                color: theme.palette[ownerState.color || 'primary'].contrastText,

                '&:hover': {
                  backgroundColor: theme.palette[ownerState.color || 'primary'].dark, 
                },
              }),
            },
          },
          MuiStack: {
            defaultProps: {
              spacing: 0, 
              direction: 'column',
              alignItems: 'center'
            },
            styleOverrides: {
              root: ({ theme }) => ({
                padding: '5px', 
              }),
            },
          },
          MuiBox: {
            styleOverrides: {
              root: {
                padding: '20px',
                margin: '20px',
                backgroundColor: isDarkMode ? '#2d2d2d' : 'white',
                textAlign: 'center',
                borderRadius: '20px',
                border: '1px solid',
                borderColor: violetMain,
              },
            },
          },
          MuiFormLabel: {
            styleOverrides: {
              root: {
                textAlign: 'left', 
                display: 'flex', 
                alignItems: 'center', 
                marginTop: '8px',
                marginBottom: '1px', // 예시: 라벨과 인풋 필드 사이 간격
              },
            },
          },
      },
    });

    setTheme(myTheme);
  }, [isDarkMode]); 
  if (!theme) {
    return null; 
  }

  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
}