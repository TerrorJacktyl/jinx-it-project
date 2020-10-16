import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
// import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Button, CssBaseline } from "@material-ui/core";
import { SettingsBrightness } from "@material-ui/icons";

import { TextField } from "@material-ui/core";

import {
  ErrorMessage,
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

const FRONT_END_URL = process.env.REACT_APP_FRONT_URL;

const FormTitle = styled.h2`
  font-weight: 300;
`;


const BottomButtonsDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-around;
  margin: 5px;
  padding: 5px;
`;

/* Was used in formik, but is redundant now. Will leave in as a 
   basis for touched and error checking if we implement it in the future */
const EditSchema = Yup.object().shape({
  portfolioName: Yup.string().max(50, "Too Long!").required("Required"),
  sections: Yup.array().of(
    Yup.object().shape({
      content: Yup.string().required("Section must have content"),
    })
  ),
});

// Unutilised, but may come in handly later
function sectionDataIsEmpty(data: any) {
  return (
    (data.type === "text" && data.content === "") ||
    (data.type === "image" && data.image === 0) ||
    (data.type === "image_text" && data.image === 0 && data.content === "")
  );
}

/* Consider passing as props a bool that signals whether this is an edit of an existing
   portfolio, or a new one entirely */
const Edit = () => {
  // TEST: Remove this when we've decided on an existing portfolio check
  const existingPortfolio = true;
  const blankImage = FRONT_END_URL + "blank_user.png";
  const [published, setPublished] = useState(false);
  const [submittionError, setSubmittionError] = useState(false);
  const blankImagePath = FRONT_END_URL + "blank_user.png";
  const {
    postFullPortfolio,
    putFullPortfolio,
    getFullPortfolio,
    getSavedPortfolioId,
    userData,
    setPrimaryPortfolio,
    switchLightThemeMode,
  } = useUser();
  const [theme, setTheme] = useState(true);
  const appliedTheme = createMuiTheme(theme ? LightTheme : DarkTheme);
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
      console.log(IdSections);
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

  // Changes the path of an existing image section to an uploaded image
  const addImageResponse = (key: any, response: any) => {
    const index = sections.findIndex(
      (section: TEditSection) => section.uid === key
    );
    var newSections = sections;
    newSections[index].path = response.path;
    setSections(newSections);
  };

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

  const handleMoveUp = (key: string) => {
    const index = sections.findIndex(
      (section: TEditSection) => section.uid === key
    );
    if (index === 0) {
      return;
    }
    var newSections = sections as TEditSection[]
    const prevIndex = index - 1
    newSections[index].number -= 1;
    newSections[prevIndex].number += 1; 
    [newSections[prevIndex], newSections[index]] = [newSections[index], newSections[prevIndex]];
    setSections(newSections);
  };

  const handleMoveDown = (key: string) => {
    const index = sections.findIndex(
      (section: TEditSection) => section.uid === key
    );
    if (index === sections.length) {
      return;
    }
    var newSections = sections as TEditSection[]
    const nextIndex = index + 1
    newSections[index].number += 1;
    newSections[nextIndex].number -= 1;
    [newSections[index], newSections[nextIndex]] = [newSections[nextIndex], newSections[index]];
    setSections(newSections);
  }

  // Removes the uid field from each section. Used before data is sent to backend
  const unidentify = () => {
    var noUidSections = sections.map((section: TEditSection) => {
      const newSection = section;
      // Fear not the linting error!
      delete newSection.uid;
      return newSection;
    });
    return noUidSections;
  };

  // Preps the data to be sent to backend, and redirects to display page
  const onPublish = () => {
    const noUidSections = unidentify();
    // TODO: When multiple portoflio are implemented, 
    // set the portfolioId in context to the portfolio being edited.
    // In the case of a new portfolio, will need to wait until the POST response to set this
    if (existingPortfolio) {
      putFullPortfolio(
        portfolio,
        pages, 
        noUidSections
      )
    } else {
      postFullPortfolio(
        portfolio,
        pages, 
        noUidSections
      ); 
    }
    return <Redirect to={Routes.PORTFOLIO_DISPLAY_BASE + "/" + userData.username} />;
  };

  if (published) {
    return onPublish();
  } else {
    return (
      // Null check here isn't really necessary, but ensures that the page will load with all TextFields populated 
      portfolio !== null && pages.length !==0 && sections.length !== 0 ? (
        <>
          <ThemeProvider theme={appliedTheme}>
            <HeaderBar title="Edit" lightTheme>
              <Button
                style={{ height: "100%", borderRadius: 0 }}
                onClick={() => {
                  switchLightThemeMode();
                  setTheme(!theme);
                }}
                color="inherit"
              >
                <SettingsBrightness />
              </Button>
            </HeaderBar>
            <CssBaseline />
            <PrimaryColumnDiv>
              <div></div>
              <div>
                <FormTitle>Enter your information</FormTitle>
                  <form>
                    <PortfolioNameSectionInput
                      title={"Portfolio Name*"}
                      // sectionName={"portfolioName"}
                    >
                      <TextField
                        name={"portfolioName"}
                        defaultValue={portfolio.name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          var newPortfolio = portfolio
                          newPortfolio.name = e.target.value
                          setPortfolio(newPortfolio);
                        }}
                        id="standard-full-width"
                        style={{ margin: 0 }}
                        fullWidth
                        color="secondary"
                      />
                    </PortfolioNameSectionInput>
                    <PortfolioNameSectionInput
                      title={"Page Name*"}
                      // sectionName={"pageName"}
                    >
                      <TextField
                        // TODO: Display and change the current page name when multiple pages are added 
                        name={"pageName"}
                        defaultValue={pages[0].name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          var newPages = pages
                          newPages[0].name = e.target.value
                          setPages(newPages);
                        }}
                        id="standard-full-width"
                        style={{ margin: 0 }}
                        fullWidth
                        color="secondary"
                      />
                      {console.log(portfolio.name)}
                    </PortfolioNameSectionInput>
                    {sections.map((section: TEditSection) => {
                      if (section.type === "text") {
                            return (
                              <TextSectionInput
                                key={section.uid}
                                section={section}
                                handleChange={handleChange}
                                sections={sections}
                                setSections={setSections}
                              />
                            );
                          } else if (section.type === "image") {
                            return (
                              <ImageSectionInput
                                key={section.uid}
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
                                section={section}
                                sections={sections}
                                setSections={setSections}
                              />
                            );
                          }
                    })}
                    <BottomButtonsDiv>
                      <PrimaryButton onClick={(e: React.MouseEvent<HTMLButtonElement>) => setPublished(true)}>PUBLISH</PrimaryButton>
                      <a href={Routes.HOME}>
                        <SecondaryButton>Cancel</SecondaryButton>
                      </a>
                    </BottomButtonsDiv>
                    {submittionError ? (
                      <ErrorMessage>
                        Error signing up. Please try again later.
                      </ErrorMessage>
                    ) : null}
                  </form>
                </div>
              <div></div>
              </PrimaryColumnDiv>
          </ThemeProvider>
        </>) 
      : null
    );
  }
};
export default Edit;
