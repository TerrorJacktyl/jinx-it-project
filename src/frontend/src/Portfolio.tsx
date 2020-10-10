import React, { useState, useEffect } from "react";
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider, makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import { LightTheme, useUser, TPortfolio, TPage, TSection, TSectionData, HeaderBar } from 'jinxui';

/* At the moment displays portfolio with the hardcoded id, and only the first page
   of said portfolio. Consider either passing the portfolio id as props, or having
   the current portfolio provided by context. Regardless, we'll probably have to 
   define a user's default portfolio that they'll be redirected to upon login and
   initial portfolio creation */
const Portfolio = () => {
  const { userData, getFullPortfolio, getSavedPortfolioId } = useUser();
  const portfolioId = getSavedPortfolioId();
  // const tempPortfolioId = 26;

  const [portfolio, setPortfolio] = useState<TPortfolio>(null);
  const [pages, setPages] = useState<TPage[]>([]);
  const [currPage] = useState<number>(0);
  // Define as TSection[][] when incorporating multiple pages
  const [sections, setSections] = useState<TSection[]>([]);


  useEffect(() => {
    const fetchPortfolio = async () => {
      const { portfolio, pages, sections } = await getFullPortfolio(
        portfolioId
      );
      setPortfolio(portfolio);
      setPages(pages);
      setSections(sections);
      console.log(sections);
    };
    fetchPortfolio();
  }, []); // Empty dependency array required to prevent infinite loop

  // Background styling
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
      sectionsContainer: {
        padding: "3em 3em 3em 3em"
      }
    }),
  );

  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={LightTheme}>
        <HeaderBar />
        {/* Background: image from style, default to regular background if no image found} */}
        <Paper className={classes.background}>
          <Typography
            variant="h1"
            color="primary"
            gutterBottom>
            {portfolio ? portfolio.name : "loading"}
          </Typography>
          <Container maxWidth="md" className={classes.sectionsContainer}>
            <SectionGrid sections={sections} />
          </Container>
          <Container maxWidth="sm" style={{ padding: "0 2em 2em 2em" }}>
            <Copyright text={userData.name} />
          </Container>
        </Paper>
      </ThemeProvider>
    </>
  );
}

// const oldReturn = () => (
//   <ThemeProvider theme={DarkTheme}>
//     <CssBaseline />
//     <AccountPageDiv>
//       <HeaderBar
//         title={portfolio !== null ? portfolio.name : null} lightTheme={true}
//       ></HeaderBar>
//       <PageDiv>
//         <PageName>
//           {pages.length !== 0 ? pages[currPage].name : null}
//         </PageName>
//         {sections.length !== 0
//           ? sections.map((section: TSection) => {
//             if (section.type === "text") {
//               return (
//                 <TextSection
//                   name={section.name}
//                   content={section.content}
//                 />
//               );
//             } else if (section.type === "image") {
//               return <UserImage src={section.path} />;
//             } else if (section.type === "image_text") {
//               return (
//                 <>
//                   <UserImage src={section.path} />
//                   <TextSection
//                     name={section.name}
//                     content={section.content}
//                   />
//                 </>
//               );
//             } else {
//               return (
//                 <MediaSection name={section.name} path={section.media} />
//               );
//             }
//           })
//           : null}
//       </PageDiv>
//     </AccountPageDiv>
//   </ThemeProvider>
// );

/**
 * Generic section component that accepts any of the section fields.
 * All section fields are optional. Empty sections become empty space.
 * 1. Text only => left aligned
 * 2. Image only => centre aligned
 * 3. Text and image => Split left and right
 */
const Section = (data: TSectionData) => {
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

const SectionGrid = ({ sections }: { sections: TSectionData[] }) => {
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
        padding: "2em 2em 2em 2em"
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

function Copyright({ text }: { text: string }) {
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

export default Portfolio;
