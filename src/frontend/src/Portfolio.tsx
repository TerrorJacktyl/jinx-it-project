import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom"
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

  const onEdit = () => {
    // At the moment, this fails if a portfolio hasn't been created yet.
    return <Redirect to={Routes.PORTFOLIO_EDIT} />;
  };

  // Updating portfolio/page/section data
  useEffect(() => {
    const fetchPortfolio = async () => {
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
      console.log(sections);
    };
    fetchPortfolio();
  }, [username]); // rendering a portfolio depends on the username

  return (
    <>
      <CssBaseline />
      {/* Site main theme */}
      <ThemeProvider theme={LightTheme}>
        {userData.authenticated ? <HeaderBar lightTheme={true} /> : null}
        {/* Portfolio theme */}
        <ThemeProvider theme={PortfolioThemes.cityscape}>
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
