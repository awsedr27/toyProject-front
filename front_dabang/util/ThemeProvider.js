"use client"
import { BorderColor } from "@mui/icons-material";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme, alpha, getContrastRatio, darken, desaturate } from '@mui/material/styles';

export default function MyThemeProvider({ children }) {
    const violetBase = '#7F00FF';
    const yellowBase = '#eeff00';
    
    
    const violetMain = alpha(violetBase, 0.7);

    const myTheme = createTheme({
    palette: {
        primary: {
            main: violetMain,
            light: alpha(violetBase, 0.5),
            dark: darken(violetBase, 0.3),
            contrastText: getContrastRatio(violetMain, '#fff') > 4.5 ? '#fff' : '#111',
        },
        secondary :{
            main: alpha(yellowBase, 0.8), 
            light: alpha(yellowBase, 0.6),
            dark: alpha(yellowBase, 0.95),
            contrastText: getContrastRatio(alpha(yellowBase, 0.8), '#fff') > 4.5 ? '#fff' : '#111',
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
    MuiBox: {
      styleOverrides: {
        root: {
          padding: '20px',
          margin: '20px',
          backgroundColor: 'white',
          textAlign: 'center',
          borderRadius: '20px',
          border: '1px solid',
          borderColor: violetMain,
        },
      },
    },
  },
});
    return (
        <>
            <ThemeProvider theme={myTheme}>
                {children}
            </ThemeProvider>
        </>
    )
}
