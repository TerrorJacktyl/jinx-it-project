import React, { useState, useEffect } from "react";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import {
  LightTheme,
  useUser,
  usePortfolio,
  usePage,
  useSection,
  useLink,
  TPortfolio,
  TPage,
  TSection,
  HeaderBar,
  Copyright,
  SectionGrid,
  PortfolioHeader,
  PortfolioThemes,
  defaultPortfolioContext,
} from "jinxui";

import NotFound from "./NotFound";
const getTheme = (portfolio: any, userData: any, thisPageUser: string) => {
  const theme_name =
    userData.authenticated &&
    userData.theme &&
    thisPageUser === userData.username
      ? userData.theme
      : portfolio
      ? portfolio.theme
      : "";

  const themes_list = Object.values(PortfolioThemes);
  const current_theme = themes_list.filter(
    (value) => value.portfolio.theme.name === theme_name
  );
  if (current_theme.length === 1) {
    return current_theme[0];
  } else {
    return themes_list[0];
  }
};

interface PortfolioProps {
  username: string;
}

const SkeletonPage = () => (
  <Container maxWidth="md">
    <Box height="100vh">
      <Grid
        container
        justify="flex-start"
        alignItems="flex-end"
        alignContent="flex-end"
        style={{ height: "100%" }}
      >
        <Skeleton
          variant="rect"
          width={600}
          height={100}
          style={{ marginBottom: 30 }}
          animation="wave"
        />
        <Skeleton
          variant="rect"
          width={400}
          height={40}
          style={{ marginBottom: 50 }}
        />
      </Grid>
    </Box>
  </Container>
);

/*
  At the moment only the first page of portfolio is displayed.
  TODO: primary portfolio redirection
 */
const Portfolio = ({ username }: PortfolioProps) => {
  const {
    userData,
    // getFullPortfolio,
    getAccountDetailsFromUsername,
  } = useUser();

  const {fetchFullPortfolio, getFetchedPortfolio} = usePortfolio();
  const { getFetchedPages } = usePage();
  const { getCleanedSections } = useSection();
  const { getFetchedLinks } = useLink();

  const sections = getCleanedSections();

  const [author, setAuthor] = useState<string>("");
  // const [portfolio, setPortfolio] = useState<TPortfolio>(defaultPortfolioContext);
  // eslint-disable-next-line
  // const [pages, setPages] = useState<TPage[]>([]);
  // eslint-disable-next-line
  // const [currPage] = useState<number>(0);
  // Define as TSection[][] when incorporating multiple pages
  // const [sections, setSections] = useState<TSection[]>([]);

  const [error, setError] = useState<boolean>(false);

  // Updating portfolio/page/section data
  useEffect(() => {
    const fetchPortfolio = async () => {
      setError(false);
      try {
        const {
          // primary_portfolio,
          first_name,
          last_name,
        } = await getAccountDetailsFromUsername(username);
        // const { portfolio, pages, sections } = await getFullPortfolio(
        //   primary_portfolio
        // );
        await fetchFullPortfolio();
        setAuthor(`${first_name} ${last_name}`);
        // setPortfolio(portfolio);
        // setPages(pages);
        // setSections(sections);
      } catch (e) {
        setError(true);
      }
    };
    fetchPortfolio();
  }, [username]); // rendering a portfolio depends on the username

  if (error) {
    return (
      <NotFound
        title="This portfolio could not be found"
        message="It either does not exist or the owner has not made it public."
      />
    );
  }

  const thisTheme = getTheme(getFetchedPortfolio(), userData, username);

  if (thisTheme.portfolio.theme.name !== "Loading") {
    // Main Page
    return (
      <>
        <CssBaseline />
        {/* Site main theme */}
        <ThemeProvider theme={LightTheme}>
          <HeaderBar
            hideBGLoggedOut={true}
            isUserView={userData.username === username}
          />
          {/* Portfolio theme */}
          <ThemeProvider theme={thisTheme}>
            <CssBaseline />
            <PortfolioHeader
              // title={portfolio?.name}
              title={getFetchedPortfolio().name}
              subtitle={author}
            ></PortfolioHeader>
            <SectionGrid sections={sections} />
          </ThemeProvider>
          <Copyright text={author} />
        </ThemeProvider>
      </>
    );
  } else {
    // Skeleton Page
    return (
      <>
        <CssBaseline />
        {/* Site main theme */}
        <ThemeProvider theme={LightTheme}>
          <HeaderBar
            hideBGLoggedOut={true}
            isUserView={userData.username === username}
          />
          {/* Portfolio theme */}
          <CssBaseline />
          <SkeletonPage />
        </ThemeProvider>
      </>
    );
  }
};

export default Portfolio;
