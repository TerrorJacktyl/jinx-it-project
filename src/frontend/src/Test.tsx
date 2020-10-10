import React from "react";
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import { CssBaseline } from '@material-ui/core';

import {
    ThemeProvider,
} from "@material-ui/core/styles";

import { LightTheme } from 'jinxui';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
        </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


export default function Test() {

    const sections: SectionData[] = [
        {
            name: "Me and my cat",
            content: "Here is my cute cat Tiddles. I would put a picture of myself here but I'm a bot. Please don't tell anyone.",
            path: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.xjlgUSio99GyPCgsL4S63QHaEK%26pid%3DApi&f=1",
            alt: "tiddlywinks",
        },
        {
            name: "A pic from when I almost died lol!",
            path: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic01.nyt.com%2Fimages%2F2018%2F05%2F24%2Fus%2Fvid24-volcano-image%2Fvid24-volcano-image-videoSixteenByNine3000.jpg&f=1&nofb=1",
        },
        {},
        {
            name: "Biography",
            content: " Anyways, um... I bought a whole bunch of shungite rocks, do you know what shungite is? Anybody know what shungite is? No, not Suge Knight, I think he's locked up in prison. I'm talkin' shungite. Anyways, it's a two billion year-old like, rock stone that protects against frequencies and unwanted frequencies that may be traveling in the air. That's my story, I bought a whole bunch of stuff. Put 'em around the la casa. Little pyramids, stuff like that.",
        },
    ]

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            background: {
                backgroundImage: 'none',
                // This doesn't work: it can't see the default color, but it can see 
                // other colours i.e. theme.palette.primary.main
                backgroundColor: theme.palette.background.default,
                backgroundPosition: 'center', /* Center the image */
                backgroundRepeat: 'no-repeat', /* Do not repeat the image */
                backgroundSize: 'cover', /* Resize the background image to cover the entire container */
            },
        }),
    );

    const classes = useStyles();

    return (
        <>
            <CssBaseline />
            <ThemeProvider theme={LightTheme}>

                {/* Background: image from style, default to regular background if no image found} */}
                <Paper className={classes.background}>
                    <Typography
                        variant="h1"
                        color="primary"
                        gutterBottom>
                        Portfolio page
                    </Typography>
                    <Container maxWidth="md">
                        <SectionGrid sections={sections} />
                        {/* <CentredGrid components={pets} /> */}
                        <Copyright />

                    </Container>
                </Paper>
            </ThemeProvider>
        </>
    );
}

type SectionData = {
    name?: string;
    content?: string;
    path?: string;
    alt?: string;
}

/**
 * Generic section component that accepts any of the section fields.
 * All section fields are optional. Empty sections become empty space.
 * 1. Text only => left aligned
 * 2. Image only => centre aligned
 * 3. Text and image => Split left and right
 */
const Section = (data: SectionData) => {
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            img: {
                width: '100%',
                height: 'auto',
                objectFit: 'contain'
            },
        }),
    );

    const classes = useStyles();

    // Cols per item when we want the text/media to fit on one row
    const colsPerItem = data.content && data.path ? 6 : 12;

    return (
        // Text alignment hard coded - unsure how to put inside theme
        <Box textAlign="left">
            <Typography
                variant="h3"
                color="primary"
            >{data.name}</Typography>
            <Grid container
                direction="row"
                justify={data.content ? (data.path ? "space-between" : "flex-start") : "center"}>
                {data.content ? <Grid item xs={colsPerItem}>
                    <Typography
                        variant="body1"
                        color="primary">
                        {data.content}
                    </Typography>
                </Grid> : null}
                {data.path ? <Grid item xs={colsPerItem}>
                    <img src={data.path == null ? "" : data.path}
                        alt={data.alt}
                        className={classes.img}
                    />
                </Grid> : null}
            </Grid>
        </Box>
    )
}

const SectionGrid = ({ sections }: { sections: SectionData[] }) => {
    return (
        <>
            <Paper>
                <CentredGrid components={sections.map(data => <Section {...data} />)} />
            </Paper>
        </>
    );
}

/**
 * Given a list of components as props, render them in a centred grid.
 * Note that if you don't pass the components as props, you will burn.
 */
export function CentredGrid({ components }: { components: JSX.Element[] }) {

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                flexGrow: 1,
                padding: "1em 2em 2em 1em"
            },
        }),
    );

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                {components.map((component, index) => (
                    <Grid item xs={12} key={index}>
                        {component}
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}