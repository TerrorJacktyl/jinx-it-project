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

import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import BackgroundColor from "./ThemeColors";


const createTheme = (theme: any) => responsiveFontSizes(createMuiTheme(theme));

const loading: Theme = createTheme({
    portfolio: {
        theme: {
            name: "Loading"
        },
        headerBackground: {
            src: 'https://media1.giphy.com/media/ycfHiJV6WZnQDFjSWH/giphy.gif'
        },
    }
})

const magma: Theme = createTheme({
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
        theme: {
            name: "Magma",
        },
        headerBackground: {
            src: 'https://images.unsplash.com/photo-1556139954-ec19cce61d61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
        },
    },
});

const sunset: Theme = createTheme({
    palette: {
        type: "light",
        primary: {
            "main": "#ff8a65",
        },
        secondary: {
            "main": "#ffff8d",
        },
    },
    portfolio: {
        theme: {
            name: "Sunset",
        },
        headerBackground: {
            src: 'https://images.unsplash.com/photo-1536890274788-51861e124205?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
        }
    },

});

const lilypad: Theme = createTheme({
    palette: {
        type: "light",
        primary: {
            "main": "#7da7a3",
        },
        secondary: {
            "main": "#7fa56a",
        },
    },
    portfolio: {
        theme: {
            name: "Lily Pad",
        },
        headerBackground: {
            src: 'https://images.unsplash.com/photo-1542478080-8c03409bbf22?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1265&q=80',
        }
    },
});

const autumn: Theme = createTheme({
    palette: {
        type: "light",
        primary: {
            "main": "#76767e",
        },
        secondary: {
            "main": "#724637",
        },
    },
    portfolio: {
        theme: {
            name: "Autumn",
        },
        headerBackground: {
            src: 'https://images.unsplash.com/photo-1509838174235-432f709c7bfd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
        }
    },
});

const cityscape: Theme = createTheme({
    palette: {
        type: "light",
        primary: {
            "main": "#1D1717",
        },
        secondary: {
            "main": "#BA8458",
        },
    },
    portfolio: {
        theme: {
            name: "Cityscape",
        },
        headerBackground: {
            src: 'https://images.unsplash.com/photo-1519010470956-6d877008eaa4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=935&q=80',
        }
    },
});

const presentation: Theme = createTheme({
    palette: {
        type: "light",
        primary: {
            "main": "#acb6e5",
        },
        secondary: {
            "main": "#86fde8",
        },
    },
    typography: {
        h1: {
            "fontFamily": "Computer Modern Bright"
        },
        h2: {
            "fontFamily": "Computer Modern Sans"
        },
        h3: {
            "fontFamily": "Computer Modern Sans"
        },
        h5: {
            "fontFamily": "Computer Modern Sans"
        }
    },
    portfolio: {
        theme: {
            name: "Presentation",
        },
        headerBackground: {
            src: 'https://images.unsplash.com/photo-1556139954-ec19cce61d61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
        },
        section: {
            colors: BackgroundColor.gradient,
            css: {
                minHeight: '100vh'
            }
        }
    }
});

const rainbow: Theme = createTheme({
    portfolio: {
        theme: {
            name: "Rainbow",
        },
        headerBackground: {
            src: 'https://images.unsplash.com/photo-1556139954-ec19cce61d61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
        },
        section: {
            colors: BackgroundColor.rainbowPastel,
        }
    }
});




// Register your theme in here - this is the object you'll access it from
const PortfolioThemes = {
    loading: loading,
    magma: magma,
    sunset: sunset,
    lilypad: lilypad,
    autumn: autumn,
    cityscape: cityscape,
    presentation: presentation,
    rainbow: rainbow,
}

export default PortfolioThemes;