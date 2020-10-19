import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles, createStyles, Theme, useTheme, withStyles } from "@material-ui/core/styles";
import { TSectionData } from "jinxui";


// Helper function for all you functional declarative lot
export const compose = (...fns: Array<Function>) => (arg: any) => fns.reduceRight((acc, fn) => (fn ? fn(acc) : acc), arg)

/* A block that takes up at minimum the height of the screen. Takes an optional */
export function ScreenBlock(props: any) {

  return (
    <Box
      minHeight="100vh" clone>
      {props.children}
    </Box>
  )
}

export function PortfolioHeader({ title, subtitle }: { title?: string, subtitle?: string }) {

  const theme = useTheme();

  return (
    <BackgroundImage url={
      theme.portfolio.headerBackground.src
    }>
      <ScreenBlock>
        <Grid container
          direction="row"
          alignItems="flex-end"
        >
          <Grid item xs={12}>
            <Box p="10%" color="common.white">
              <Typography align="left">
                <Typography variant="h1" gutterBottom>
                  <Box fontWeight="fontWeightMedium">
                    {title}
                  </Box>
                </Typography>
                <Typography variant="h2">
                  <Box fontWeight="fontWeightMedium">
                    {subtitle}
                  </Box>
                </Typography>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </ScreenBlock>
    </BackgroundImage >
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
        objectFit: "contain"
      },
      item: {
        paddingTop: "1em",
      }
    })
  );

  const classes = useStyles();

  // Cols per item when we want the text/media to fit on one row
  const colsPerItem = data.content && data.path ? 6 : 12;

  return (
    // Text alignment hard coded - unsure how to put inside theme
    <Box textAlign="left" paddingTop="3em" paddingBottom="3em">
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
            <Typography variant="h5">
              {data.content}
            </Typography>
          </Grid>
        ) : null}
        {data.path ? (
          <Grid item xs={12} lg={colsPerItem} className={classes.item}>
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

  const theme = useTheme();

  // Add logic for mapping data to different section components (i.e. timeline) in here
  const layoutData = (data: TSectionData, index?: number) => {
    return <Section {...data} />;
  };

  const applyAlternatingBackground = (component: JSX.Element, index: number) => {

    const color = index % 2 === 0 ? 'primary' : 'secondary';
    const type = theme.palette.type;

    return (
      <Box
        bgcolor={`${color}.${type}`}
        color={`${color}.contrastText`}
      >
        <Container>
          {component}
        </Container>
      </Box>
    )
  }

  return (
    <>
      <CentredGrid components={sections.map((section, index) => applyAlternatingBackground(layoutData(section), index))} />
    </>
  );
};

/**
 * Given a list of components as props, render them in a centred grid.
 */
export function CentredGrid({ components }: { components: JSX.Element[] }) {
  return (
    <Grid container
    // spacing={3}
    >
      {components.map((component, index) => (
        <Grid item xs={12} key={index}>
          {component}
        </Grid>
      ))}
    </Grid>
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
        // background: "linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(karina-vorozheeva-rW-I87aPY5Y-unsplash)",
        backgroundColor: theme.palette.background.default,
        backgroundPosition: "center" /* Center the image */,
        backgroundRepeat: "no-repeat" /* Do not repeat the image */,
        backgroundSize: "cover" /* Resize the background image to cover the entire container */,
      },
      foreground: {
        // If there are children, darken the image so text is not invisible
        backgroundColor: `${props.children ? 'rgba(0,0,0,0.3)' : 'none'}`,
      }
    })
  );

  const classes = useStyles();

  // Background: image from style, default to regular background if no image found

  return (
    <>
      <Paper className={classes.background}>
        <Box className={classes.foreground}>
          {props.children}
        </Box>
      </Paper>
    </>
  )
}

export function Copyright({ text }: { text: string }) {

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      container: {
        paddingTop: '2em',
        paddingBottom: '1em',
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
    <Typography variant="h6" align="center">
      {"Copyright © "}
      {text}{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
