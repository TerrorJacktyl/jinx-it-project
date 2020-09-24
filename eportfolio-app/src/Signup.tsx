import React, { useState } from "react";
import { Redirect } from "react-router-dom";

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
  FormAlert,
  useUser,
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
  height: 700px;
`;

const StyledLink = styled.a`
  text-decoration: none;
  position: relative;
`;

// We'll need to ensure that this schema is more strict than Django's user sign up
const SignupSchema = Yup.object().shape({
  firstName: Yup.string().min(2, "Too Short!").max(150, "Too Long!").required("Required"),
  lastName: Yup.string().min(2, "Too Short!").max(150, "Too Long!").required("Required"),
  username: Yup.string().min(2, "Too Short!").max(150, "Too Long!").matches(/^[a-zA-Z0-9_@+.-]+$/, "Can only contain letters, numbers, and some special characters").required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(8, "Too Short!").matches(/(?!^\d+$)^.+$/, "Password cannot consist of only numbers").required("Required"),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords don't match")
    .required("Required"),
});

const Signup = () => {
  // This could be parametrized to accept multiple different redirects
  // e.g. hold a component to redirect to rather than a boolean for a "/login" redirect
  const [redirect, setRedirect] = useState(false);

  const { signup, login, setAccountDetails } = useUser();

  const onRegister = () => {
    return <Redirect to="/login" />
  }

  const [submittionError, setSubmittionError] = useState('');

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
          {submittionError ? <FormAlert severity="error">Error logging in: {submittionError}.</FormAlert> : null}
          <Formik
            initialValues={{ firstName: "", lastName: "", username: "", email: "", password: "", passwordConfirm: "" }}
            validationSchema={SignupSchema}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);

              // This promise chain is gross, but it handles PUTing the user details
              signup(values.username, values.email, values.password, values.firstName, values.lastName)
                .then(function (response: any) {
                  console.log(response);
                  return response;
                })
                .then((response: any) => {
                  return login(values.username, values.password);
                })
                .then((config: any) => {
                  // Making this work involved sacrificing a small lamb
                  setAccountDetails(values.firstName, values.lastName, config);
                  setSubmitting(false);
                  setRedirect(true);
                })
                .catch(function (error) {
                  setSubmitting(false);

                  console.log(error);
                  
                  var errorVar = null;
                  if (error.response){
                    if (error.response.data.non_field_errors){
                      errorVar = error.response.data.non_field_errors;
                    }
                    else if (error.response.data.password){
                      errorVar = error.response.data.password;
                    }
                    else if (error.response.data.username){
                      errorVar = error.response.data.username;
                    }
                    else if (error.response.data.email){
                      errorVar = error.response.data.email;
                    }
                  }
                  if (errorVar){
                    let i = 0;
                    for (i = 0; i < errorVar.length; i++){
                      setSubmittionError(submittionError.concat(errorVar[i]));
                    }
                  }
                  else{
                    setSubmittionError("service is currently unavailable, please try again later");
                    console.error("Unable to connect to API for login (or unknown error)");
                  }
                });
            }}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form>
                <StyledFormEntry name="firstName" placeholder="First Name" />
                {errors.firstName && touched.firstName ? <ErrorMessage>{errors.firstName}</ErrorMessage> : null}

                <StyledFormEntry name="lastName" placeholder="Last Name" />
                {errors.lastName && touched.lastName ? <ErrorMessage>{errors.lastName}</ErrorMessage> : null}

                <StyledFormEntry name="username" placeholder="Username" />
                {errors.username && touched.username ? <ErrorMessage>{errors.username}</ErrorMessage> : null}

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
              </Form>
            )}
          </Formik>
        </StyledFormDiv>
      </AccountPageDiv >
    );
};

export default Signup;
