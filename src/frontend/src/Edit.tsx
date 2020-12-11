import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Button, CssBaseline, Icon } from "@material-ui/core";
import { SettingsBrightness } from "@material-ui/icons";
import Skeleton from "@material-ui/lab/Skeleton";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import { InputAdornment } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import Typography from "@material-ui/core/Typography";

import {
  LightTheme,
  DarkTheme,
  useUser,
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
  LinkDialog,
  LinkDisplayIcon,
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

// const scrollToRef = (ref: any) => window.scrollTo({top: 100})

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

  // const [theme, setTheme] = useState(true);
  const appliedTheme = createMuiTheme(
    getSavedLightThemeMode() ? LightTheme : DarkTheme
  );
  const [portfolio, setPortfolio] = useState<TPortfolio>(null);
  const [pages, setPages] = useState<TPage[]>([]);
  const [sections, setSections] = useState<TEditSection[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [links, setLinks] = useState<TLinkData[]>([]);
  // Call useEffect to fetch an existing portfolio's data
  useEffect(() => {
    const fetchExistingPortfolio = async () => {
      // OK to get saved portfolioId from context rather then fetching from backend
      // as primary_portfolio is fetched upon login
      const portfolioId = await getSavedPortfolioId();
      const { portfolio, pages, sections, links } = await getFullPortfolio(
        portfolioId
      );
      setPortfolio(portfolio);
      setPages(pages);
      // Assign each section a unique id so that they may be identified through in callback functions
      const IdSections = sections.map((section: TSection) => {
        const uidPair = { uid: uuidv4() };
        const newSection = { ...section, ...uidPair };
        return newSection;
      });
      setSections(IdSections);
      setLinks(links)
    };

    if (portfolioExists) {
      fetchExistingPortfolio();
    } else {
      const newPortfolio = { name: "" } as TPortfolio;
      const newPage = [{ name: "home", number: 0 }] as TPage[];
      const newSection = [
        { name: "First", number: 0, content: "", type: "text", uid: uuidv4() },
      ] as TEditSection[];
      setPortfolio(newPortfolio);
      setPages(newPage);
      setSections(newSection);
      setSaving(false);
    }
  }, []);

  useEffect(() => {
    setIsSaving(savingState);
  }, [savingState]);

  // Updates a section's content if it has been changed within the text field
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    const index = sections.findIndex(
      (section: TEditSection) => section.uid === key
    );
    var newSections = sections;
    newSections[index].content = e.target.value;
    setSections(newSections);
  };

  const handleTitleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    const index = sections.findIndex(
      (section: TEditSection) => section.uid === key
    );
    var newSections = sections;
    newSections[index].name = e.target.value;
    setSections(newSections);
  };

  /**
   * Prepare section data for sending to backend.
   * 1. Remove unique identifiers
   * 2. Override section numbers
   * 3. Remove empty sections entirely
   */
  const cleanedSections = () => {
    // Deep copy sections
    const sectionsCopy = JSON.parse(JSON.stringify(sections));

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
    sendFullPortfolio(portfolio, pages, sections, links, portfolioExists)
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
    if (portfolio) {
      setSaving(true);
      const sections = cleanedSections();

      sendFullPortfolio(portfolio, pages, sections, links, portfolioExists)
        .then(() => {
          makePortfolioPublic(portfolio.id)
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

  const DisplayLinks = () => {
    return (
      <>
        {links.map((link: TLinkData) => {
          if (link)
          {
            return (
                <Button key={link.id}>
                  <LinkDisplayIcon icon={link?.icon} />
                  <Typography variant="h6">
                    {link.title}
                  </Typography>
                </Button>
            );
          }
        })}
      </>
    );
  };

  const DisplaySections = () => {
    return (
      <>
        {sections.map((section: TEditSection) => {
          if (section.type === "text") {
            return (
              <TextSectionInput
                key={section.uid}
                section={section}
                handleChange={handleChange}
                handleTitleChange={handleTitleChange}
                handlePublish={handleSave}
                sections={sections}
                setSections={setSections}
              />
            );
          } else if (section.type === "image") {
            return (
              <ImageSectionInput
                key={section.uid}
                handleTitleChange={handleTitleChange}
                handlePublish={handleSave}
                section={section}
                sections={sections}
                setSections={setSections}
              />
            );
          } else if (section.type === "image_text") {
            return (
              <ImageTextSectionInput
                key={section.uid}
                handleChange={handleChange}
                handleTitleChange={handleTitleChange}
                handlePublish={handleSave}
                section={section}
                sections={sections}
                setSections={setSections}
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
    portfolio !== null &&
    pages.length !== 0 &&
    sections.length !== 0
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
                <PortfolioNameSectionInput
                  title={""} // A title here would be confusing
                >
                  <TextField
                    name={"portfolioName"}
                    label={"Portfolio Name"}
                    defaultValue={portfolio.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setPortfolio({
                        ...portfolio,
                        name: e.target.value,
                      });
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
                    <LinkDialog links={links} setLinks={setLinks} />
                  </LinksDiv>
                </PortfolioNameSectionInput>
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
