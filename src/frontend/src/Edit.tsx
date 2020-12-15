import React, { useState, useEffect, } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { ThemeProvider,  } from "@material-ui/core/styles";
import { Button, CssBaseline, InputAdornment, TextField } from "@material-ui/core";
import { SettingsBrightness } from "@material-ui/icons";
import Tooltip from "@material-ui/core/Tooltip";
import CreateIcon from "@material-ui/icons/Create";

import {
  useUser,
  usePortfolio,
  usePage,
  useSection,
  useLink,
  HeaderBar,
  PrimaryButton,
  SecondaryButton,
  Routes,
  PrimaryColumnDiv,
  SnackbarAlert,
  LinkDialog,
  PaperSectionStatic,
  OneColumnSectionDiv,
  DisplayLinks,
  LoadingSections,
  PaperSectionsDisplay,
} from "jinxui";

import {
  TPage,
  TEditSection,
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

const LinksDiv = styled.div`
  display: flex;
  align-items: center;
  flex-flow: wrap;
`;

/* Consider passing as props a bool that signals whether this is an edit of an existing
   portfolio, or a new one entirely */
const Edit = () => {
  // TEST: Remove this when we've decided on an existing portfolio check
  const portfolioExists = true;
  const [redirect, setRedirect] = useState(false);
  const {
    sendFullPortfolio,
    getFullPortfolio,
    userData,
    switchLightThemeMode,
    getSavedLightThemeMode,
    getSavedPortfolioId,
    makePortfolioPublic,
    setSaving,
    savingState,
  } = useUser();

  const {
    fetchPortfolio,
    getFetchedPortfolio,
    setPortfolioName,
    getLightTheme,
    saveFullPortfolio,
    portfolioIsSaving,
  } = usePortfolio();

  const {
    fetchPages,
    setPages,
    getFetchedPages,
  } = usePage();

  const {
    fetchSections,
    getFetchedSections,
  } = useSection();

  const {
    getFetchedLinks,
    setLinks,
  } = useLink();

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  // const [isSaving, setIsSaving] = useState(false);


  useEffect(() => {
    const fetchExistingPortfolio = async () => {
      // OK to get saved portfolioId from context rather then fetching from backend
      // as primary_portfolio is fetched upon login
      const portfolioId = await getSavedPortfolioId();
      // const portfolio = await fetchPortfolio();
      const { portfolio, pages, sections, links } = await getFullPortfolio(
        portfolioId
      );

      await fetchPortfolio();
      await fetchSections(pages[0].id);
      await fetchPages();
      // setPages(pages);
      setLinks(links)
    };

    if (portfolioExists) {
      fetchExistingPortfolio();
    } else {
      const newPage = [{ name: "home", number: 0 }] as TPage[];
      setPages(newPage);
      // setSaving(false);
    }
  }, []);

  // useEffect(() => {
  //   setIsSaving(savingState);
  // }, [savingState]);

  /** Some shocking repeated code because of the gridlock imposed by:
   * 1. handlePublish can't be made async without pulling it out of the Edit component
   * 2. functions that are not components cannot call hooks
   * TODO: burn it and refactor `publish` into a hook method so it can be made async
   */

  /** Save the currently edited page to the backend and redirect to display page. */
  const handlePublishAndRedirect = () => {
    saveFullPortfolio().then(() => {
      makePortfolioPublic(getFetchedPortfolio().id).then(() => {
        setRedirect(true);
      }).catch(() => {
        setErrorMessage("Something went wrong");
      });
    })
  };

  if (redirect) {
    return (
      <Redirect to={Routes.PORTFOLIO_DISPLAY_BASE + "/" + userData.username} />
    );
    // Null check here isn't really necessary, but ensures that the page will load with all TextFields populated
  } else if (
    getFetchedPortfolio() &&
    getFetchedPages().length !== 0 &&
    getFetchedSections().length !== 0
  ) {
    return (
      <>
        <ThemeProvider theme={getLightTheme()}>
          <SnackbarAlert
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            successMessage={successMessage}
            setSuccessMessage={setSuccessMessage}
          />
          <HeaderBar
            title="Edit"
            darkTheme={!getSavedLightThemeMode()}
            isUserEdit={true}
          >
            <Tooltip
              title={
                getSavedLightThemeMode()
                  ? "Switch this page to dark theme"
                  : "Switch this page to light theme"
              }
              arrow
            >
              <Button
                style={{ height: "100%", borderRadius: 0 }}
                onClick={() => {
                  switchLightThemeMode().then((response) => {});
                }}
                color="inherit"
              >
                <SettingsBrightness />
              </Button>
            </Tooltip>
          </HeaderBar>
          <CssBaseline />
          <PrimaryColumnDiv>
            <div></div>
            <div>
              <FormTitle>Enter your information</FormTitle>
              <form>
                <PaperSectionStatic title={""}>
                  <OneColumnSectionDiv>
                    <TextField
                      name={"portfolioName"}
                      label={"Portfolio Name"}
                      defaultValue={getFetchedPortfolio().name}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setPortfolioName(e.target.value);
                      }}
                      id="standard-full-width"
                      fullWidth
                      color="secondary"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <CreateIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <p></p>
                    <LinksDiv>
                      <DisplayLinks />
                      <LinkDialog />
                    </LinksDiv>
                  </OneColumnSectionDiv>
                </PaperSectionStatic>
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
  } else {
    return <LoadingSections />;
  }
};

export default Edit;
