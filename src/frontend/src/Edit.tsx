import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Button, CssBaseline } from "@material-ui/core";
import { SettingsBrightness } from "@material-ui/icons";

import { TextField } from "formik-material-ui";

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

const EditSchema = Yup.object().shape({
  websiteName: Yup.string().max(50, "Too Long!").required("Required"),
  sections: Yup.array().of(
    Yup.object().shape({
      content: Yup.string().required("Section must have content"),
    })
  ),
});

function sectionDataIsEmpty(data: any) {
  return (
    (data.type === "text" && data.content === "") ||
    (data.type === "image" && data.image === 0) ||
    (data.type === "image_text" && data.image === 0 && data.content === "")
  );
}

function PostSection(
  postSection: any,
  portfolio_id: string,
  page_id: string,
  data: any
) {
  if (!sectionDataIsEmpty(data)) {
    postSection(portfolio_id, page_id, data)
      .then(function (response: any) {
        console.log(response);
      })
      .catch(function (error: any) {
        console.log(error);
      });
  }
}

// const BetweenSections = () => {
//   return <NewSectionMenu />;
// };

/* Consider passing as props a bool that signals whether this is an edit of an existing
   portfolio, or a new one entirely */
const Edit = () => {
  // TEST: Remove this when we've decided on an existing portfolio check
  const existingPortfolio = true;
  const blankImage = FRONT_END_URL + "blank_user.png";
  const [redirect, setRedirect] = useState(false);
  const [submittionError, setSubmittionError] = useState(false);
  const blankImagePath = FRONT_END_URL + "blank_user.png";
  const {
    postFullPortfolio,
    putFullPortfolio,
    putSections,
    postPortfolio,
    postPage,
    postSection,
    savePortfolioId,
    getFullPortfolio,
    getSavedPortfolioId,
    switchLightThemeMode,
  } = useUser();
  const [theme, setTheme] = useState(true);
  const appliedTheme = createMuiTheme(theme ? LightTheme : DarkTheme);
  const [portfolio, setPortfolio] = useState<TPortfolio>(null);
  const [pages, setPages] = useState<TPage[]>([]);
  const [sections, setSections] = useState<TEditSection[]>([]);
  // const classes = useStyles();
  // Call useEffect to fetch an existing portfolio's data
  useEffect(() => {
    const fetchExistingPortfolio = async () => {
      const portfolioId = await getSavedPortfolioId();
      const { portfolio, pages, sections } = await getFullPortfolio(
        portfolioId
      );
      setPortfolio(portfolio);
      setPages(pages);
      const IdSections = sections.map((section: TSection, i) => {
        const uidPair = { uid: uuidv4() };
        const newSection = { ...section, ...uidPair };
        return newSection;
      });
      // console.log(IdSections);
      setSections(IdSections);
    };

    if (existingPortfolio) {
      fetchExistingPortfolio();
    } else {
      const newPortfolio = { name: "" };
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
  /* Maybe be better to do this through formik with .values as it was originally implemented
     but this works for now */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    const index = sections.findIndex(
      (section: TEditSection) => section.uid === key
    );
    var newSections = sections;
    newSections[index].content = e.target.value;
    // console.log(newSections);
    setSections(newSections);
  };

  // TEST: See if this works within formik's onSubmit, as onSubmit may be a custom hook
  const unidentify = () => {
    var noUidSections = sections.map((section: TEditSection, i) => {
      const newSection = section;
      delete newSection.uid;
      return newSection;
    });
    return noUidSections;
  };

  const onPublish = async () => {
    return <Redirect to={Routes.PORTFOLIO_DISPLAY} />;
  };

  if (redirect) {
    return onPublish();
  } else {
    return (
      <>
        <ThemeProvider theme={appliedTheme}>
          <HeaderBar title="title" lightTheme>
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
              <Formik
                // TODO: Add the initial case for a new portfolio, and add a check on props
                // Maybe be more helpful to use mapValuesToProps
                // TEST: filter and reduce for sections now may be redundant as we are handling onChange manually
                initialValues={sections
                  .filter((section: any) => {
                    return (
                      section.type === "text" || section.type === "image_text"
                    );
                  })
                  .reduce(
                    (acc, currSection) => {
                      const newPair = {
                        [currSection.uid]: currSection.content,
                      };
                      const newAcc = { ...acc, ...newPair };
                      // console.log(newAcc);
                      return newAcc;
                      // TODO: Initialise Accumulator with existing portfolio name
                    },
                    portfolio === null
                      ? { portfolioName: "" }
                      : { portfolioName: portfolio.name }
                  )}
                // TODO: Redo EditSchema for dynamic sections
                validationSchema={EditSchema}
                onSubmit={(values, { setSubmitting }) => {
                  // TEST: This is purely a placeholder until onChange bug is solved
                  const portfolio_data = {
                    name: values.portfolioName,
                  };
                  setSubmitting(true);
                  // TEST: Test for type errors and that uid is removed before submission
                  const noUidSections = unidentify();
                  if (existingPortfolio) {
                    putFullPortfolio(portfolio, pages, noUidSections);
                  } else {
                    postFullPortfolio(portfolio_data, pages, noUidSections);
                  }
                  setSubmitting(false);
                  setRedirect(true);
                }}
              >
                {({ errors, touched, isSubmitting }) => (
                  <Form>
                    {portfolio !== null ? (
                      <PortfolioNameSectionInput
                        title={"Portfolio Name*"}
                        sectionName={"portfolioName"}
                      >
                        <Field
                          component={TextField}
                          name={"portfolioName"}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            var newPortfolio = portfolio;
                            newPortfolio.name = e.target.value;
                            setPortfolio(newPortfolio);
                          }}
                          id="standard-full-width"
                          style={{ margin: 0 }}
                          fullWidth
                          color="secondary"
                        />
                        {/* {console.log(portfolio.name)} */}
                      </PortfolioNameSectionInput>
                    ) : null}
                    {/* <BetweenSections /> */}
                    {existingPortfolio && sections.length !== 0
                      ? sections.map((section: TEditSection) => {
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
                        })
                      : null}
                    <BottomButtonsDiv>
                      <PrimaryButton type="submit">PUBLISH</PrimaryButton>
                      <a href={Routes.HOME}>
                        <SecondaryButton>Cancel</SecondaryButton>
                      </a>
                    </BottomButtonsDiv>
                    {submittionError ? (
                      <ErrorMessage>
                        Error signing up. Please try again later.
                      </ErrorMessage>
                    ) : null}
                  </Form>
                )}
              </Formik>
            </div>
            <div></div>
          </PrimaryColumnDiv>
        </ThemeProvider>
      </>
    );
  }
};
export default Edit;
