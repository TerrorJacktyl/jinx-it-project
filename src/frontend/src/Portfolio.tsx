import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Container from "@material-ui/core/Container";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";

import {
  LightTheme,
  useUser,
  TPortfolio,
  TPage,
  TSection,
  HeaderBar,
  Copyright,
  SectionGrid,
  PortfolioHeader,
  PortfolioThemes,
  Routes,
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

/*
  At the moment only the first page of portfolio is displayed.
  TODO: primary portfolio redirection
 */
const Portfolio = ({ username }: PortfolioProps) => {
  const {
    userData,
    getFullPortfolio,
    getAccountDetailsFromUsername,
  } = useUser();

  const [author, setAuthor] = useState<string>("");
  const [portfolio, setPortfolio] = useState<TPortfolio>(null);
  const [pages, setPages] = useState<TPage[]>([]);
  const [currPage] = useState<number>(0);
  // Define as TSection[][] when incorporating multiple pages
  const [sections, setSections] = useState<TSection[]>([]);
  const [editRedirect, setEditRedirect] = useState(false);

  const [error, setError] = useState<boolean>(false);

  // Updating portfolio/page/section data
  useEffect(() => {
    const fetchPortfolio = async () => {
      setError(false);
      try {
        const {
          primary_portfolio,
          first_name,
          last_name,
        } = await getAccountDetailsFromUsername(username);
        const { portfolio, pages, sections } = await getFullPortfolio(
          primary_portfolio
        );
        setAuthor(`${first_name} ${last_name}`);
        setPortfolio(portfolio);
        setPages(pages);
        setSections(sections);
      } catch (e) {
        setError(true);
      }
    };
    fetchPortfolio();
  }, [username]); // rendering a portfolio depends on the username

  // Used to show background image capability: derive from theme eventually
  const defaultBackgroundSrc =
    "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60";

  if (error) {
    return (
      <NotFound
        title="This portfolio could not be found"
        message="It either does not exist or the owner has not made it public."
      />
    );
  }

  return (
    <>
      <CssBaseline />
      {/* Site main theme */}
      <ThemeProvider theme={LightTheme}>
        {/* {userData.authenticated ? <HeaderBar lightTheme={true} /> : null} */}
        <HeaderBar lightTheme={true} hideBGLoggedOut={true} />
        {/* Portfolio theme */}
        <ThemeProvider theme={getTheme(portfolio, userData, username)}>
          <PortfolioHeader
            title={portfolio?.name}
            subtitle={author}
          ></PortfolioHeader>
          <SectionGrid sections={sections} />
        </ThemeProvider>
        <Copyright text={userData.firstName} />
      </ThemeProvider>
    </>
  );
};

export default Portfolio;
