import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import { Button, CssBaseline, Typography } from "@material-ui/core";
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
  PrimaryColumnDiv,
  SecondaryButton,
  NewSectionMenu,
  TextSectionInput,
  ImageSectionInput,
  ImageTextSectionInput,
  PortfolioNameSectionInput,
  Routes,
} from "jinxui";

import { TSection, TPortfolioData, TPageData, TSectionData, } from "./jinxui/types/PortfolioTypes"

const FRONT_END_URL = "http://localhost:3000/";

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
});

function sectionDataIsEmpty(data: TSection) {
  return (
    (data.type === "text" && data.content === "") ||
    (data.type === "image" && data.image === 0) ||
    (data.type === "image_text" && data.image === 0 && data.content === "")
  );
}

function PostSection(
  postSection: Function,
  portfolio_id: string,
  page_id: string,
  data: TSection
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

const Edit = () => {
  const [redirect, setRedirect] = useState(false);
  const [submittionError, setSubmittionError] = useState(false);
  const [bioImageResponse, setBioImageResponse] = useState({
    path: FRONT_END_URL + "blank_user.png",
    id: null,
  });
  const [awesomeImageResponse, setAwesomeImageResponse] = useState({
    path: FRONT_END_URL + "blank_user.png",
    id: null,
  });
  const {
    postPortfolio,
    postPage,
    postSection,
    savePortfolioId,
    switchLightThemeMode,
  } = useUser();
  const [theme, setTheme] = useState(true);
  const appliedTheme = createMuiTheme(theme ? LightTheme : DarkTheme);
  // const classes = useStyles();

  const onPublish = () => {
    return <Redirect to={Routes.PORTFOLIO_DISPLAY} />;
  };

  if (redirect) {
    return onPublish();
  } else {
    return (
      <>
        <ThemeProvider theme={appliedTheme}>
          <HeaderBar lightTheme={theme}>
            <Button
              style={{ height: "100%" }}
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
                initialValues={{
                  websiteName: "",
                  biography: "",
                  academicHistory: "",
                  professionalHistory: "",
                }}
                validationSchema={EditSchema}
                onSubmit={(values, { setSubmitting }) => {
                  const portfolio_data = {
                    name: values.websiteName,
                  };
                  const page_data = {
                    name: "Home",
                    number: 0,
                  };
                  const bio_data = {
                    name: "Biography",
                    number: 0,
                    image: bioImageResponse.id,
                    content: values.biography,
                    type: "image_text",
                  };
                  const academic_data = {
                    name: "Academic history",
                    number: 0,
                    content: values.academicHistory,
                    type: "text",
                  };
                  const awesome_data = {
                    name: "Awesome image",
                    number: 0,
                    image: awesomeImageResponse.id,
                    type: "image",
                  };
                  const professional_data = {
                    name: "Professional history",
                    number: 0,
                    content: values.professionalHistory,
                    type: "text",
                  };
                  setSubmitting(true);
                  postPortfolio(portfolio_data)
                    .then(function (portfolio_response: any) {
                      const portfolio_id = portfolio_response.data.id;

                      postPage(portfolio_id, page_data)
                        .then(function (page_response: any) {
                          console.log(page_response);
                          const page_id = page_response.data.id;
                          PostSection(
                            postSection,
                            portfolio_id,
                            page_id,
                            bio_data
                          );
                          PostSection(
                            postSection,
                            portfolio_id,
                            page_id,
                            academic_data
                          );
                          PostSection(
                            postSection,
                            portfolio_id,
                            page_id,
                            awesome_data
                          );
                          PostSection(
                            postSection,
                            portfolio_id,
                            page_id,
                            professional_data
                          );
                        })
                        .catch(function (error: any) {
                          console.log(error);
                          setSubmitting(false);
                        });
                      savePortfolioId(parseInt(portfolio_id));
                      setSubmitting(false);
                      setRedirect(true);
                    })
                    .catch(function (error: any) {
                      setSubmittionError(true);
                      setSubmitting(false);
                      console.log(error);
                      console.log(submittionError);
                    });
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
                    {ImageTextSectionInput(
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
                    <BetweenSections />
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
