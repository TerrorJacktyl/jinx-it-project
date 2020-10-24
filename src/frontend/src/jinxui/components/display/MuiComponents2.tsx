import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import {
  makeStyles,
  createStyles,
  Theme,
  useTheme,
  responsiveFontSizes,
} from "@material-ui/core/styles";
import {
  TSectionData,
  TSection,
  defaultColors,
  SectionGrid,
  PortfolioHeader,
} from "jinxui";

// Markdown
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

/* A block that takes up at minimum the height of the screen. Takes an optional */
export function ScreenBlock2(props: any) {
  const theme = useTheme();
  const maxHeight =
    theme.portfolio.headerBackground.maxHeight !== undefined
      ? theme.portfolio.headerBackground.maxHeight
      : "100vh";
  console.log(maxHeight);
  return (
    // <Box minHeight={`min(100vh, ${maxHeight}px)`} clone>
    <Box minHeight={`min(100vh, ${maxHeight})`} clone>
      {props.children}
    </Box>
  );
}

// Typing with children is weird, couldn't figure this out so left as any
// Give me a `url` as props to get a background image
export function BackgroundImage2(props: any) {
  // Background styling
  const outerTheme = useTheme();
  const backgroundColor = outerTheme.portfolio.headerBackground.overlayColor
    ? outerTheme.portfolio.headerBackground.overlayColor
    : "0, 0, 0, 0.3";
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      background: {
        backgroundImage: `url(${props.url})`,
        // background: "linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(karina-vorozheeva-rW-I87aPY5Y-unsplash)",
        backgroundColor: theme.palette.background.default,
        backgroundPosition: "center" /* Center the image */,
        backgroundRepeat: "no-repeat" /* Do not repeat the image */,
        backgroundSize:
          "cover" /* Resize the background image to cover the entire container */,
      },
      foreground: {
        // If there are children, darken the image so text is not invisible
        backgroundColor: `${
          props.children ? "rgba(" + backgroundColor + ")" : "none"
        }`,
      },
    })
  );

  const classes = useStyles();

  // Background: image from style, default to regular background if no image found

  return (
    <>
      <Paper className={classes.background} elevation={0}>
        <Box className={classes.foreground}>{props.children}</Box>
      </Paper>
    </>
  );
}

export function PortfolioHeader2({
  title,
  subtitle,
}: {
  title?: string;
  subtitle?: string;
}) {
  const theme = responsiveFontSizes(useTheme());

  // Set default values if not defined (probably not the cleanest way of
  // doing this)

  const verticalAlign =
    theme.portfolio.header?.verticalAlign !== undefined
      ? theme.portfolio.header.verticalAlign
      : "flex-end";

  const horizontalAlign =
    theme.portfolio.header?.horizontalAlign !== undefined
      ? theme.portfolio.header.horizontalAlign
      : "flex-start";

  const textAlign =
    theme.portfolio.header?.textAlign !== undefined
      ? theme.portfolio.header.textAlign
      : "left";

  const marginBottom =
    theme.portfolio.header?.marginBottom !== undefined
      ? theme.portfolio.header.marginBottom
      : "10%";

  if (!["Arch", "Mountains", "Wave"].includes(theme.portfolio.theme.name)) {
    return <PortfolioHeader title={title} subtitle={subtitle} />;
  } else {
    return (
      <>
        <BackgroundImage2 url={theme.portfolio.headerBackground.src}>
          <ScreenBlock2>
            <Container maxWidth="md" style={{ display: "flex" }}>
              <Grid
                direction="row"
                container
                alignItems={verticalAlign}
                justify={horizontalAlign}
              >
                <Box marginBottom={marginBottom}>
                  <Typography variant="h1" align={textAlign}>
                    {title}
                  </Typography>
                  <Typography variant="h3" color="secondary" align={textAlign}>
                    {subtitle}
                  </Typography>
                </Box>
              </Grid>
            </Container>
          </ScreenBlock2>
        </BackgroundImage2>
      </>
    );
  }
}

export const SectionGrid2 = ({ sections }: { sections: TSection[] }) => {
  const theme = useTheme();

  if (!["Arch", "Mountains", "Wave"].includes(theme.portfolio.theme.name)) {
    return <SectionGrid sections={sections} />;
  }

  // Add logic for mapping data to different section components (i.e. timeline) in here
  const layoutData = (data: TSection, index: number) => {
    return <Section2 {...(data)} />;
  };

  return (
    <>
      <CentredGrid2
        components={sections.map((section, index) => (
          <Container maxWidth="md">{layoutData(section, index)}</Container>
        ))}
      />
    </>
  );
};

/**
 * Given a list of components as props, render them in a centred grid.
 */
export function CentredGrid2({ components }: { components: JSX.Element[] }) {
  return (
    // <Paper style={{ backgroundColor: "#748598" }}>
    <Grid container>
      {components.map((component, index) => {
        if (index % 2 === 0) {
          return (
            <Grid item xs={12} key={index}>
              {component}
            </Grid>
          );
        } else {
          return (
            <Container style={{ width: "100%", maxWidth: "100%", padding: 0 }}>
              <Paper elevation={0}>
                <Grid item xs={12} key={index}>
                  {component}
                </Grid>
              </Paper>
            </Container>
          );
        }
      })}
    </Grid>
  );
}

/**
 * Generic section component that accepts any of the section fields and places their data (no background).
 * All section fields are optional. Empty sections become empty space.
 * 1. Text only => left aligned
 * 2. Image only => centre aligned
 * 3. Text and image => Split left and right
 */
export const Section2 = (data: TSection) => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      img: {
        width: "100%",
        height: "auto",
        objectFit: "contain",
      },
      item: {
        paddingTop: "1em",
      },
      paper: {
        background: "rgba(255, 255, 255, 0.0)",
        padding: 45,
        border: "1px solid " + theme.palette.secondary.main,
      },
    })
  );

  const classes = useStyles();

  // Cols per item when we want the text/media to fit on one row
  const colsPerItem = data.content && data.path ? 6 : 12;

  // Markdown syntax highlighting
  const renderers = {
    code: ({ language, value }: { language: string; value: string }) => {
      return (
        <SyntaxHighlighter
          style={vscDarkPlus}
          language={language}
          children={value}
        />
      );
    },
  };

  console.log(data)

  const theme = useTheme();

  // Set defaults for various variables

  const titleGap =
    theme.portfolio.section?.titleGap !== undefined
      ? theme.portfolio.section.titleGap
      : 50;

  const sectionGap =
    theme.portfolio.section?.sectionGap !== undefined
      ? theme.portfolio.section.sectionGap
      : "10em";

  const spacing =
    theme.portfolio.section?.spacing !== undefined
      ? theme.portfolio.section.spacing
      : 4;
  
  var border = false
  switch (theme.portfolio.section?.border) {
    case "first":
      border = data.number === 0
      break;
    case "odds":
      border = data.number % 2 === 1
      break;
    case "evens":
      border = data.number % 2 === 0
      break;
    case "all":
      border = true
      break;
    default:
      border = false;
  }

  /** Text alignment hard coded
   * TODO: put inside theme later */
  return (
    <>
      <Box textAlign="left" paddingTop={sectionGap} paddingBottom={sectionGap}>
        <Paper
          elevation={0}
          square
          variant="outlined"
          className={classes.paper}
          style={border ? {} : { border: "none" }}
        >
          <Typography variant="h2" gutterBottom>
            {data.name}
          </Typography>
          <Grid
            container
            direction="row-reverse"
            style={{ marginTop: titleGap }}
            spacing={spacing}
          >
            {data.path ? (
              <Grid item xs={12} sm={colsPerItem}>
                <img
                  src={data.path == null ? "" : data.path}
                  alt={data.alt}
                  className={classes.img}
                />
              </Grid>
            ) : null}
            {data.content ? (
              <Grid item xs={12} sm={colsPerItem}>
                <Typography variant="body1" style={{ marginTop: "-25px" }}>
                  <ReactMarkdown plugins={[gfm]} renderers={renderers}>
                    {data.content}
                  </ReactMarkdown>
                </Typography>
              </Grid>
            ) : null}
          </Grid>
        </Paper>
      </Box>
    </>
  );
};
