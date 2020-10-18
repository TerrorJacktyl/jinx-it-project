import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Button, CssBaseline } from "@material-ui/core";
import { SettingsBrightness } from "@material-ui/icons";
import CloseIcon from "@material-ui/icons/Close";

import { TextField } from "@material-ui/core";

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
} from "jinxui";

import { TPortfolio, TPage, TSection, TEditSection } from "jinxui/types";
import { truncate } from "fs";

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
  const [redirect, setRedirect] = useState(false);
  // TEST: Remove this when we've decided on an existing portfolio check
  const existingPortfolio = true;
  const [published, setPublished] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const {
    postFullPortfolio,
    putFullPortfolio,
    getFullPortfolio,
    getSavedPortfolioId,
    userData,
    switchLightThemeMode,
    getSavedLightThemeMode,
  } = useUser();
  // const [theme, setTheme] = useState(true);
  const appliedTheme = createMuiTheme(
    getSavedLightThemeMode() ? LightTheme : DarkTheme
  );
  const [portfolio, setPortfolio] = useState<TPortfolio>(null);
  const [pages, setPages] = useState<TPage[]>([]);
  const [sections, setSections] = useState<TEditSection[]>([]);
  // Call useEffect to fetch an existing portfolio's data
  useEffect(() => {
    const fetchExistingPortfolio = async () => {
      // OK to get saved portfolioId from context rather then fetching from backend
      // as primary_portfolio is fetched upon login
      const portfolioId = await getSavedPortfolioId();
      const { portfolio, pages, sections } = await getFullPortfolio(
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
    };

    if (existingPortfolio) {
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
    }
  }, []);

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

  // Removes the uid field from each section. Used before data is sent to backend
  const unidentify = () => {
    const sectionsCopy = JSON.parse(JSON.stringify(sections))
    var noUidSections = sectionsCopy.map((section: TEditSection) => {
        const newSection = section;
        // Fear not the linting error!
        delete newSection.uid;
        return newSection;
    });
    // return noUidSections;
    return noUidSections.filter(sectionIsNotBlank);
  };

  const sectionIsNotBlank = (section: TEditSection) => {
    if (section.type === "text") {
      return section.name !== "" || section.content !== ""
    } else if (section.type === "image") {
      return section.name !== "" || section.path !== ""
    } else if (section.type === "image_text") {
      return section.name !== "" || section.path !== "" || section.content !== ""
    } else {
      return true
    }
  }

  const handlePublish = () => {
    const noUidSections = unidentify();
    // TODO: When multiple portoflio are implemented,
    // set the portfolioId in context to the portfolio being edited.
    // In the case of a new portfolio, will need to wait until the POST response to set this
    if (existingPortfolio) {
      putFullPortfolio(portfolio, pages, noUidSections);
    } else {
      postFullPortfolio(portfolio, pages, noUidSections);
    }
  };

  // Preps the data to be sent to backend, and redirects to display page
  const onPublishAndRedirect = () => {
    handlePublish();
    return (
      <Redirect to={Routes.PORTFOLIO_DISPLAY_BASE + "/" + userData.username} />
    );
  };

  const onCancel = () => {
    return (
      <Redirect to={Routes.PORTFOLIO_DISPLAY_BASE + "/" + userData.username} />
    );
  };

  if (published) {
    return onPublishAndRedirect();
  } else if (cancelled) {
    return onCancel();
  } else {
    return (
      // Null check here isn't really necessary, but ensures that the page will load with all TextFields populated
      portfolio !== null && pages.length !== 0 && sections.length !== 0 ? (
        <>
          <ThemeProvider theme={appliedTheme}>
            <HeaderBar title="Edit" lightTheme={getSavedLightThemeMode()}>
              <Button
                style={{ height: "100%", borderRadius: 0 }}
                onClick={() => {
                  switchLightThemeMode().then((response) => {});
                }}
                color="inherit"
              >
                <SettingsBrightness />
              </Button>
            </HeaderBar>
            <Button
              style={{ position: "absolute", top: 50, right: 0 }}
              onClick={() => {
                setCancelled(true);
              }}
              color="inherit"
            >
              <CloseIcon style={{ fontSize: 40 }} />
            </Button>
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
                        var newPortfolio = portfolio;
                        newPortfolio.name = e.target.value;
                        setPortfolio(newPortfolio);
                      }}
                      id="standard-full-width"
                      fullWidth
                      color="secondary"
                    />
                    <TextField
                      // TODO: Display and change the current page name when multiple pages are added
                      name={"pageName"}
                      label={"Page Name"}
                      defaultValue={pages[0].name}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        var newPages = pages;
                        newPages[0].name = e.target.value;
                        setPages(newPages);
                      }}
                      id="standard-full-width"
                      fullWidth
                      color="secondary"
                    />
                    
                  </PortfolioNameSectionInput>
                  {sections.map((section: TEditSection) => {
                    if (section.type === "text") {
                      return (
                        <TextSectionInput
                          key={section.uid}
                          section={section}
                          handleChange={handleChange}
                          handleTitleChange={handleTitleChange}
                          handlePublish={handlePublish}
                          sections={sections}
                          setSections={setSections}
                        />
                      );
                    } else if (section.type === "image") {
                      return (
                        <ImageSectionInput
                          key={section.uid}
                          handleTitleChange={handleTitleChange}
                          handlePublish={handlePublish}
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
                          handlePublish={handlePublish}
                          section={section}
                          sections={sections}
                          setSections={setSections}
                        />
                      );
                    } else {
                      return <></>;
                    }
                  })}
                  <PublishCancelDiv>
                    <PrimaryButton
                      onClick={() => (
                        setPublished(true)
                      )}
                    >
                      PUBLISH
                    </PrimaryButton>
                    <a href={Routes.HOME}>
                      <SecondaryButton>Cancel</SecondaryButton>
                    </a>
                  </PublishCancelDiv>
                </form>
              </div>
              <div></div>
            </PrimaryColumnDiv>
          </ThemeProvider>
        </>
      ) : null
    );
  }
};
export default Edit;
