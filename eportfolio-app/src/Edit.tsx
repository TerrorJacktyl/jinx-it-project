import React, { useState } from "react";
import styled from "styled-components";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { ThemeProvider, makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import { Fab, Button } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import { createMuiTheme, createStyles } from "@material-ui/core/styles";

import AddPhotoAlternateOutlinedIcon from "@material-ui/icons/AddPhotoAlternateOutlined";

import { TextField } from "formik-material-ui";

import {
  ErrorMessage,
  FormDiv,
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

const useStyles = makeStyles((theme: any) =>
  createStyles({
    margin: {
      position: "absolute",
      bottom: 20,
      left: 43,
      // transform: "translate(-30px, -50%)",
      // msTransform: translate(-50%, -50%);
    },
  })
);

const MinimalDivStyle = styled.div`
  margin-left: 30px;
  margin-right: 30px;
  width: auto;
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

const BlankUser = styled.img`
  // display: float;
  max-width: 362px;
  width: 95%;
  margin-right: 0px;
  margin-left: 0px;
  height: auto;
  // float: right;
  margin-top: 30px;
  border: 1px solid #808080;
  border-radius: 4px;
`;

const BlankUser2 = styled.img`
  width: 100%;
  height: auto;
`;

const FormTitle = styled.h2`
  font-family: "Heebo", sans-serif;
  color: #eeeeee;
  font-weight: 300;
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

const StyledInput = styled.input`
  display: none;
`;

const Div1 = styled.div`
  position: relative;
  width: 100%;
`;

const Div1a = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
`;

const Div1b = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
`;

const ContainerButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  background-color: #555;
  color: white;
  font-size: 16px;
  padding: 12px 24px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
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

function UploadImageBit(
  imageResponse: any,
  setImageResponse: any,
  imageFile: any,
  setImageFile: any,
  uploadButtonLabel: string,
) {
  const { uploadImage } = useUser();
  // const [imageFile, setImageFile] = useState<File>(
  //   new File([FRONT_END_URL + "blank_user.png"], "blank_user.png")
  // );
  const classes = useStyles();
  return (
    <>
      <ThemeProvider theme={theme}>
        <Div1>
          <BlankUser src={imageResponse.image} />
          <label htmlFor={uploadButtonLabel}>
            <StyledInput
              accept="image/*"
              id={uploadButtonLabel}
              multiple
              type="file"
              onChange={(event) => {
                if (event.currentTarget.files) {
                  setImageFile(event.currentTarget.files[0]);
                  uploadImage(
                    event.currentTarget.files[0],
                    event.currentTarget.files[0].name
                  )
                    .then((response) => {
                      console.log(response);
                      setImageResponse(response.data);
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                } else {
                  setImageFile(new File([""], "blank_file"));
                }
              }}
            />
            <IconButton
              component="span"
              size="small"
              className={classes.margin}
            >
              <AddPhotoAlternateOutlinedIcon />
            </IconButton>
          </label>
        </Div1>
      </ThemeProvider>
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
  const [bioImageFile, setBioImageFile] = useState<File>(
    new File([FRONT_END_URL + "blank_user.png"], "blank_user.png")
  );
  const [awesomeImageFile, setAwesomeImageFile] = useState<File>(
    new File([FRONT_END_URL + "blank_user.png"], "blank_user.png")
  );
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
                    errorstyle={{
                      float: "right",
                      margin: "30px",
                      color: "white",
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
                    {UploadImageBit(
                      bioImageResponse, 
                      setBioImageResponse,
                      bioImageResponse,
                      setBioImageResponse,
                      "bio-image-file"
                    )}
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
                      setAwesomeImageResponse,
                      awesomeImageFile,
                      setAwesomeImageFile,
                      "awesome-image-file"
                    )}
                  </ColDiv>
                </RowDiv>

                {TextSectionBit(
                  "Professional History",
                  "professionalHistory",
                  touched.professionalHistory,
                  errors.academicHistory,
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
