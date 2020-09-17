import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import API from './API';

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

const FormText = styled.h4`
  font-family: "Heebo", sans-serif;
  color: #eeeeee;
  font-weight: 300;
`

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

// We'll need to ensure that this schema is more strict than Django's user sign up
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

  // This could be parametrized to accept multiple different redirects
  // e.g. hold a component to redirect to rather than a boolean for a "/login" redirect
  const [redirect, setRedirect] = useState(false);

  const onRegister = () => {
    return <Redirect to="/login" />
  }

  const [submittionError, setSubmittionError] = useState(false);

  if (redirect)
    return onRegister();
  else
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

              API
                .post(`auth/users`,
                  {
                    username: values.email,
                    password: values.password,
                    email: values.email,
                  }
                  // {
                  // first_name: values.firstName,
                  // last_name: values.lastName,
                  // email: values.email,
                  // password: values.password,
                  // }
                )
                .then(function (response: any) {
                  console.log(response);
                  setSubmitting(false);
                  if (response.data['email']) { // only present if successful
                    console.log(response.data);
                    setRedirect(true);
                  }
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
                />

                <StyledLink href="/login" ><FormText>Already have an account? Log In</FormText></StyledLink>

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
