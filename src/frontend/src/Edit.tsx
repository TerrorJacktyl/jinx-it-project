import React, { useState, useEffect, } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Tooltip from "@material-ui/core/Tooltip";

import {
  useUser,
  usePortfolio,
  usePage,
  useSection,
  useLink,
  PrimaryButton,
  SecondaryButton,
  Routes,
  PrimaryColumnDiv,
  LoadingSections,
  PaperSectionsDisplay,
  EditHeader,
} from "jinxui";

import {
  TPage,
} from "jinxui/types";

const FormTitle = styled.h2`
  font-weight: 300;
`;

const PublishCancelDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-around;
  margin: 5px;
  padding: 5px;
`;

// Required for disabled buttons
const TooltipDiv = styled.div`
  display: flex;
`;



/* Consider passing as props a bool that signals whether this is an edit of an existing
   portfolio, or a new one entirely */
const Edit = () => {
  // TEST: Remove this when we've decided on an existing portfolio check
  const portfolioExists = true;
  const [redirect, setRedirect] = useState(false);
  const {
    getFullPortfolio,
    userData,
    getSavedPortfolioId,
    makePortfolioPublic,
  } = useUser();

  const {
    fetchPortfolio,
    getFetchedPortfolio,
    getLightTheme,
    saveFullPortfolio,
    portfolioIsSaving,
  } = usePortfolio();

  const {
    fetchPages,
    setPages,
    getFetchedPages,
    setErrorMessage,
  } = usePage();

  const {
    fetchSections,
    getFetchedSections,
  } = useSection();

  const {
    setLinks,
  } = useLink();

  useEffect(() => {
    const fetchExistingPortfolio = async () => {
      // OK to get saved portfolioId from context rather then fetching from backend
      // as primary_portfolio is fetched upon login
      const portfolioId = await getSavedPortfolioId();
      // const portfolio = await fetchPortfolio();
      const { pages, links } = await getFullPortfolio(
        portfolioId
      );

      await fetchPortfolio();
      await fetchSections(pages[0].id);
      await fetchPages();
      setLinks(links)
    };

    if (portfolioExists) {
      fetchExistingPortfolio();
    } else {
      const newPage = [{ name: "home", number: 0 }] as TPage[];
      setPages(newPage);
    }
  }, []);

  /** Save the currently edited page to the backend and redirect to display page. */
  const handlePublishAndRedirect = () => {
    saveFullPortfolio().then(() => {
      makePortfolioPublic(getFetchedPortfolio().id).then(() => {
        this.props.history.push
        setRedirect(true);
      }).catch(() => {
        setErrorMessage("Something went wrong");
      });
    })
  };

  // if (redirect) {
  //   return (
  //     <Redirect to={Routes.PORTFOLIO_DISPLAY_BASE + "/" + userData.username} />
  //   );
  //   // Null check here isn't really necessary, but ensures that the page will load with all TextFields populated
  // } else if (
  //   getFetchedPortfolio() &&
  //   getFetchedPages().length !== 0 &&
  //   getFetchedSections().length !== 0
  // ) {
    return (
      <>
        <ThemeProvider theme={getLightTheme()}>
          <EditHeader />
          <CssBaseline />
          <PrimaryColumnDiv>
            <div></div>
            <div>
              <FormTitle>Enter your information</FormTitle>
              <form>
                {PaperSectionsDisplay()}
                <PublishCancelDiv>
                  <Tooltip
                    title="Save, make public, and display portfolio"
                    arrow
                  >
                    <TooltipDiv>
                      <PrimaryButton
                        disabled={portfolioIsSaving}
                        onClick={() => {
                          handlePublishAndRedirect();
                        }}
                      >
                        PUBLISH
                      </PrimaryButton>
                    </TooltipDiv>
                  </Tooltip>
                  <TooltipDiv>
                    <Tooltip title="Cancel, go back to Jinx home page" arrow>
                      <a href={Routes.HOME}>
                        <SecondaryButton>Cancel</SecondaryButton>
                      </a>
                    </Tooltip>
                  </TooltipDiv>
                </PublishCancelDiv>
              </form>
            </div>
            <div></div>
          </PrimaryColumnDiv>
        </ThemeProvider>
      </>
    );
  // } else {
  //   return <LoadingSections />;
  // }
};

export default Edit;
