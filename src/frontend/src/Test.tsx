import React, { FunctionComponent } from "react";
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import { CssBaseline } from '@material-ui/core';

import {
    ThemeProvider,
    createMuiTheme,
} from "@material-ui/core/styles";

import { LightTheme } from 'jinxui';

import { makeStyles, createStyles, Theme, useTheme } from '@material-ui/core/styles';
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
            content: "The first!",
            path: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.xjlgUSio99GyPCgsL4S63QHaEK%26pid%3DApi&f=1",
            alt: "tiddlywinks",
        },
        {
            path: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic01.nyt.com%2Fimages%2F2018%2F05%2F24%2Fus%2Fvid24-volcano-image%2Fvid24-volcano-image-videoSixteenByNine3000.jpg&f=1&nofb=1",
        },
        {},
        {
            name: "Biography",
            content: "The third!",
        },
    ]


    const Pet = ({ name }: { name: string }) => {
        return <h1>{name}</h1>;
    }

    const pets: Array<JSX.Element> = [
        <Pet name={"Millie"} />,
        <Section {...sections[0]} />,
    ]


    return (
        <>
            <ThemeProvider theme={LightTheme}>
                <CssBaseline />
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
                {data.content ? <Grid item>
                    <Typography
                        variant="body1"
                        color="primary">
                        {data.content}
                    </Typography>
                </Grid> : null}
                {data.path ? <Grid item>
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