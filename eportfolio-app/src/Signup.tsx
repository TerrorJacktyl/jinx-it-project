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

// import { Redirect } from "react-router-dom"; still not working

// Idea on how to submit properly:
// https://stackoverflow.com/questions/43230194/how-to-use-redirect-in-the-new-react-router-dom-of-reactjs

const StyledFormEntry = styled(FormEntry)`
  font-family: "Heebo", sans-serif;
  margin-top: 15px;
  margin-bottom: 15px;
`;
const FormTitle = styled.h2`
  font-family: "Heebo", sans-serif;
  color: #eeeeee;
  font-weight: 300;
`;

const StyledButton = styled(Button)`
  margin: auto;
  margin-top: 30px;

`;

const StyledFormDiv = styled(FormDiv)`
  margin-top: 100px;
`;

const StyledLink = styled.a`
  text-decoration: none;
  position: relative;
`;

const SignupSchema = Yup.object().shape({
  firstName: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
  lastName: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords don't match")
    .required("Required"),
});

const Signup = () => {
  const axios = require("axios").default;
  const [submittionError, setSubmittionError] = useState(false);
  return (
    <AccountPageDiv>
      <SiteHeader>
        <HeaderDiv>
          <LogoLink />
          <HeaderTitle>Sign Up</HeaderTitle>
        </HeaderDiv>
      </SiteHeader>
      <StyledFormDiv>
        <FormTitle>Sign up for free!</FormTitle>
        <Formik
          initialValues={{ firstName: "", lastName: "", email: "", password: "", passwordConfirm: "" }}
          validationSchema={SignupSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);

            axios
              .post(`http://127.0.0.1:8080/api/user`, {
                first_name: values.firstName,
                last_name: values.lastName,
                email: values.email,
                password: values.password,
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
              <StyledFormEntry name="firstName" placeholder="First Name" />
              {errors.firstName && touched.firstName ? <ErrorMessage>{errors.firstName}</ErrorMessage> : null}

              <StyledFormEntry name="lastName" placeholder="Last Name" />
              {errors.lastName && touched.lastName ? <ErrorMessage>{errors.lastName}</ErrorMessage> : null}

              <StyledFormEntry name="email" type="email" placeholder="Email" />
              {errors.email && touched.email ? <ErrorMessage>{errors.email}</ErrorMessage> : null}

              <StyledFormEntry name="password" type="password" placeholder="Password" />
              {errors.password && touched.password ? <ErrorMessage>{errors.password}</ErrorMessage> : null}

              <StyledFormEntry name="passwordConfirm" type="password" placeholder="Confirm Password" />
              {errors.passwordConfirm && touched.passwordConfirm ? (
                <ErrorMessage>{errors.passwordConfirm}</ErrorMessage>
              ) : null}
              <StyledLink href="/profile">
                <StyledButton
                  type="submit"
                  disabled={isSubmitting}
                  width={null}
                  textColour="#00FFC2"
                  backgroundColour={null}
                  hoverColour="#00FFC2"
                  contrastColour="#1C1C1C"
                  text="Join"
                  fontSize={null}
                  action = {null}
                />
              </StyledLink>
              {submittionError ? 
                <ErrorMessage>Error signing up. Please try again later.</ErrorMessage> : null}
            </Form>
          )}
        </Formik>
      </StyledFormDiv>
    </AccountPageDiv>
  );
};

export default Signup;
