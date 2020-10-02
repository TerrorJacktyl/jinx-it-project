import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
  createStyles,
} from "@material-ui/core/styles";
import {
  Paper,
  Button,
  CssBaseline,
  Menu,
  MenuProps,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import {
  AddPhotoAlternateOutlined,
  SettingsBrightness,
  Add,
  InsertPhotoSharp,
  SubjectSharp,
  VerticalSplitSharp,
} from "@material-ui/icons";

import { TextField } from "formik-material-ui";

import Image from "../images/Logo_Background.svg";

import {
  ErrorMessage,
  FormDiv,
  LightTheme,
  DarkTheme,
  useUser,
  UserImage,
  HeaderBar,
  PrimaryMenuItem,
  PrimaryMenu,
  PaperSection,
  NewSectionMenu,
  UploadImageSubSection,
  TextSectionInput,
  // PortfolioNameSection
} from "jinxui";


import PortfolioNameSection from "jinxui/components/edit/PortfolioNameSection"
const FRONT_END_URL = "http://localhost:3000/";

const useStyles = makeStyles((theme: any) =>
  createStyles({
    root: {},
    transparentHoverFocus: {
      "&:hover, &.Mui-focusVisible": {
        backgroundColor: "transparent",
      },
    },
    publishButton: {
      width: "100%",
      height: "100%",
      fontSize: 16,
      fontWeight: 400,
      border: "1px solid",
      "&:hover": {
        border: "1px solid",
      },
    },
    cancelButton: {
      width: "100%",
      height: "100%",
      fontWeight: 300,
    },
    menuButton: {
      marginRight: theme.spacing(0),
    },
    title: {
      flexGrow: 1,
      textAlign: "left",
      margin: 10,
      fontWeight: 400,
    },
    toolbar: {
      height: 50,
      margin: 0,
    },
    textFieldMain: {
      lineHeight: 4,
      letterSpacing: "0.03333em",
    },
  })
);

const SectionDiv = styled.div`
  margin-top: 0px;
  margin-bottom: 30px;
  display: grid;
  grid-template-rows: 100px, 1fr;
`;

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
  display: grid;
  grid-template-columns:
    5% minMax(40px, 200px) minMax(10%, auto)
    minMax(40px, 200px) 5%;
  grid-template-rows: 40px;
  margin-top: 30px;
`;

const OneColumnSectionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  margin: 30px;
  margin-bottom: 15px;
  direction: column;
`;


const TwoColumnSectionGrid = styled(OneColumnSectionGrid)`
  grid-template-columns: 1fr 1fr;
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
  grid-gap: 60px;
`;



const ProfileSchema = Yup.object().shape({
  websiteName: Yup.string().max(50, "Too Long!").required("Required"),
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

// const OneColumnThinSectionGrid = styled.div`
//   display: grid;
//   grid-template-columns: 1fr;
//   margin: 30px;
//   margin-bottom: 10px;
// `;

// const SingleLineRequiredGrid = styled.div`
//   display: grid;
//   grid-template-rows: 50px;
//   margin-bottom: -10px;
// `;

// function PortfolioTitleSection(title: string, sectionName: string) {
//   const classes = useStyles();
//   return (
//     <>
//       <PaperSection title={title}>
//         <OneColumnThinSectionGrid>
//           <SingleLineRequiredGrid>
//             <Field
//               component={TextField}
//               className={classes.textFieldMain}
//               name={sectionName}
//               id="standard-full-width"
//               style={{ margin: 0 }}
//               fullWidth
//               color="secondary"
//               errorstyle={{
//                 float: "right",
//                 margin: "30px",
//                 color: "white",
//               }}
//             />
//           </SingleLineRequiredGrid>
//         </OneColumnThinSectionGrid>
//       </PaperSection>
//     </>
//   );
// }

function ImageTextSectionBit(
  title: string,
  sectionName: string,
  touched: any,
  errors: any,
  imageResponse: any,
  setImageResponse: any
) {
  return (
    <>
      <PaperSection title={title}>
        <TwoColumnSectionGrid>
          <div>
            {TextSectionField(sectionName, 18)}
            {errors && touched ? <ErrorMessage>{errors}</ErrorMessage> : null}
          </div>
          <div>
            {UploadImageSubSection(sectionName, imageResponse, setImageResponse)}
          </div>
        </TwoColumnSectionGrid>
      </PaperSection>
    </>
  );
}

function ImageSectionBit(
  title: string,
  sectionName: string,
  imageResponse: any,
  setImageResponse: any
) {
  return (
    <>
      <PaperSection title={title}>
        <OneColumnSectionGrid>
          {UploadImageSubSection(sectionName, imageResponse, setImageResponse)}
        </OneColumnSectionGrid>
      </PaperSection>
    </>
  );
}

// const TextSectionInput = (props: any) => {
//   return (
//     <>
//       <PaperSection title={props.title}>
//         <OneColumnSectionGrid>
//           {TextSectionField(props.sectionName, 15)}
//           {props.errors && props.touched ? <ErrorMessage>{props.errors}</ErrorMessage> : null}
//         </OneColumnSectionGrid>
//       </PaperSection>
//     </>
//   );
// }

const TextSectionField = (sectionName: string, rows: number) => {
  return (
    <Field
      component={TextField}
      name={sectionName}
      id="standard-full-width"
      style={{ margin: 0, marginBottom: 15 }}
      fullWidth
      multiline
      rows={rows}
      rowsMax={30}
      // variant="filled"
      color="secondary"
    />
  );
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
    getSavedLightThemeMode,
    switchLightThemeMode,
  } = useUser();
  const [theme, setTheme] = useState(true);
  const appliedTheme = createMuiTheme(theme ? LightTheme : DarkTheme);
  const classes = useStyles();

  const onLogin = () => {
    return <Redirect to="/portfolio" />;
  };
  const savedLightThemeMode = getSavedLightThemeMode();

  if (redirect) {
    return onLogin();
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
                initialValues={{
                  websiteName: "",
                  biography: "",
                  academicHistory: "",
                  professionalHistory: "",
                }}
                validationSchema={ProfileSchema}
                onSubmit={(values, { setSubmitting }) => {
                  const portfolio_data = {
                    name: values.websiteName,
                  };
                  const page_data = {
                    name: "home",
                    number: "0",
                  };
                  const bio_data = {
                    name: "biography",
                    number: "0",
                    image: bioImageResponse.id,
                    content: values.biography,
                    type: "image_text",
                  };
                  const academic_data = {
                    name: "academic_history",
                    number: "0",
                    content: values.academicHistory,
                    type: "text",
                  };
                  const awesome_data = {
                    name: "awesome_image",
                    number: "0",
                    image: awesomeImageResponse.id,
                    type: "image",
                  };
                  const professional_data = {
                    name: "professional_history",
                    number: "0",
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
                    <PortfolioNameSection
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
                    </PortfolioNameSection>
                    <BetweenSections />
                    {ImageTextSectionBit(
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
                      touched = {touched.academicHistory}
                      errors = {errors.academicHistory}
                    />
                    <BetweenSections />
                    {/* {ImageSectionInput(
                      "Awesome Image",
                      "awesomeImage",
                      awesomeImageResponse,
                      setAwesomeImageResponse
                    )}
                    <BetweenSections />
                    {TextSectionInput(
                      "Professional History",
                      "professionalHistory",
                      touched.professionalHistory,
                      errors.academicHistory
                    )} */}
                    <BetweenSections />
                    <BottomButtonsDiv>
                      <div></div>
                      <div>
                        <Button
                          variant="outlined"
                          className={classes.cancelButton}
                        >
                          Cancel
                        </Button>
                      </div>
                      <div></div>
                      <div>
                        <Button
                          type="submit"
                          variant="contained"
                          color="secondary"
                          className={classes.publishButton}
                          style={{ borderRadius: 5 }}
                        >
                          Publish
                        </Button>
                      </div>
                      <div></div>
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