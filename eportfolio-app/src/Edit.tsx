import React, { useState } from "react";
import styled from "styled-components";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { ThemeProvider, makeStyles } from "@material-ui/styles";
import IconButton from "@material-ui/core/IconButton";
import { createMuiTheme, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import AddPhotoAlternateOutlinedIcon from "@material-ui/icons/AddPhotoAlternateOutlined";

import { TextField } from "formik-material-ui";
import Image from "../images/Logo_Background.svg";

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
// import classes from "*.module.css";

const FRONT_END_URL = "http://localhost:3000/";

const lightMode = false;



const useStyles = makeStyles((theme: any) =>
  createStyles({
    root: {},
    margin: {
      position: "absolute",
      bottom: 20,
      left: 43,
    },
    paper: {
      padding: 10,
    },
    button: {
      width: "100%",
      // fontSize: 20,
      // fontWeight: 600,
      border: "2px solid",
      '&:hover': {
        border: "2px solid",
      }
    }
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

const SectionDiv = styled.div`
  width: 100%;
  margin-top: 30px;
  margin-bottom: 30px;
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
  margin-top: 0px;
  border: 1px solid #808080;
  border-radius: 4px;
`;

const FormTitle = styled.h2`
  // font-family: "Heebo", sans-serif;
  // color: #eeeeee;
  font-weight: 300;
`;

const FieldTitle = styled.h3`
  // font-family: "Heebo", sans-serif;
  // color: #eeeeee;
  font-weight: 300;
  margin-bottom: 0px;
  margin-left: 0px;
  margin-top: 0px;
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

const ImageDiv = styled.div`
  position: relative;
  width: 100%;
`;

const GridContainerStyle = styled.div`
  display: grid;
  // grid-template-columns: 120px 1fr 120px;
  grid-template-columns: repeat(auto-fill, minMax(250px, 1fr));
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
  const { uploadImage } = useUser();
  const classes = useStyles();
  return (
    <>
      <ThemeProvider theme={lightTheme}>
        <ImageDiv>
          <BlankUser src={imageResponse.image} />
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
            <IconButton
              component="span"
              size="small"
              className={classes.margin}
            >
              <AddPhotoAlternateOutlinedIcon />
            </IconButton>
          </label>
        </ImageDiv>
      </ThemeProvider>
    </>
  );
}

{
  /* function PaperSection (props: { title: string, content: any}) {
  function render () {
    return (
      <SectionDiv>
        <Paper 
          elevation={3}
          square
          className = {classes.paper}
        >
          <FieldTitle>{props.title}</FieldTitle>
          {props.content}
        </Paper>
      </SectionDiv>
    )
  }
} */
}

// const PaperSection = (props: { title: string, content: any}) => {
//     return (
//       <SectionDiv>
//         <Paper
//           elevation={3}
//           square
//           className = {classes.paper}
//         >
//           <FieldTitle>{props.title}</FieldTitle>
//           {props.content}
//         </Paper>
//       </SectionDiv>
//     )
// }

const PaperSection = (props: any) => {
  const classes = useStyles();
  return (
    <SectionDiv>
      <Paper 
        elevation={3}
        variant="outlined"  
        square 
        className={classes.paper}>
        <RowDiv>
          <FieldTitle>{props.title}</FieldTitle>
        </RowDiv>
        {props.children}
      </Paper>
    </SectionDiv>
  );
};


function PortfolioTitleSection(
  title: string,
  sectionName: string,
) {
  return (
    <>
      <PaperSection title={title}>
        <Field
          component={TextField}
          name={sectionName}
          id="standard-full-width"
          style={{ margin: 0 }}
          fullWidth
          variant="filled"
          color="secondary"
          errorstyle={{
            float: "right",
            margin: "30px",
            color: "white",
          }}
        />
      </PaperSection>
    </>
  )
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
        <RowDiv>
          <ColDiv>
            {TextSectionField(sectionName, 15)}
            {errors && touched ? <ErrorMessage>{errors}</ErrorMessage> : null}
          </ColDiv>
          <ColDiv>
            {UploadImageBit(sectionName, imageResponse, setImageResponse)}
          </ColDiv>
        </RowDiv>
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
        <RowDiv>
          <ColDiv>
            {UploadImageBit(sectionName, imageResponse, setImageResponse)}
          </ColDiv>
        </RowDiv>
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
        {TextSectionField(sectionName, 15)}
        {errors && touched ? <ErrorMessage>{errors}</ErrorMessage> : null}
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
      variant="filled"
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
  const classes = useStyles();
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
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
                {PortfolioTitleSection("Website Name*", "websiteName")}
                {ImageTextSectionBit(
                  "Biography",
                  "biography",
                  touched.biography,
                  errors.biography,
                  bioImageResponse,
                  setBioImageResponse
                )}
                {errors.academicHistory && touched.academicHistory ? (
                  <ErrorMessage>{errors.academicHistory}</ErrorMessage>
                ) : null}
                {TextSectionBit(
                  "Academic History",
                  "academicHistory",
                  touched.academicHistory,
                  errors.academicHistory
                )}
                {ImageSectionBit(
                  "Awesome Image",
                  "awesomeImage",
                  awesomeImageResponse,
                  setAwesomeImageResponse
                )}
                {TextSectionBit(
                  "Professional History",
                  "professionalHistory",
                  touched.professionalHistory,
                  errors.academicHistory
                )}
                  {/* <StyledPublishButton type="submit">
                    Publish
                  </StyledPublishButton> */}
                  <GridContainerStyle>
                    <div>
                      <Button 
                        variant="outlined"
                        className={classes.button}
                      >
                        Cancel
                      </Button>
                    </div>
                    <div>

                    </div>
                    <div>
                      <Button 
                        variant="outlined" 
                        color="secondary"
                        className={classes.button}
                        style = {{ borderRadius: 5 }}
                      >
                        Publish
                      </Button>
                    </div>
                  </GridContainerStyle>


                {/* <StyledLink href="/">
                  <StyledCancelButton type="button">Cancel</StyledCancelButton>
                </StyledLink> */}
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
    </ThemeProvider>
  );
};

export default Edit;
