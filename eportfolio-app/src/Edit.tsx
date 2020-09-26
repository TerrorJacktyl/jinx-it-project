import React, { useState } from "react";
import styled from "styled-components";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { ThemeProvider } from "@material-ui/styles";

import { createMuiTheme } from "@material-ui/core/styles";

// import TextField from '@material-ui/core/TextField'

import { TextField } from "formik-material-ui";

import {
  ErrorMessage,
  FormDiv,
  FormEntry,
  PrimaryButton,
  SecondaryButton,
  SiteHeader,
  HeaderDiv,
  LogoLink,
  HeaderTitle,
  AccountPageDiv,
  useUser,
} from "jinxui";

const FRONT_END_URL = "http://localhost:3000/";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#0081CA",
    },
    secondary: {
      main: "#00FFC2",
    },
  },
  typography: {
    fontFamily: "Heebo, sans-serif",
  },
  overrides: {
    MuiInputLabel: {
      root: {
        fontSize: 25,
      },
    },
  },
});

const MinimalDivStyle = styled.div`
  margin-left: 30px;
  margin-right: 30px;
  width: auto;
`;

const StyledTable = styled.table`
  width: 100%;
  padding: 10px;
  vertical-align: top;
  table-layout: fixed;
  border-spacing: 30px;
`;

const RowDiv = styled.div`
  overflow: auto;
`;

const ColDiv = styled.div`
  float: left;
  width: 50%;
  @media (max-width: 600px) {
    width: 100%;
  }
`;

const WideFormDiv = styled(FormDiv)`
  width: 920px;
`;

const StyledFormEntry = styled(FormEntry)`
  width: 100%;
  margin-top: 5px;
  margin-bottom: 10px;
`;
const TallStyledFormEntry = styled(StyledFormEntry)`
  height: 360px;
  width: 100%;
  align: left;
  control: textarea;
  rows: 6;
`;

const HalfStyledFormEntry = styled(TallStyledFormEntry)`
  height: 480px;
  max-width: 500px;
  margin-left: 0px;
  align: right;
`;

const UploadButton = styled(SecondaryButton)`
  max-width: 362px;
  margin-left: 30px;
  float: right;
`;

const BlankUser = styled.img`
  display: block;
  max-width: 362px;
  width: 95%;
  margin-right: 0px;
  margin-left: 0px;
  height: auto;
  float: right;
  margin-top: 30px;
  border: 2px solid #ffffff;
  border-radius: 10px;
`;

const FormTitle = styled.h2`
  font-family: "Heebo", sans-serif;
  color: #eeeeee;
  font-weight: 300;
`;

const BrowseButton = styled.input`
  color: #eeeeee;
  margin-top: 10px;
  margin-left: 0px;
`;

const FieldTitle = styled.h3`
  font-family: "Heebo", sans-serif;
  color: #eeeeee;
  font-weight: 300;
  margin-bottom: 0px;
  margin-left: 0px;
  text-align: left;
`;

const StyledPublishButton = styled(PrimaryButton)`
  @media (max-width: 600px) {
    margin-left: auto;
    margin-right: auto;
    align: centre;
    position: relative;
  }
  @media (min-width: 600px) {
    float: right;
  }
`;

const StyledCancelButton = styled(SecondaryButton)`
  @media (max-width: 600px) {
    margin-left: auto;
    margin-right: auto;
    align: centre;
    position: relative;
  }
  @media (min-width: 600px) {
    display: block;
    position: relative;
    float: left;
  }
`;
const StyledFormDiv = styled(WideFormDiv)`
  margin-top: 70px;
  height: auto;
  margin-bottom: 100px;
  width: 90%;
  max-width: 900px;
`;

const StyledLink = styled.a`
  text-decoration: none;
  position: relative;
`;

const ProfileSchema = Yup.object().shape({
  websiteName: Yup.string().max(50, "Too Long!").required("Required"),
});

function PostSection(
  postSection: any,
  portfolio_id: string,
  page_id: string,
  data: any
) {
  // const { postSection } = useUser();
  postSection(portfolio_id, page_id, data)
    .then(function (response: any) {
      console.log(response);
    })
    .catch(function (error: any) {
      console.log(error);
    });
}

function UploadImageBit(imageResponse: any, setImageResponse: any) {
  const { uploadImage } = useUser();
  const [imageFile, setImageFile] = useState<File>(
    new File([FRONT_END_URL + "blank_user.png"], "blank_user.png")
  );
  return (
    <>
      <BlankUser src={imageResponse.image} />
      <BrowseButton
        id="file"
        name="file"
        type="file"
        onChange={(event) => {
          if (event.currentTarget.files) {
            setImageFile(event.currentTarget.files[0]);
          } else {
            setImageFile(new File([""], "blank_file"));
          }
        }}
      />
      <UploadButton
        type="button"
        onClick={() => {
          uploadImage(imageFile, imageFile.name)
            .then((response) => {
              console.log(response);
              setImageResponse(response.data);
            })
            .catch((error) => {
              console.log(error);
            });
        }}
      >
        Upload
      </UploadButton>
    </>
  );
}

function TextSectionBit(
  title: string,
  sectionName: string,
  touched: any,
  errors: any
) {
  return (
    <>
      <FieldTitle>{title}</FieldTitle>
      <ThemeProvider theme={theme}>
        <Field
          component={TextField}
          name={sectionName}
          id="standard-full-width"
          style={{ margin: 0 }}
          fullWidth
          multiline
          rows={10}
          rowsMax={30}
          variant="outlined"
          color="secondary"
        />
      </ThemeProvider>
      {errors && touched ? <ErrorMessage>{errors}</ErrorMessage> : null}
    </>
  );
}

const Edit = () => {
  const [submittionError, setSubmittionError] = useState(false);
  const [bioImageResponse, setBioImageResponse] = useState({
    image: FRONT_END_URL + "blank_user.png",
    id: "0",
  });
  const [awesomeImageResponse, setAwesomeImageResponse] = useState({
    image: FRONT_END_URL + "blank_user.png",
    id: "0",
  });
  const { postPortfolio, postPage, postSection } = useUser();

  return (
    <AccountPageDiv>
      <SiteHeader>
        <HeaderDiv>
          <LogoLink />
          <HeaderTitle>Account Profile</HeaderTitle>
        </HeaderDiv>
      </SiteHeader>
      <StyledFormDiv>
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
                    PostSection(postSection, portfolio_id, page_id, bio_data);
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
                console.log(portfolio_response);
                setSubmitting(false);
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
              <MinimalDivStyle>
                <FieldTitle>Website Name *</FieldTitle>
                <ThemeProvider theme={theme}>
                  <Field
                    component={TextField}
                    name="websiteName"
                    id="standard-full-width"
                    style={{ margin: 0 }}
                    fullWidth
                    variant="outlined"
                    color="secondary"
                    errorStyle={{
                      float: "right",
                      margin: "30px",
                      color: "white"
                    }}
                  />
                </ThemeProvider>
                <RowDiv>
                  <ColDiv>
                    {TextSectionBit(
                      "Biography",
                      "biography",
                      touched.biography,
                      errors.biography
                    )}
                  </ColDiv>
                  <ColDiv>
                    {UploadImageBit(bioImageResponse, setBioImageResponse)}
                  </ColDiv>
                </RowDiv>

                {errors.academicHistory && touched.academicHistory ? (
                  <ErrorMessage>{errors.academicHistory}</ErrorMessage>
                ) : null}
                {TextSectionBit(
                  "Academic History",
                  "academicHistory",
                  touched.academicHistory,
                  errors.academicHistory
                )}
                <FieldTitle>Awesome Image</FieldTitle>
                <RowDiv>
                  <ColDiv>
                    {UploadImageBit(
                      awesomeImageResponse,
                      setAwesomeImageResponse
                    )}
                  </ColDiv>
                </RowDiv>

                {TextSectionBit(
                  "Professional History",
                  "professionalHistory",
                  touched.professionalHistory,
                  errors.academicHistory
                )}
                <div>
                  <StyledPublishButton type="submit">
                    Publish
                  </StyledPublishButton>
                </div>
                <StyledLink href="/">
                  <StyledCancelButton type="button">Cancel</StyledCancelButton>
                </StyledLink>
                {submittionError ? (
                  <ErrorMessage>
                    Error signing up. Please try again later.
                  </ErrorMessage>
                ) : null}
              </MinimalDivStyle>
            </Form>
          )}
        </Formik>
      </StyledFormDiv>
    </AccountPageDiv>
  );
};

export default Edit;
