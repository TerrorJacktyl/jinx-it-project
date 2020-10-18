import React from "react";
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

const createTheme = (theme: any) => responsiveFontSizes(createMuiTheme(theme));

/**
 * Theme creation guide
 * 1. Pick a nice primary and secondary colour: https://material.io/resources/color/
 * 2. Create a theme object (i.e. like MagmaTheme) and type in the colours you chose as the main for 
 *    both the primary and secondary fields.
 * 3. Decide whether you want to use the light or dark colours from your theme. Set this as the 
 *    `type` field in your palette.
 * 4. Pick a nice font if you want, and link it into frontend/public/index.html. https://fonts.google.com
 * 5. Run your theme object through `createTheme` and export it.
 * 6. Start using it. Mui will generate a theme using a dark or light variant (depending on the 
 *    theme type you chose) for the portfolio backgrounds, and will automatically calculate the 
 *    contrast text colour.
 * Happy theming!
 */

export const MagmaTheme: Theme = createTheme({
    palette: {
        type: "dark",
        primary: {
            "main": "#b71c1c",
        },
        secondary: {
            "main": "#4e342e",
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
    },
    portfolio: {
        headerBackground: {
            src: 'https://images.unsplash.com/photo-1561211950-8b1eb6114d6a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
        }
    }
})