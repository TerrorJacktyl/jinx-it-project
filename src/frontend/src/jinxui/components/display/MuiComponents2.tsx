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
import { TSection, defaultColors, SectionGrid, PortfolioHeader } from "jinxui";

// Markdown
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { colors } from "@material-ui/core";

/* A block that takes up at minimum the height of the screen. Takes an optional */
export function ScreenBlock2(props: any) {
  const theme = useTheme();
  const maxHeight =
    theme.portfolio.headerBackground.maxHeight !== undefined
      ? theme.portfolio.headerBackground.maxHeight
      : "100vh";
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
  const header = theme.portfolio.header;
  const headerBG = theme.portfolio.headerBackground;

  const verticalAlign =
    header?.verticalAlign !== undefined ? header.verticalAlign : "flex-end";

  const horizontalAlign =
    header?.horizontalAlign !== undefined
      ? header.horizontalAlign
      : "flex-start";

  const textAlign = header?.textAlign !== undefined ? header.textAlign : "left";

  const marginBottom =
    header?.marginBottom !== undefined ? header.marginBottom : "10%";

  const isDark = headerBG.isDark ? true : false;

  const gutterBottom = header?.disableSubtitleGap ? false : true;

  return (
    <>
      <BackgroundImage2 url={theme.portfolio.headerBackground.src}>
        <ScreenBlock2>
          <Container maxWidth="md" style={{ display: "flex" }}>
            <Grid
              direction="row"
              container
              spacing={0}
              alignItems={verticalAlign}
              justify={horizontalAlign}
            >
              <Box
                padding={
                  theme.portfolio.section?.borderPadding?.toString() + "px"
                }
                marginBottom={marginBottom}
                style={headerBG.isDark === true 
                  ? { color: theme.palette.common.white } 
                  : headerBG.isDark === false
                    ? { color: theme.palette.common.black } : {}}
              >
                <Typography
                  variant="h1"
                  align={textAlign}
                  color="inherit"
                  gutterBottom={gutterBottom}
                  style={header?.allCaps ? { textTransform: "uppercase" } : {}}
                >
                  {title}
                </Typography>
                <Typography
                  variant="h3"
                  style={
                    header?.useSecondaryForSubtitle
                      ? { color: theme.palette.secondary.main }
                      : { color: "inherit" }
                  }
                  align={textAlign}
                >
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

const themeColors = (theme: Theme, index: number) => {
  const colors = theme.portfolio?.section?.colors || null;
  const [backgroundColor, textColor, isFullHeight] = colors
    ? colors({ theme: theme, index: index })
    : defaultColors({ theme: theme, index: index });
  return [backgroundColor, textColor, isFullHeight];
};

export const SectionGrid2 = ({ sections }: { sections: TSection[] }) => {
  const theme = useTheme();

  // Add logic for mapping data to different section components (i.e. timeline) in here
  const layoutData = (data: TSection, index?: number) => {
    return <Section2 {...data} />;
  };

  const applyColors = (component: JSX.Element, index: number) => {
    const [backgroundColor, textColor, isFullHeight] = themeColors(
      theme,
      index
    );
    const customCss = theme.portfolio?.section?.css || {};

    return (
      <>
        <Box style={isFullHeight ? {} : { background: backgroundColor }}>
          <Container maxWidth="md">
            <Box
              style={{
                ...customCss,
                color: textColor,
              }}
            >
              <Container disableGutters>{component}</Container>
            </Box>
          </Container>
        </Box>
      </>
    );
  };

  const [backgroundColor, _, isFullHeight] = themeColors(theme, 0);

  return (
    <Box style={isFullHeight ? { background: backgroundColor } : {}}>
      <CentredGrid2
        components={sections.map((section, index) =>
          applyColors(layoutData(section), index)
        )}
      />
    </Box>
  );
};

/**
 * Given a list of components as props, render them in a centred grid.
 */
export function CentredGrid2({ components }: { components: JSX.Element[] }) {
  return (
    <Grid container spacing={0}>
      {components.map((component, index) => (
        <Grid item xs={12} key={index} spacing={0}>
          {component}
        </Grid>
      ))}
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
        padding: theme.portfolio.section?.borderPadding,
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

  const theme = useTheme();

  // Set defaults for various variables
  const sectionTheme = theme.portfolio.section;

  const titleGap =
    sectionTheme?.titleGap !== undefined ? sectionTheme.titleGap : 0;

  const sectionGap =
    sectionTheme?.sectionGap !== undefined ? sectionTheme.sectionGap : "10em";

  const spacing =
    sectionTheme?.spacing !== undefined ? sectionTheme.spacing : 4;

  var border = false;
  switch (sectionTheme?.border) {
    case "first":
      border = data.number === 0;
      break;
    case "odds":
      border = data.number % 2 === 1;
      break;
    case "evens":
      border = data.number % 2 === 0;
      break;
    case "all":
      border = true;
      break;
    default:
      border = false;
  }

  const textColor = themeColors(theme, data.number)[1];
  return (
    <>
      <Box textAlign="left" paddingTop={sectionGap} paddingBottom={sectionGap}>
        <Paper
          elevation={0}
          square
          variant="outlined"
          className={classes.paper}
          style={
            border ? { color: textColor } : { color: textColor, border: "none" }
          }
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
