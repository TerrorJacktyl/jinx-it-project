import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import { Button } from "@material-ui/core";

import {
  LightTheme, useUser, TPortfolio, TPage, TSection,
  HeaderBar, Copyright, SectionGrid, BackgroundImage,
  Routes
} from 'jinxui';

/* At the moment displays portfolio with the hardcoded id, and only the first page
   of said portfolio. Consider either passing the portfolio id as props, or having
   the current portfolio provided by context. Regardless, we'll probably have to 
   define a user's default portfolio that they'll be redirected to upon login and
   initial portfolio creation */
const Portfolio = () => {
  const { userData, getFullPortfolio, getSavedPortfolioId } = useUser();
  const portfolioId = getSavedPortfolioId();

  const [portfolio, setPortfolio] = useState<TPortfolio>(null);
  const [pages, setPages] = useState<TPage[]>([]);
  const [currPage] = useState<number>(0);
  // Define as TSection[][] when incorporating multiple pages
  const [sections, setSections] = useState<TSection[]>([]);
  const [editRedirect, setEditRedirect] = useState(false);

  const onEdit = () => {
    // At the moment, this fails if a portfolio hasn't been created yet.
    return <Redirect to={Routes.PORTFOLIO_EDIT} />;
  };

  // Updating portfolio/page/section data
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

  // Used to show background image capability: derive from theme eventually
  const defaultBackgroundSrc = "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60";

  if (editRedirect){
    return onEdit();
  }
  else{
    return (
      <>
        <CssBaseline />
        <ThemeProvider theme={LightTheme}>
          <HeaderBar />
          <BackgroundImage url={defaultBackgroundSrc}>
            <Button
              style={{ position: "absolute", top: 50, right: 0}}
              onClick={() => {
                setEditRedirect(true);
              }}
              color="inherit"
            >
              <EditIcon style={{ fontSize: 40 }} />
            </Button>
            <Typography
              variant="h1"
              gutterBottom
              style={{ paddingTop: "35px", marginBottom: "10px"}}>
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
}

export default Portfolio;
