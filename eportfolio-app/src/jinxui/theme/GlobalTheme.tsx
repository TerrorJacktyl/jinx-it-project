import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const DarkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#0081CA",
    },
    secondary: {
      main: "#00FFC2",
    },
    background: {
      default: "#27292b",
      paper: "#373a3e",
    },
  },
  typography: {
    fontFamily: "Heebo, sans-serif",
    fontWeightLight: 100,
    fontWeightMedium: 200,
    fontWeightRegular: 300,
    fontWeightBold: 400,
  },
  overrides: {
    MuiInputLabel: {
      root: {
        fontSize: 25,
      },
    },
  },
});

const LightTheme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: "#0081CA",
    },
    secondary: {
      main: "#00FFC2",
    },
    background: {
      default: "#d1dbec",
      paper: "#e5e7ec",
    },
  },
  typography: {
    fontFamily: "Heebo, sans-serif",
    fontWeightLight: 100,
    fontWeightMedium: 200,
    fontWeightRegular: 300,
    fontWeightBold: 400,
  },
  overrides: {
    MuiInputLabel: {
      root: {
        fontSize: 25,
      },
    },
  },
});


export {
  LightTheme, 
  DarkTheme
}