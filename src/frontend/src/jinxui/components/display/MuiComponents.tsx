import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Container from "@material-ui/core/Container";
import { makeStyles, createStyles, Theme, useTheme, withStyles } from "@material-ui/core/styles";
import styled from 'styled-components';
import clsx from 'clsx';

import { TSectionData } from "jinxui";


// Helper function for all you functional declarative lot
export const compose = (...fns: Array<Function>) => (arg: any) => fns.reduceRight((acc, fn) => (fn ? fn(acc) : acc), arg)

/* A block that takes up at minimum the height of the screen. Takes an optional */
export function ScreenBlock({ transparent, children }: { transparent?: any, children?: any }) {

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      screenPaper: {
        width: "100%",
        minHeight: "100vh",
      }
    }),
  );

  const classes = useStyles();

  if (transparent) {
    return <Container className={classes.screenPaper}>
      {children}
    </Container>
  }
  else {
    return (
      <Paper elevation={0} className={classes.screenPaper}>
        {children}
      </Paper>
    )
  }
}

export function PortfolioHeader({ title, subtitle }: { title?: string, subtitle?: string }) {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      container: {
        display: 'grid',
        gridTemplateRows: '70% 10% 20%',
        gridTemplateColumns: '10% auto',
        height: '100vh',
      },
      titleText: {
        textAlign: 'left',
        gridRow: '2',
        gridColumn: '2',
      },
      authorText: {
        textAlign: 'left',
        gridRow: '3',
        gridColumn: '2',
      }
    })
  );

  const classes = useStyles();

  const defaultBackgroundSrc = "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60";

  return (
    <BackgroundImage url={defaultBackgroundSrc}>
      <ScreenBlock transparent>
        <div className={classes.container}>
          <Typography
            variant="h1"
            gutterBottom
            className={classes.titleText}>
            {title}
          </Typography>
          <Typography
            variant="h2"
            gutterBottom
            className={classes.authorText}>
            {subtitle}
          </Typography>
        </div>
      </ScreenBlock>
    </BackgroundImage>
  )
}

/**
 * Generic section component that accepts any of the section fields and places their data (no background).
 * All section fields are optional. Empty sections become empty space.
 * 1. Text only => left aligned
 * 2. Image only => centre aligned
 * 3. Text and image => Split left and right
 */
export const Section = (data: TSectionData) => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      img: {
        width: "100%",
        height: "auto",
        objectFit: "contain",
      },
      item: {
        padding: "1em",
      }
    })
  );

  const classes = useStyles();

  // Cols per item when we want the text/media to fit on one row
  const colsPerItem = data.content && data.path ? 6 : 12;

  return (
    // Text alignment hard coded - unsure how to put inside theme
    <Box textAlign="left">
      <Typography variant="h3">
        {data.name}
      </Typography>
      <Grid
        container
        direction="row"
        justify={
          data.content ? (data.path ? "space-between" : "flex-start") : "center"
        }
      >
        {data.content ? (
          <Grid item lg={colsPerItem} className={classes.item}>
            <Typography variant="body1">
              {data.content}
            </Typography>
          </Grid>
        ) : null}
        {data.path ? (
          <Grid item lg={colsPerItem} className={classes.item}>
            <img
              src={data.path == null ? "" : data.path}
              alt={data.alt}
              className={classes.img}
            />
          </Grid>
        ) : null}
      </Grid>
    </Box>
  );
};

export const SectionGrid = ({ sections }: { sections: TSectionData[] }) => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      container: {
        padding: "3em 3em 3em 3em",
      },
    })
  );

  const classes = useStyles();

  // Add logic for mapping data to different section components (i.e. timeline) in here
  const layoutData = (data: TSectionData, index?: number) => {
    return <Section {...data} />;
  };

  const applyAlternatingBackground = (component: JSX.Element, index: number) => {
    return (
      // Every odd section has no background
      <ScreenBlock transparent={index % 2 !== 0}>
        <Container maxWidth="md" className={classes.container}>
          {component}
        </Container>
      </ScreenBlock >
    )
  }

  const dataToSection = compose(applyAlternatingBackground, layoutData)

  return (
    <>
      <CentredGrid components={sections.map((section, index) => applyAlternatingBackground(dataToSection(section), index))} />
    </>
  );
};

/**
 * Given a list of components as props, render them in a centred grid.
 * Note that if you don't pass the components as props, you will burn.
 */
export function CentredGrid({ components }: { components: JSX.Element[] }) {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        flexGrow: 1,
        // padding: "2em 2em 2em 2em",
      },
      item: {
        // padding: "0 0 5em 0"
      },
    })
  );

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {components.map((component, index) => (
          <Grid item xs={12} key={index} className={classes.item}>
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
        backgroundPosition: "center" /* Center the image */,
        backgroundRepeat: "no-repeat" /* Do not repeat the image */,
        backgroundSize: "cover" /* Resize the background image to cover the entire container */,
        // If there are children, darken the image so text is not invisible
        filter: `${props.children ? 'brightness(0.7)' : 'none'}`,
      },
    })
  );

  const classes = useStyles();

  // Background: image from style, default to regular background if no image found

  return <Paper className={classes.background}>
    {props.children}
  </Paper>;
}

export function Copyright({ text }: { text: string }) {

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      container: {
        paddingTop: '2em',
      },
    })
  );

  const classes = useStyles();

  return (
    <Container maxWidth="sm" className={classes.container}>
      <CopyrightText text={text} />
    </Container>
  )
}

export function CopyrightText({ text }: { text: string }) {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      {text}{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
