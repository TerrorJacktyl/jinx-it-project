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
import { findAllByDisplayValue } from "@testing-library/react";
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
    getAccountDetailsFromUsername,
    isLoading,
    setLoading,
  } = useUser();

  const {fetchFullPortfolio, getFetchedPortfolio} = usePortfolio();
  const { getCleanedSections } = useSection();

  const sections = getCleanedSections();

  const [author, setAuthor] = useState<string>("");

  const [error, setError] = useState<boolean>(false);

  // Updating portfolio/page/section data
  useEffect(() => {
    const fetchPortfolio = async () => {
      setLoading(true)
      setError(false);
      try {
        const {
          first_name,
          last_name,
        } = await getAccountDetailsFromUsername(username);
        await fetchFullPortfolio(username);
        setAuthor(`${first_name} ${last_name}`);
      } catch (e) {
        setError(true);
      } finally {
        console.log("FINISHED")
        setLoading(false)
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

  if (!isLoading()) {
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
