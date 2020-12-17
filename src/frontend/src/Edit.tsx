import React, { useEffect } from "react";
import styled from "styled-components";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Tooltip from "@material-ui/core/Tooltip";

import {
  useUser,
  usePortfolio,
  PrimaryButton,
  SecondaryButton,
  Routes,
  PrimaryColumnDiv,
  PaperSectionsDisplay,
  EditHeader,
} from "jinxui";

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

const Edit = (props: any) => {
  /*  Existing portfolio checks removed. New accounts should have an 
      portfolio created automatically. If no portfolios are found, an error
      should be reported */

  const { userData, isSaving, setErrorMessage, setLoading } = useUser();
  const {
    fetchFullPortfolio,
    getFetchedPortfolio,
    getLightTheme,
    saveFullPortfolio,
    makePortfolioPublic,
  } = usePortfolio();

  // Updating portfolio/page/section data
  useEffect(() => {
    let mounted = true;

    const fetchPortfolio = async () => {
      setLoading(true);
      try {
        await fetchFullPortfolio();
      } catch (e) {
        throw e;
      } finally {
        setLoading(false)
      }
    };
    fetchPortfolio();

    // Run on dismount. Should prevent memory leaks.
    return () => { mounted = false; };
  }, []); 

  /* Save the currently edited page to backend and redirect to display page. */
  const handlePublishAndRedirect = () => {
    saveFullPortfolio(false).then(() => {
      makePortfolioPublic(getFetchedPortfolio().id)
        .then(() => {
          props.history.push(
            Routes.PORTFOLIO_DISPLAY_BASE + "/" + userData.username
          );
        })
        .catch(() => {
          setErrorMessage("Something went wrong");
        });
    });
  };

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
                <Tooltip title="Save, make public, and display portfolio" arrow>
                  <TooltipDiv>
                    <PrimaryButton
                      disabled={isSaving()}
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
};

export default Edit;
