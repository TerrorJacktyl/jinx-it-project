import React from "react";
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

export const MagmaTheme: Theme = createMuiTheme({
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
    }
})