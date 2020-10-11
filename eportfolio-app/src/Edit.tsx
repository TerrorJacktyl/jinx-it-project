import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { TPage, TSection, TEditSection } from "./Types";
import {
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import { Button, CssBaseline } from "@material-ui/core";
import { SettingsBrightness } from "@material-ui/icons";

import { TextField } from "formik-material-ui";

import {
  ErrorMessage,
  FormDiv,
  LightTheme,
  DarkTheme,
  useUser,
  HeaderBar,
  PrimaryButton,
  SecondaryButton,
  NewSectionMenu,
  TextSectionInput,
  ImageSectionInput,
  ImageTextSectionInput,
  PortfolioNameSectionInput,
  Routes,
} from "jinxui";

const FRONT_END_URL = "http://localhost:3000/";

const WideFormDiv = styled(FormDiv)`
  width: 920px;
`;

const FormTitle = styled.h2`
  font-weight: 300;
`;

const StyledFormDiv = styled(WideFormDiv)`
  margin-top: 70px;
  height: auto;
  margin-bottom: 100px;
  width: 90%;
  display: grid;
  grid-template-columns: 1fr minMax(200px, 900px) 1fr;
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
    Yup.object().shape(
      {
        content: Yup.string().required("Section must have content")
      }
    )
  )
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

const BetweenSections = () => {
  return <NewSectionMenu />;
};

/* Consider passing as props a bool that signals whether this is an edit of an existing
   portfolio, or a new one entirely */
const Edit = () => {
  // TEST: Remove this when we've decided on an existing portfolio check
  const existingPortfolio = true;
  const [redirect, setRedirect] = useState(false);
  const [submittionError, setSubmittionError] = useState(false);
//  const [bioImageResponse, setBioImageResponse] = useState({
//    path: FRONT_END_URL + "blank_user.png",
//    id: null,
//  });
//  const [awesomeImageResponse, setAwesomeImageResponse] = useState({
//    path: FRONT_END_URL + "blank_user.png",
//    id: null,
//  });
  const blankImagePath = FRONT_END_URL + "blank_user.png";
  const {
    postFullPortfolio,
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
  const [portfolioId, setPortfolioId] = useState(-1);
  const [pages, setPages] = useState<TPage[]>([]);
  const [sections, setSections] = useState<TEditSection[]>([]);
  // const classes = useStyles();
  // Call useEffect to fetch an existing portfolio's data
  useEffect (() => {

    const fetchExistingPortfolio = async () => {
      const portfolioId = await getSavedPortfolioId();
      const { portfolio, pages, sections } = await getFullPortfolio(portfolioId);
      setPortfolioId(portfolioId);
      setPages(pages);
      const IdSections = sections.map((section: TSection) => {
        const uidPair = { 'uid': uuidv4() };
        const newSection = { ...section, ...uidPair };
        return newSection;
      })
      console.log(IdSections);
      setSections(IdSections); 
    }

    if (existingPortfolio) {
      fetchExistingPortfolio();
    }
  }, []);

  // Changes the path of an existing image section to an uploaded image
  // Watch out for key type as it may be string and uid may be number
  const addImageResponse = (key: any, response: any) => {
    const index = sections.findIndex((section: TEditSection) => section.uid === key);
    var newSections = sections
    newSections[index].path = response.path
    setSections(newSections);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    const index = sections.findIndex((section: TEditSection) => section.uid === key);
    var newSections = sections
    console.log(newSections);
    newSections[index].content = e.target.value
    console.log(newSections);
    setSections(newSections);
  }

  const onPublish = async () => {
    return <Redirect to={Routes.PORTFOLIO_DISPLAY} />;
  };

  if (redirect) {
    return onPublish();
  } else {
    return (
      <>
        <ThemeProvider theme={appliedTheme}>
          <HeaderBar>
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
          <StyledFormDiv>
            <div></div>
            <div>
              <FormTitle>Enter your information</FormTitle>
              <Formik
                // TODO: Add the initial case for a new portfolio, and add a check on props 
                // Maybe be helpful to use mapValuesToProps
                initialValues={
                  sections.filter((section: any) => {
                    return (section.type === "text");
                  })
                  .reduce((acc, currSection) => {
                    const newPair = { [currSection.uid]: currSection.content };
                    const newAcc = { ...acc, ...newPair };
                    return newAcc;
                    // TODO: Initialise Accumulator with existing portfolio name
                  }, { websiteName: "", })
                }
//                  websiteName: "",
//                  biography: "",
//                  academicHistory: "",
//                  professionalHistory: "",
                // TODO: Redo EditSchema for dynamic sections
                validationSchema={EditSchema}
                onSubmit={(values, { setSubmitting }) => {
                  const portfolio_data = {
                    name: values.websiteName,
                  };
                  const page_data = {
                    name: "home",
                    number: 0,
                  };
//                  const bio_data = {
//                    name: "biography",
//                    number: 0,
//                    image: bioImageResponse.id,
//                    content: values.biography,
//                    type: "image_text",
//                  };
//                  const academic_data = {
//                    name: "academic_history",
//                    number: 0,
//                    content: values.academicHistory,
//                    type: "text",
//                  };
//                  const awesome_data = {
//                    name: "awesome_image",
//                    number: 0,
//                    image: awesomeImageResponse.id,
//                    type: "image",
//                  };
//                  const professional_data = {
//                    name: "professional_history",
//                    number: 0,
//                    content: values.professionalHistory,
//                    type: "text",
//                  };
                  setSubmitting(true);
                  // TODO: Add seperate function for updating an existing portoflio
                  // TODO: Remove uid field from each section object before submission
                  postFullPortfolio(
                    portfolio_data, 
                    [page_data], 
                    sections
                  ); 
                  setSubmitting(false);
                  setRedirect(true);
//                  postPortfolio(portfolio_data)
//                    .then(function (portfolio_response: any) {
//                      const portfolio_id = portfolio_response.data.id;
//                      postPage(portfolio_id, page_data)
//                        .then(function (page_response: any) {
//                          console.log(page_response);
//                          const page_id = page_response.data.id;
//                          PostSection(
//                            postSection,
//                            portfolio_id,
//                            page_id,
//                            bio_data
//                          );
//                          PostSection(
//                            postSection,
//                            portfolio_id,
//                            page_id,
//                            academic_data
//                          );
//                          PostSection(
//                            postSection,
//                            portfolio_id,
//                            page_id,
//                            awesome_data
//                          );
//                          PostSection(
//                            postSection,
//                            portfolio_id,
//                            page_id,
//                            professional_data
//                          );
//                        })
//                        .catch(function (error: any) {
//                          console.log(error);
//                          setSubmitting(false);
//                        });
//                      savePortfolioId(parseInt(portfolio_id));
//                      setSubmitting(false);
//                      setRedirect(true);
//                    })
//                    .catch(function (error: any) {
//                      setSubmittionError(true);
//                      setSubmitting(false);
//                      console.log(error);
//                      console.log(submittionError);
//                    });
                }}
              >
                {({ errors, touched, isSubmitting }) => (
                  <Form>
                    <PortfolioNameSectionInput
                      title={"Website Name*"}
                      sectionName={"websiteName"}
                    >
                      <Field
                        component={TextField}
                        className={"websiteName"}
                        name={"websiteName"}
                        id="standard-full-width"
                        style={{ margin: 0 }}
                        fullWidth
                        color="secondary"
                      />
                    </PortfolioNameSectionInput>
                    <BetweenSections />
                    {(existingPortfolio && sections.length !== 0)
                      ? sections.map((section: TEditSection) => {
                        if (section.type === "text") {
                          return (
                            TextSectionInput(
                              section.name,
                              section.content,
                              section.uid,
                              handleChange
                              // TODO: Fix implicit any type error coming from initial values, currently commented out
                              /*touched={touched[section.uid]}
                              errors={errors[section.uid]}*/
                            )
                          );
                        } else if (section.type === "image") {
                            return (
                              ImageSectionInput(
                                section.name,
                                section.uid,
                                section.path, 
                                addImageResponse
                              )
                            );
                        } else {
                          return (
                            ImageTextSectionInput(
                              section.name,
                              section.uid,
                              section.content,
                              section.path,
                              handleChange,
                              addImageResponse
                              // TODO: Fix implicit any type error coming from initial values, currently commented out
                              /*touched[section.uid],
                              errors[section.uid]*/
                            )
                          );
                        }
                      }) : null
                    }
                      {/*{ImageTextSectionInput(
                        "Biography",
                        "biography",
                        touched.biography,
                      errors.biography,
                      bioImageResponse,
                      setBioImageResponse
                    )}
                    <BetweenSections />
                    {errors.academicHistory && touched.academicHistory ? (
                      <ErrorMessage>{errors.academicHistory}</ErrorMessage>
                    ) : null}
                    <TextSectionInput
                      title="Academic History"
                      sectionName="academicHistory"
                      touched={touched.academicHistory}
                      errors={errors.academicHistory}
                    />
                    <BetweenSections />
                    {ImageSectionInput(
                      "Awesome Image",
                      "awesomeImage",
                      awesomeImageResponse,
                      setAwesomeImageResponse
                    )}
                    <BetweenSections />*/}
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
          </StyledFormDiv>
        </ThemeProvider>
      </>
    );
  }
};
export default Edit;