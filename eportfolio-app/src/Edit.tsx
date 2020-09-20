import React, { useState } from "react";
import styled from "styled-components";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import {
  ErrorMessage,
  FormDiv,
  FormEntry,
  Button,
  Button2,
  SiteHeader,
  HeaderDiv,
  LogoLink,
  HeaderTitle,
  AccountPageDiv,
} from "jinxui";

const MinimalDivStyle = styled.div`
  margin-left: 30px;
  margin-right: 30px;
  width: auto;
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


const BlankUser = styled.img`
  display: block;
  max-width: 362px;
  width: 100%;
  margin-right: 30px;
  height: auto;
  align: left;
  margin-top: 30px;
  border: 2px solid #FFFFFF;
  border-radius: 10px;
`;

const FormTitle = styled.h2`
  font-family: "Heebo", sans-serif;
  color: #eeeeee;
  font-weight: 300;
`;

const BrowseButton = styled.input`
  color: #eeeeee;
  align: left;
  margin-top: 10px;
  margin-left: 0px;
  display: block;
  align: left;
  text-align: left;
`;

const FieldTitle = styled.h3`
  font-family: "Heebo", sans-serif;
  color: #eeeeee;
  font-weight: 300;
  margin-bottom: 0px;
  margin-left: 0px;
  text-align: left;
`;

const StyledButton = styled(Button)`
  margin: auto;
  margin-top: 30px;
  margin-bottom: 30px;
  @media (max-width: 600px) {
    align: centre;
    position: relative;
  }
`;

const StyledPublishButton = styled(StyledButton)`
  @media (min-width: 600px) {
    float: right;
  }
`;

const StyledCancelButton = styled(StyledButton)`
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
  websiteName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  biography: Yup.string().min(2, "Too Short!"),
  academicHistory: Yup.string().min(2, "Too Short!"),
  professionalHistory: Yup.string().min(2, "Too Short!"),
});

const Edit = () => {
  const axios = require("axios").default;
  const [submittionError, setSubmittionError] = useState(false);
  const [imageFile, setImageFile] = useState<File>(
    new File(["http://localhost:8080/media/images/blank_user.png"], "blank_user.png"));
  const [imageURL, setImageURL] = useState("http://localhost:8080/media/images/blank_user.png")
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
            setSubmitting(true);
            axios
              .post(`http://127.0.0.1:8080/api/create_profile`, {
                websiteName: values.websiteName,
                biography: values.biography,
                academicHistory: values.academicHistory,
                professionalHistory: values.professionalHistory,
              })
              .then(function (response: any) {
                console.log(response);
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
                <FieldTitle>Website Name</FieldTitle>
                <StyledFormEntry name="websiteName" />
                {errors.websiteName && touched.websiteName ? (
                  <ErrorMessage>{errors.websiteName}</ErrorMessage>
                ) : null}
                <BlankUser src={imageURL} />
                {/* <BlankUser src={require("images/" + imageFile.name)}/> */}
                {/* <img src={imageURL} alt ="" width="100" height="100"></img> */}
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
                <Button2
                type="button"
                onClick={() => {
                    const form_data = new FormData();
                    form_data.append("image", imageFile, imageFile.name);
                    form_data.append("name", imageFile.name);
                    form_data.append("owner", "2")
                    axios
                      .post("http://127.0.0.1:8080/api/images/", form_data, {
                        headers: {
                          "Content-Type": "multipart/form-data",
                          "Authorization": "Token 8295edf270ca01fc8fefabf5e2d508507a970fcd"
                        },
                      })
                      .then(function (response: any) {
                        console.log(response.data.image);
                        setImageURL(response.data.image);
                      })
                      .catch(function (error: any) {
                        console.log(error);
                    });
                  }}>
                  Upload
                </Button2>
                <br></br>
                <FieldTitle>Biography</FieldTitle>

                <TallStyledFormEntry component="textarea" name="biography" />
                {errors.biography && touched.biography ? (
                  <ErrorMessage>{errors.biography}</ErrorMessage>
                ) : null}

                <FieldTitle>Academic History</FieldTitle>
                <TallStyledFormEntry
                  component="textarea"
                  name="academicHistory"
                />
                {errors.academicHistory && touched.academicHistory ? (
                  <ErrorMessage>{errors.academicHistory}</ErrorMessage>
                ) : null}

                <FieldTitle>Professional History</FieldTitle>
                <TallStyledFormEntry
                  component="textarea"
                  name="professionalHistory"
                />
                {errors.professionalHistory && touched.professionalHistory ? (
                  <ErrorMessage>{errors.professionalHistory}</ErrorMessage>
                ) : null}
                <div>
                  <StyledPublishButton
                    type="submit"
                    disabled={isSubmitting}
                    width={null}
                    textColour="#00FFC2"
                    backgroundColour={null}
                    hoverColour="#00FFC2"
                    contrastColour="#1C1C1C"
                    text="Publish"
                    fontSize={null}
                    action={null}
                  />
                </div>
                <StyledLink href="/">
                  <StyledCancelButton
                    width={null}
                    textColour="#EEEEEE"
                    backgroundColour={null}
                    hoverColour="#EEEEEE"
                    contrastColour="#1C1C1C"
                    text="Cancel"
                    fontSize={null}
                    action={null}
                  />
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
