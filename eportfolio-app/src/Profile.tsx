import React, { useState } from "react";
import styled from "styled-components";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import {
  ErrorMessage,
  FormDiv,
  FormEntry,
  Button,
  SiteHeader,
  HeaderDiv,
  LogoLink,
  HeaderTitle,
  AccountPageDiv,
} from "jinxui";

const WideFormDiv = styled(FormDiv)`
  width: 920px;
`;

const StyledFormEntry = styled(FormEntry)`
  width: 850px;
  margin-top: 5px;
  margin-bottom: 10px;
`;
const TallStyledFormEntry = styled(StyledFormEntry)`
  height: 360px;
  control: textarea;
  rows: 6;
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
  margin-left: 30px;
  text-align: left;
`;

const StyledButton = styled(Button)`
  display: inline;
  float: right;
  margin-top: 30px;
  margin-right: 30px;
  display: block;
  position: relative;
`;

const StyledCancelButton = styled(Button)`
  display: inline;
  float: left;
  margin-top: 30px;
  margin-left: 30px;
  display: block;
  position: relative;
`;

const StyledFormDiv = styled(WideFormDiv)`
  margin-top: 100px;
  height: 1520px;
`;

const StyledLink = styled.a`
  text-decoration: none;
  position: relative;
`;


const ProfileSchema = Yup.object().shape({
  websiteName: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
  biography: Yup.string().min(2, "Too Short!"),
  academicHistory: Yup.string().min(2, "Too Short!"),
  professionalHistory: Yup.string().min(2, "Too Short!"),
});

const Profile = () => {
  const axios = require("axios").default;
  const [submittionError, setSubmittionError] = useState(false);
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
              <FieldTitle>Website Name</FieldTitle>
              <StyledFormEntry name="websiteName" />
              {errors.websiteName && touched.websiteName ? <ErrorMessage>{errors.websiteName}</ErrorMessage> : null}

              <FieldTitle>Biography</FieldTitle>
              <TallStyledFormEntry component="textarea" name="biography" />
              {errors.biography && touched.biography ? <ErrorMessage>{errors.biography}</ErrorMessage> : null}

              <FieldTitle>Academic History</FieldTitle>
              <TallStyledFormEntry component="textarea" name="academicHistory" />
              {errors.academicHistory && touched.academicHistory ? (
                <ErrorMessage>{errors.academicHistory}</ErrorMessage>
              ) : null}

              <FieldTitle>Professional History</FieldTitle>
              <TallStyledFormEntry component="textarea" name="professionalHistory" />
              {errors.professionalHistory && touched.professionalHistory ? (
                <ErrorMessage>{errors.professionalHistory}</ErrorMessage>
              ) : null}
              <div>
                <StyledLink href="/">
                  <StyledCancelButton
                    width={null}
                    textColour="#EEEEEE"
                    backgroundColour={null}
                    hoverColour="#EEEEEE"
                    contrastColour="#1C1C1C"
                    text="Cancel"
                    fontSize={null}
                  />
                </StyledLink>

                <StyledButton
                  type="submit"
                  disabled={isSubmitting}
                  width={null}
                  textColour="#00FFC2"
                  backgroundColour={null}
                  hoverColour="#00FFC2"
                  contrastColour="#1C1C1C"
                  text="Publish"
                  fontSize={null}
                />
              </div>
              {submittionError ? <ErrorMessage>Error signing up. Please try again later.</ErrorMessage> : null}
            </Form>
          )}
        </Formik>
      </StyledFormDiv>
    </AccountPageDiv>
  );
};

export default Profile;
