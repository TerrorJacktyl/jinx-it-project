import { createMuiTheme, createStyles } from "@material-ui/core/styles";

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
    // "fontWeight": 200,
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
    // fontWeight: "light",
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