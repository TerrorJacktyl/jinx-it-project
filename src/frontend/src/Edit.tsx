import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Button, CssBaseline, Icon, InputAdornment, TextField } from "@material-ui/core";
import { SettingsBrightness } from "@material-ui/icons";
import Skeleton from "@material-ui/lab/Skeleton";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import CreateIcon from "@material-ui/icons/Create";

import {
  LightTheme,
  DarkTheme,
  useUser,
  usePortfolio,
  usePage,
  useSection,
  useLink,
  HeaderBar,
  PrimaryButton,
  SecondaryButton,
  TextSectionInput,
  ImageSectionInput,
  PortfolioNameSectionInput,
  Routes,
  PrimaryColumnDiv,
  ImageTextSectionInput,
  SnackbarAlert,
  defaultPortfolioContext,
  LinkDialog,
  LinkDisplayIcon,
  LinkEditMenu,
  PaperSectionStatic,
  OneColumnSectionDiv,
  DisplayLinks,
  PortfolioContext,
} from "jinxui";

import {
  TPortfolio,
  TPage,
  TSection,
  TEditSection,
  TLinkData,
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


/*  Was used in formik, but is redundant now. Will leave in as a 
    basis for touched and error checking if we implement it in the future 
    (commented out to prevent linting warnings 
*/
/*
const EditSchema = Yup.object().shape({
  portfolioName: Yup.string().max(50, "Too Long!").required("Required"),
  sections: Yup.array().of(
    Yup.object().shape({
      content: Yup.string().required("Section must have content"),
    })
  ),
});
*/

// Unutilised, but may come in handly later
// (commented out to prevent linting warnings)
/*
function sectionDataIsEmpty(data: any) {
  return (
    (data.type === "text" && data.content === "") ||
    (data.type === "image" && data.image === 0) ||
    (data.type === "image_text" && data.image === 0 && data.content === "")
  );
}
*/

/* Consider passing as props a bool that signals whether this is an edit of an existing
   portfolio, or a new one entirely */
const Edit = () => {
  // TEST: Remove this when we've decided on an existing portfolio check
  const portfolioExists = true;
  const [redirect, setRedirect] = useState(false);
  const {
    sendFullPortfolio,
    getFullPortfolio,
    getSavedPortfolioId,
    userData,
    switchLightThemeMode,
    getSavedLightThemeMode,
    makePortfolioPublic,
    setSaving,
    savingState,
  } = useUser();

  const {
    fetchPortfolio,
    getSavedPortfolio,
    setPortfolioName,
  } = usePortfolio();

  const {
    fetchPages,
    setPages,
    getSavedPages,
  } = usePage();

  const {
    fetchSections,
    getSavedSections,
    handleContentChange,
    handleTitleChange,
  } = useSection();

  const {
    fetchPageLinks,
    getSavedLinks,
    setLinks,
  } = useLink();
  // const [state, updateState] = useContext(PortfolioContext);


  // const [theme, setTheme] = useState(true);
  const appliedTheme = createMuiTheme(
    getSavedLightThemeMode() ? LightTheme : DarkTheme
  );
  // const [portfolio, setPortfolio] = useState<TPortfolio>(defaultPortfolioContext);
  // const [pages, setPages] = useState<TPage[]>([]);
  // const [sections, setSections] = useState<TEditSection[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  // const [links, setLinks] = useState<TLinkData[]>([]);
  // Call useEffect to fetch an existing portfolio's data



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
      setSaving(false);
    }
  }, []);

  useEffect(() => {
    setIsSaving(savingState);
  }, [savingState]);

  /**
   * Prepare section data for sending to backend.
   * 1. Remove unique identifiers
   * 2. Override section numbers
   * 3. Remove empty sections entirely
   */
  const cleanedSections = () => {
    // Deep copy sections
    const sectionsCopy = JSON.parse(JSON.stringify(getSavedSections()));
    // const sectionsCopy = JSON.parse(JSON.stringify(sections));
    
    var cleanSections = sectionsCopy.map(
      (section: TEditSection, index: number) => {
        const newSection = section;
        // Delete uid field: fear not the linting error!
        // eslint-disable-next-line
        delete newSection.uid;
        // Overwrite the section order number
        newSection.number = index;
        return newSection;
      }
      );
    // Remove empty sections
    // TO DO: make this happen in a single pass (i.e. above) with a for loop instead of map
    return cleanSections.filter(sectionIsNotBlank);
  };

  /** Some shocking repeated code because of the gridlock imposed by:
   * 1. handlePublish can't be made async without pulling it out of the Edit component
   * 2. functions that are not components cannot call hooks
   * TODO: burn it and refactor `publish` into a hook method so it can be made async
   */

  /** Save the currently edited page to the backend without redirecting. */
  const handleSave = () => {

    setSaving(true);
    const sections = cleanedSections();
    sendFullPortfolio(getSavedPortfolio(), getSavedPages(), getSavedSections(), getSavedLinks(), portfolioExists)
      .then((response: any) => {
        setSaving(false);
        setSuccessMessage("Portfolio saved");
      })
      .catch(() => {
        setSaving(false);
        setErrorMessage("Unable to save portfolio, something went wrong");
      });
  };

  /** Save the currently edited page to the backend and redirect to display page. */
  const handlePublishAndRedirect = () => {
    if (getSavedPortfolio()) {
      setSaving(true);
      const sections = cleanedSections();

      sendFullPortfolio(getSavedPortfolio(), getSavedPages(), getSavedSections(), getSavedLinks(), portfolioExists)
        .then(() => {
          makePortfolioPublic(getSavedPortfolio().id)
            .then(() => {
              setSaving(false);
              setRedirect(true);
            })
            .catch(() => {
              setErrorMessage("Something went wrong");
            });
        })
        .catch(() => {
          setSaving(false);
          setErrorMessage("Unable to save portfolio, something went wrong");
        });
    }
  };

  const sectionIsNotBlank = (section: TEditSection) => {
    if (section.type === "text") {
      return section.name !== "" || section.content !== "";
    } else if (section.type === "image") {
      return section.name !== "" || section.path !== "";
    } else if (section.type === "image_text") {
      return (
        section.name !== "" || section.path !== "" || section.content !== ""
      );
    } else {
      return true;
    }
  };

  const LoadingSections = (props: any) => {
    const LoadingText = ({ rows }: { rows: number }) => {
      return (
        <>
          {[...Array(rows)].map((item: any, index: number) => (
            <Skeleton key={index} />
          ))}
        </>
      );
    };

    const LoadingTitle = () => <Skeleton width="40%" height="4em" />;

    const LoadingMedia = () => <Skeleton variant="rect" height="20em" />;

    const LoadingTextSection = () => (
      <Grid container direction="column">
        <LoadingTitle />
        <LoadingText rows={5} />
      </Grid>
    );

    const LoadingMediaSection = () => (
      <Grid container>
        <LoadingTitle />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <LoadingText rows={10} />
          </Grid>
          <Grid item xs={6}>
            <LoadingMedia />
          </Grid>
        </Grid>
      </Grid>
    );

    return (
      <>
        <ThemeProvider theme={appliedTheme}>
          <CssBaseline />
          <HeaderBar title="Edit" darkTheme={!getSavedLightThemeMode()} />
          <PrimaryColumnDiv>
            <div />
            <Container maxWidth="lg">
              <Grid
                container
                spacing={5}
                direction="column"
                justify="space-evenly"
              >
                {[...Array(4)].map((item: any, index: number) => (
                  <Grid item key={index}>
                    {index % 2 === 0 ? (
                      <LoadingTextSection />
                    ) : (
                      <LoadingMediaSection />
                    )}
                  </Grid>
                ))}
              </Grid>
              <div />
            </Container>
          </PrimaryColumnDiv>
        </ThemeProvider>
      </>
    );
  };



  const DisplaySections = () => {
    return (
      <>
        {getSavedSections().map((section: TEditSection) => {
          if (section.type === "text") {
            return (
              <TextSectionInput
                key={section.uid}
                handleChange={handleContentChange}
                handleTitleChange={handleTitleChange}
                handlePublish={handleSave}
                section={section}
              />
            );
          } else if (section.type === "image") {
            return (
              <ImageSectionInput
                key={section.uid}
                handleTitleChange={handleTitleChange}
                handlePublish={handleSave}
                section={section}
              />
            );
          } else if (section.type === "image_text") {
            return (
              <ImageTextSectionInput
                key={section.uid}
                handleChange={handleContentChange}
                handleTitleChange={handleTitleChange}
                handlePublish={handleSave}
                section={section}
              />
            );
          } else {
            return <></>;
          }
        })}
      </>
    );
  };

  if (redirect) {
    return (
      <Redirect to={Routes.PORTFOLIO_DISPLAY_BASE + "/" + userData.username} />
    );
    // Null check here isn't really necessary, but ensures that the page will load with all TextFields populated
  } else if (
    getSavedPortfolio() &&
    getSavedPages().length !== 0 &&
    getSavedSections().length !== 0
  ) {
    return (
      <>
        <ThemeProvider theme={appliedTheme}>
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
                        defaultValue={getSavedPortfolio().name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setPortfolioName(e.target.value)
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
                        <DisplayLinks/>
                        <LinkDialog/>
                      </LinksDiv>
                    </OneColumnSectionDiv>
                  </PaperSectionStatic>
                {DisplaySections()}

                <PublishCancelDiv>
                  <Tooltip
                    title="Save, make public, and display portfolio"
                    arrow
                  >
                    <TooltipDiv>
                      <PrimaryButton
                        disabled={isSaving}
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
