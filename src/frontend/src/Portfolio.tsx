import React, { useState, useEffect } from "react";
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from "@material-ui/core/styles";

import {
  LightTheme, useUser, TPortfolio, TPage, TSection,
  HeaderBar, Copyright, SectionGrid, BackgroundImage, HeaderBarSpacer,
} from 'jinxui';

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

  const [portfolio, setPortfolio] = useState<TPortfolio>(null);
  const [pages, setPages] = useState<TPage[]>([]);
  const [currPage] = useState<number>(0);
  // Define as TSection[][] when incorporating multiple pages
  const [sections, setSections] = useState<TSection[]>([]);

  // Updating portfolio/page/section data
  useEffect(() => {
    const fetchPortfolio = async () => {
      const { primary_portfolio } = await getAccountDetailsFromUsername(
        username
      );
      const { portfolio, pages, sections } = await getFullPortfolio(
        primary_portfolio
      );
      setPortfolio(portfolio);
      setPages(pages);
      setSections(sections);
      console.log(sections);
    };
    fetchPortfolio();
  }, [username]); // rendering a portfolio depends on the username

  // Used to show background image capability: derive from theme eventually
  const defaultBackgroundSrc = "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60";


  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={LightTheme}>
        <HeaderBar lightTheme={true}/>
        <BackgroundImage url={defaultBackgroundSrc}>
          <HeaderBarSpacer />
          <Typography
            variant="h1"
            gutterBottom>
            {portfolio ? portfolio.name : "loading"}
          </Typography>
          <SectionGrid sections={sections} />
          <Container maxWidth="sm" style={{ padding: "0 2em 2em 2em" }}>
            <Copyright text={userData.name} />
          </Container>
        </BackgroundImage>
      </ThemeProvider>
    </>
  );
}

export default Portfolio;