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
            "fontFamily": "Computer Modern Serif"
        },
        h3: {
            "fontFamily": "Computer Modern Serif"
        },
        h5: {
            "fontFamily": "Computer Modern Serif"
        }
    },
    portfolio: {
        theme: {
            name: "Presentation",
        },
        headerBackground: {
            src: 'https://i.imgur.com/V2aY72s.png',
        },
        section: {
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
            src: 'https://images.unsplash.com/photo-1529912626516-e58b23f44f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
        },
        section: {
            colors: BackgroundColor.rainbowStep,
        }
    }
});

const rainbowSmooth: Theme = createTheme({
    portfolio: {
        theme: {
            name: "Rainbow smooth",
        },
        headerBackground: {
            src: 'https://images.unsplash.com/photo-1529912626516-e58b23f44f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
        },
        section: {
            colors: BackgroundColor.rainbowGradient,
        }
    }
});

const arch: Theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 700,    // One column / two column breakpoint
            md: 1100,   // Section width
            lg: 1280,
            xl: 1920,
        }
    },
    palette:{
        common: {
            black: "#4F4F4F",
            white: "#F6F1F1",
        },
        primary: {
            main: "#748598",
        },
        secondary: {
            main: "#B7A0B2",
        },
        text: {
            primary: "#748598",
        },
        background: {
            paper: "#F0E8EB",
            default: "#F6F1F1",
        }
    },
    typography: {
        fontFamily: "Rubik, sans-serif",
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 600,
        h1: { // Heading Main title
            fontWeight: 400,
            fontSize: "4rem",
        },
        h2: { // Section titles
            fontWeight: 300,
            fontSize: "3.2rem",
            lineHeight: 1.5,
        },
        h3: { // Heading secondary title
            fontWeight: 300,
            fontSize: "2rem",
        },
        body1: { // Section content text
            fontWeight: 300,
            fontSize: "1.3rem",
        }
    },
    portfolio: {
        theme: {
            name: "Arch",
        },
        headerBackground: {
            src: require("images/backgrounds/arch.jpg"),
            overlayColor: "255, 255, 255, 0.65",
            maxHeight: "700px",
        },
        header: {
            verticalAlign: "flex-end",
            horizontalAlign: "flex-start",
            textAlign: "left",
            marginBottom: "10%"
        },
        section: {
            titleGap: 50,
            sectionGap: "9em",
            spacing: 7,
        }
    }
})

const mountains: Theme = createTheme({
    palette: {
        type: "dark",
        secondary: {
            main: "#FFB800"
        },
        background: {
            paper: "#262330",
            default: "#191722",
        },
    },
    typography: {
        fontFamily: "Poppins, sans-serif",
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 600,
        fontWeightBold: 700,
        h1: {
            fontWeight: 700,
            fontSize: "4rem",
        },
        h2: {
            fontWeight: 600,
            fontSize: "1.7rem",
        },
        h3: {
            fontWeight: 600,
            fontSize: "1.8rem",
            letterSpacing: "0.2rem"
        },
        body1: {
            fontSize: "1.1rem",
            fontWeight: 300,
            letterSpacing: "0.15rem",
            lineHeight: 1.7,
        }
    },
    portfolio: {
        theme: {
            name: "Mountains",
        },
        headerBackground: {
            src: require("images/backgrounds/mountains_03.jpg"),
            maxHeight: "800px",
            overlayColor: "48, 41, 77, 0.41",
        },
        header: {
            verticalAlign: "center",
            horizontalAlign: "center",
            textAlign: "center",
        },
        section: {
            titleGap: 20,
            spacing: 7,
            border: "first",
            borderPadding: "60px", // Not quite workin yet 
        }
    },
});

const wave: Theme = createTheme({
    palette: {
        secondary: {
            main: "#424E88",
        },
        background: {
            paper: "#424E88",
        },
    },
    typography: {
        h1: {
            fontFamily: 'Work Sans, sans-serif',
            fontWeight: 700,
        },
    },
    shape: {
        borderRadius: 0,
    },
    portfolio: {
        theme: {
            name: "Wave"
        },
        headerBackground: {
            src: require("images/backgrounds/wave_01.svg"),
            maxHeight: "900px",
            overlayColor: "0, 0, 0, 0",
        },
        header: {
            verticalAlign: "center",
            horizontalAlign: "center",
            textAlign: "center",
        },
    }
})


// Register your theme in here - this is the object you'll access it from
const PortfolioThemes = {
    loading: loading,
    magma: magma,
    sunset: sunset,
    lilypad: lilypad,
    autumn: autumn,
    cityscape: cityscape,
    rainbow: rainbow,
    rainbowSmooth: rainbowSmooth,
    presentation: presentation,
    arch: arch,
    mountains: mountains,
    wave: wave,
}

export default PortfolioThemes;