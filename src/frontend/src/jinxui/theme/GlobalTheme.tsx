import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

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
    h3: {
      fontWeight: 200,
      fontSize: "3rem"
    }
  },
});

const LightShadowColour = "20, 60, 126"
const DarkShadowColour = "20, 60, 126"
const LightHeaderGrad = "linear-gradient(90deg,#A6C9FF 0%, #99AFFF 100%)"
const DarkHeaderGrad = "linear-gradient(90deg, #00C2FF 0%, #0066FF 100%)"
const LightTitleBGGrad = "linear-gradient(0deg, #BBDEFF 0%, #C1D2FF 100%)"
const DarkTitleBGGrad = "linear-gradient(0deg, #BBDEFF 0%, #C1D2FF 100%)"
const LightPrimaryButtonGrad =
  "linear-gradient(90deg, #48E9FF 0%, #49FFD3 100%)";
const LightPrimaryButtonGradHover =
  "linear-gradient(90deg, #00D1ED 0%, #00EBB2 100%)";
const DarkPrimaryButtonGrad = "linear-gradient(90deg, #00C2FF 0%, #00FFC2 100%)"
const BlueIconGrad = "linear-gradient(225deg, #497CFF 0%, #3DB9FF 100%)";

let LightTheme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: "#5D71BB",
      contrastText: "#EEEEEE",
    },
    secondary: {
      main: "#42f7d5",
    },
    background: {
      default: "#E4ECFF",
      paper: "#F1F7FF",
    },
  },
  typography: {
    fontFamily: "Heebo, sans-serif",
    fontWeightLight: 100,
    fontWeightMedium: 200,
    fontWeightRegular: 300,
    fontWeightBold: 400,
    h3: {
      fontWeight: 200,
    },
    button: {
      textTransform: "none"
    }
  },
  shadows: [
    "none",
    "0px 2px 3px 0px rgba(   " + LightShadowColour +  ", 0.3),0px 4px 5px 0px rgba(   " + LightShadowColour + ", 0.06),0px 2px 1px -1px rgba(" + LightShadowColour + ", 0.04)",
    "0px 2px 5px 0px rgba(   " + LightShadowColour +  ", 0.3),0px 2px 2px 0px rgba(   " + LightShadowColour + ", 0.06),0px 3px 1px -2px rgba(" + LightShadowColour + ", 0.04)",
    "0px 2px 9px 0px rgba(   " + LightShadowColour +  ", 0.3),0px 1px 3px 0px rgba(   " + LightShadowColour + ", 0.06),0px 3px 3px -2px rgba(" + LightShadowColour + ", 0.04)",
    "0px 4px 4px -1px rgba(  " + LightShadowColour +  ", 0.3),0px 0px 5px 0px rgba(   " + LightShadowColour + ", 0.06),0px 1px 10px 0px rgba(" + LightShadowColour + ", 0.04)",
    "0px 6px 6px -1px rgba(  " + LightShadowColour +  ", 0.3),0px -1px 10px 0px rgba( " + LightShadowColour + ", 0.06),0px 1px 14px 0px rgba(" + LightShadowColour + ", 0.04)",
    "0px 6px 6px -1px rgba(  " + LightShadowColour +  ", 0.3),0px -2px 12px 0px rgba( " + LightShadowColour + ", 0.06),0px 1px 18px 0px rgba(" + LightShadowColour + ", 0.04)",
    "0px 7px 6px -2px rgba(  " + LightShadowColour +  ", 0.3),0px -1px 12px 1px rgba( " + LightShadowColour + ", 0.06),0px 2px 16px 1px rgba(" + LightShadowColour + ", 0.04)",
    "0px 10px 6px -3px rgba( " + LightShadowColour +  ", 0.3),0px 0px 12px 1px rgba(  " + LightShadowColour + ", 0.06),0px 3px 14px 2px rgba(" + LightShadowColour + ", 0.04)",
    "0px 10px 7px -3px rgba( " + LightShadowColour +  ", 0.3),0px 1px 14px 1px rgba(  " + LightShadowColour + ", 0.06),0px 3px 16px 2px rgba(" + LightShadowColour + ", 0.04)",
    "0px 11px 7px -3px rgba( " + LightShadowColour +  ", 0.3),0px 2px 16px 1px rgba(  " + LightShadowColour + ", 0.06),0px 4px 18px 3px rgba(" + LightShadowColour + ", 0.04)",
    "0px 11px 8px -4px rgba( " + LightShadowColour +  ", 0.3),0px 3px 17px 1px rgba(  " + LightShadowColour + ", 0.06),0px 4px 20px 3px rgba(" + LightShadowColour + ", 0.04)",
    "0px 13px 9px -4px rgba( " + LightShadowColour +  ", 0.3),0px 4px 19px 2px rgba(  " + LightShadowColour + ", 0.06),0px 5px 22px 4px rgba(" + LightShadowColour + ", 0.04)",
    "0px 13px 9px -4px rgba( " + LightShadowColour +  ", 0.3),0px 5px 21px 2px rgba(  " + LightShadowColour + ", 0.06),0px 5px 24px 4px rgba(" + LightShadowColour + ", 0.04)",
    "0px 13px 10px -4px rgba(" + LightShadowColour +  ", 0.3),0px 6px 23px 2px rgba(  " + LightShadowColour + ", 0.06),0px 5px 26px 4px rgba(" + LightShadowColour + ", 0.04)",
    "0px 15px 10px -5px rgba(" + LightShadowColour +  ", 0.3),0px 7px 24px 2px rgba(  " + LightShadowColour + ", 0.06),0px 6px 28px 5px rgba(" + LightShadowColour + ", 0.04)",
    "0px 15px 12px -5px rgba(" + LightShadowColour +  ", 0.3),0px 8px 26px 2px rgba(  " + LightShadowColour + ", 0.06),0px 6px 30px 5px rgba(" + LightShadowColour + ", 0.04)",
    "0px 15px 13px -5px rgba(" + LightShadowColour +  ", 0.3),0px 9px 28px 2px rgba(  " + LightShadowColour + ", 0.06),0px 6px 32px 5px rgba(" + LightShadowColour + ", 0.04)",
    "0px 17px 13px -5px rgba(" + LightShadowColour +  ", 0.3),0px 10px 30px 2px rgba( " + LightShadowColour + ", 0.06),0px 7px 34px 6px rgba(" + LightShadowColour + ", 0.04)",
    "0px 17px 14px -6px rgba(" + LightShadowColour +  ", 0.3),0px 11px 31px 2px rgba( " + LightShadowColour + ", 0.06),0px 7px 36px 6px rgba(" + LightShadowColour + ", 0.04)",
    "0px 19px 15px -6px rgba(" + LightShadowColour +  ", 0.3),0px 12px 33px 3px rgba( " + LightShadowColour + ", 0.06),0px 8px 38px 7px rgba(" + LightShadowColour + ", 0.04)",
    "0px 19px 15px -6px rgba(" + LightShadowColour +  ", 0.3),0px 13px 35px 3px rgba( " + LightShadowColour + ", 0.06),0px 8px 40px 7px rgba(" + LightShadowColour + ", 0.04)",
    "0px 19px 16px -6px rgba(" + LightShadowColour +  ", 0.3),0px 14px 37px 3px rgba( " + LightShadowColour + ", 0.06),0px 8px 42px 7px rgba(" + LightShadowColour + ", 0.04)",
    "0px 20px 16px -7px rgba(" + LightShadowColour +  " 0.3),0px 15px 38px 3px rgba( " +  LightShadowColour + " 0.06),0px 9px 44px 8px rgba(" + LightShadowColour + " 0.04)",
    "0px 20px 18px -7px rgba(" + LightShadowColour +  " 0.3),0px 16px 40px 3px rgba( " +  LightShadowColour + " 0.06),0px 9px 46px 8px rgba(" + LightShadowColour + " 0.04)",
  ],
  shape: {
    borderRadius: 0
  }
});

LightTheme = responsiveFontSizes(LightTheme);


export {
  LightTheme,
  DarkTheme,
  LightShadowColour,
  DarkShadowColour,
  LightHeaderGrad,
  DarkHeaderGrad,
  LightTitleBGGrad,
  DarkTitleBGGrad,
  LightPrimaryButtonGrad,
  LightPrimaryButtonGradHover,
  DarkPrimaryButtonGrad,
  BlueIconGrad,
}