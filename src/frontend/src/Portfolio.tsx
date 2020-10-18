import React, { useState, useEffect } from "react";
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from "@material-ui/core/styles";

import {
  LightTheme, useUser, TPortfolio, TPage, TSection,
  HeaderBar, Copyright, SectionGrid, PortfolioHeader,
  ScrollContainer,
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

  const [author, setAuthor] = useState<string>('');
  const [portfolio, setPortfolio] = useState<TPortfolio>(null);
  const [pages, setPages] = useState<TPage[]>([]);
  const [currPage] = useState<number>(0);
  // Define as TSection[][] when incorporating multiple pages
  const [sections, setSections] = useState<TSection[]>([]);

  // Updating portfolio/page/section data
  useEffect(() => {
    const fetchPortfolio = async () => {
      const { primary_portfolio, first_name, last_name } = await getAccountDetailsFromUsername(
        username
      );
      const { portfolio, pages, sections } = await getFullPortfolio(
        primary_portfolio
      );
      setAuthor(`${first_name} ${last_name}`);
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
        <HeaderBar lightTheme={true} />
        {/* Enables child components to list themselves as snappable */}
        <ScrollContainer>
          <PortfolioHeader
            title={portfolio?.name}
            subtitle={author}
          ></PortfolioHeader>
          <SectionGrid sections={sections} />
          <Container maxWidth="sm" style={{ padding: "0 2em 2em 2em" }}>
            <Copyright text={userData.name} />
          </Container>
        </ScrollContainer>
      </ThemeProvider>
    </>
  );
}

export default Portfolio;
