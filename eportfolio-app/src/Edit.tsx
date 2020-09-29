import React, { useState } from "react";
import styled from "styled-components";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { ThemeProvider, makeStyles } from "@material-ui/styles";
import IconButton from "@material-ui/core/IconButton";
import { createMuiTheme, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import AddPhotoAlternateOutlinedIcon from "@material-ui/icons/AddPhotoAlternateOutlined";
import SettingsBrightnessIcon from "@material-ui/icons/SettingsBrightness";
import MenuIcon from "@material-ui/icons/Menu";
import PersonIcon from "@material-ui/icons/Person";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import AddIcon from "@material-ui/icons/Add";
// import {Brightness7Icon, Brightness3Icon} from '@material-ui/icons'
import { TextField } from "formik-material-ui";

import Image from "../images/Logo_Background.svg";

import {
  ErrorMessage,
  FormDiv,
  SiteHeader,
  HeaderTitle,
  LightTheme,
  DarkTheme,
  useUser,
} from "jinxui";

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
  })
);

const StyledPaper = styled(Paper)`
  padding: 10px;
  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  :hover {
    box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.3);
  }
`;

const StyledImageUploadOverlay = styled(Paper)`
  grid-column: 1/4;
  grid-row: 1/4;
  display: grid;
  width: 100%;
  height: 100%;
  align-content: center;
  text-align: center;
  font-size: 20px;
  opacity: 0%;
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  :hover {
    opacity: 65%;
  }
  cursor: pointer;
`;

const StyledImageUploadButton = styled(AddPhotoAlternateOutlinedIcon)`
  z-index: 2;
`;

const SectionDiv = styled.div`
  margin-top: 0px;
  margin-bottom: 30px;
  display: grid;
  grid-template-rows: 100px, 1fr;
`;

const WideFormDiv = styled(FormDiv)`
  width: 920px;
`;

const UserImage = styled.img`
  margin-right: 0px;
  margin-left: 0px;
  height: auto;
  margin-top: 0px;
  border: 1px solid gray;
  width: 100%;
`;

const FormTitle = styled.h2`
  font-weight: 300;
`;

const FieldTitle = styled.h3`
  font-weight: 300;
  margin-bottom: 0px;
  margin-left: 0px;
  margin-top: 0px;
  text-align: left;
  font-size: 20px;
`;

const StyledFormDiv = styled(WideFormDiv)`
  margin-top: 70px;
  height: auto;
  margin-bottom: 100px;
  width: 90%;
  display: grid;
  grid-template-columns: 1fr minMax(200px, 900px) 1fr;
`;

const StyledInput = styled.input`
  display: none;
`;

const BottomButtonsDiv = styled.div`
  display: grid;
  grid-template-columns:
    5% minMax(40px, 200px) minMax(10%, auto)
    minMax(40px, 200px) 5%;
  grid-template-rows: 40px;
  margin-top: 30px;
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: 20px 30px 1fr;
  grid-template-rows: 1fr 30px 20px;
`;

const ImageGridMain = styled.div`
  grid-column: 1/4;
  grid-row: 1/4;
  object-fit: cover;
`;

const ImageGridIcon = styled.div`
  grid-column: 2/3;
  grid-row: 2/3;
  object-fit: cover;
`;

const OneColumnSectionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  margin: 30px;
  margin-bottom: 15px;
  direction: column;
`;

const OneColumnThinSectionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  margin: 30px;
  margin-bottom: 10px;
`;

const TwoColumnSectionGrid = styled(OneColumnSectionGrid)`
  grid-template-columns: 1fr 1fr;
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
  grid-gap: 60px;
`;

const SingleLineRequiredGrid = styled.div`
  display: grid;
  grid-template-rows: 50px;
  margin-bottom: -10px;
`;

const HeaderFlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const HeaderFlexItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
  uploadButtonLabel: string,
  imageResponse: any,
  setImageResponse: any
) {
  const classes = useStyles();
  const { uploadImage } = useUser();
  // const classes = useStyles();
  return (
    <>
      {" "}
      <label htmlFor={uploadButtonLabel}>
        <StyledInput
          accept="image/*"
          id={uploadButtonLabel}
          multiple
          type="file"
          onChange={(event) => {
            if (event.currentTarget.files) {
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
              console.log("Image failure");
            }
          }}
        />
        <ImageGrid>
          <ImageGridMain>
            <UserImage src={imageResponse.image} />{" "}
          </ImageGridMain>
          <StyledImageUploadOverlay elevation={0} square>
            Upload Image
          </StyledImageUploadOverlay>
          <ImageGridIcon>
              <StyledImageUploadButton />
          </ImageGridIcon>
        </ImageGrid>
      </label>
    </>
  );
}

const PaperSection = (props: any) => {
  // const classes = useStyles();
  return (
    <SectionDiv>
      <HeaderFlexContainer>
        <HeaderFlexItem>
          <FieldTitle>{props.title}</FieldTitle>
        </HeaderFlexItem>
        <HeaderFlexItem></HeaderFlexItem>
        <HeaderFlexItem>
          <IconButton size="small">
            <ArrowUpwardIcon />
          </IconButton>
          <IconButton size="small">
            <ArrowDownwardIcon />
          </IconButton>
          <IconButton size="small">
            <DeleteOutlinedIcon />
          </IconButton>
        </HeaderFlexItem>
      </HeaderFlexContainer>
      <StyledPaper elevation={3} variant="outlined" square>
        {props.children}
      </StyledPaper>
    </SectionDiv>
  );
};

const BetweenSections = () => {
  return (
    <HeaderFlexContainer>
      <HeaderFlexItem></HeaderFlexItem>
      <HeaderFlexItem>
        <IconButton>
          <AddIcon />
        </IconButton>
      </HeaderFlexItem>
      <HeaderFlexItem></HeaderFlexItem>
    </HeaderFlexContainer>
  );
};

function PortfolioTitleSection(title: string, sectionName: string) {
  return (
    <>
      <PaperSection title={title}>
        <OneColumnThinSectionGrid>
          <SingleLineRequiredGrid>
            <Field
              component={TextField}
              name={sectionName}
              id="standard-full-width"
              style={{ margin: 0 }}
              fullWidth
              color="secondary"
              errorstyle={{
                float: "right",
                margin: "30px",
                color: "white",
              }}
            />
          </SingleLineRequiredGrid>
        </OneColumnThinSectionGrid>
      </PaperSection>
    </>
  );
}

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
            {UploadImageBit(sectionName, imageResponse, setImageResponse)}
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
          {UploadImageBit(sectionName, imageResponse, setImageResponse)}
        </OneColumnSectionGrid>
      </PaperSection>
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
      <PaperSection title={title}>
        <OneColumnSectionGrid>
          {TextSectionField(sectionName, 15)}
          {errors && touched ? <ErrorMessage>{errors}</ErrorMessage> : null}
        </OneColumnSectionGrid>
      </PaperSection>
    </>
  );
}

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
  const [theme, setTheme] = useState(true);
  const appliedTheme = createMuiTheme(theme ? LightTheme : DarkTheme);
  const classes = useStyles();
  return (
    <>
      <ThemeProvider theme={appliedTheme}>
        <ThemeProvider theme={DarkTheme}>
          <SiteHeader>
            <HeaderFlexContainer>
              <HeaderFlexItem>
                <IconButton>
                  <MenuIcon />
                </IconButton>
              </HeaderFlexItem>
              <HeaderFlexItem>
                <HeaderTitle>Account Profile</HeaderTitle>
              </HeaderFlexItem>
              <HeaderFlexItem>
                <IconButton onClick={() => setTheme(!theme)}>
                  <SettingsBrightnessIcon />
                </IconButton>
                <IconButton>
                  <PersonIcon />
                </IconButton>
              </HeaderFlexItem>
            </HeaderFlexContainer>
          </SiteHeader>
        </ThemeProvider>
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
                  {PortfolioTitleSection("Website Name*", "websiteName")}
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
                  {TextSectionBit(
                    "Academic History",
                    "academicHistory",
                    touched.academicHistory,
                    errors.academicHistory
                  )}
                  <BetweenSections />
                  {ImageSectionBit(
                    "Awesome Image",
                    "awesomeImage",
                    awesomeImageResponse,
                    setAwesomeImageResponse
                  )}
                  <BetweenSections />
                  {TextSectionBit(
                    "Professional History",
                    "professionalHistory",
                    touched.professionalHistory,
                    errors.academicHistory
                  )}
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
};

export default Edit;
