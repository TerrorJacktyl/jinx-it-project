import React from "react";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import { TSectionData } from 'jinxui';
import { TSection } from "jinxui/types";


/**
 * Generic section component that accepts any of the section fields.
 * All section fields are optional. Empty sections become empty space.
 * 1. Text only => left aligned
 * 2. Image only => centre aligned
 * 3. Text and image => Split left and right
 */
export const Section = (data: TSectionData) => {
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

export const SectionGrid = ({ sections }: { sections: TSectionData[] }) => {
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            container: {
                padding: "3em 3em 3em 3em",
            },
        }),
    )

    const classes = useStyles();

    // Add logic for mapping data to different section components (i.e. timeline) in here
    const dataToSection = (data: TSectionData) => {
        return <Section {...data} />
    }

    return (
        <>
            <Container maxWidth="md" className={classes.container}>
                <Paper>
                    <CentredGrid components={sections.map(dataToSection)} />
                </Paper>
            </Container>
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
                padding: "2em 2em 2em 2em"
            },
        }),
    );

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                {components.map((component, index) => (
                    <Grid item xs={12} key={index} style={{ padding: "0 0 5em 0", }}>
                        {component}
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

// Typing with children is weird, couldn't figure this out so left as any
// Give me a `url` as props to get a background image
export function BackgroundImage(props: any) {
    // Background styling
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            background: {
                backgroundImage: `url(${props.url})`,
                backgroundColor: theme.palette.background.default,
                backgroundPosition: 'center', /* Center the image */
                backgroundRepeat: 'no-repeat', /* Do not repeat the image */
                backgroundSize: 'cover', /* Resize the background image to cover the entire container */
            },
        }),
    );

    const classes = useStyles();

    {/* Background: image from style, default to regular background if no image found} */ }
    return (
        < Paper className={classes.background} >
            {props.children}
        </Paper >
    )
}

export function Copyright({ text }: { text: string }) {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                {text}
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}