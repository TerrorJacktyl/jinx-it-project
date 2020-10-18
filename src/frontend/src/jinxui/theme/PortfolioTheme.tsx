import React from "react";
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

const createTheme = (theme: any) => responsiveFontSizes(createMuiTheme(theme));

export const MagmaTheme: Theme = createTheme({
    palette: {
        type: "dark",
        primary: {
            "main": "#b71c1c",
            "contrastText": "#000"
        },
        secondary: {
            "main": "#373538",
            "contrastText": "#fff"
        },
    },
    typography: {
        h1: {
            "fontFamily": "Kaushan Script"
        },
        h2: {
            "fontFamily": "Kaushan Script"
        },
        h3: {
            "fontFamily": "Kaushan Script"
        },
        h5: {
            "fontFamily": "open sans"
        }
    }
})