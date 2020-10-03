import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import styled from "styled-components";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  ErrorMessage,
  FormDiv,
  FormEntry,
  PrimaryButton,
  AccountPageDiv,
  FormAlert,
  Routes,
  useUser,
  DarkTheme,
  HeaderBar,
} from "jinxui";

const StyledFormEntry = styled(FormEntry)`
  // font-family: "Heebo", sans-serif;
  width: 300px;
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
`;

const StyledButton = styled(PrimaryButton)`
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
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(150, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(150, "Too Long!")
    .required("Required"),
  username: Yup.string()
    .min(2, "Too Short!")
    .max(150, "Too Long!")
    .matches(
      /^[a-zA-Z0-9_@+.-]+$/,
      "Can only contain letters, numbers, and some special characters"
    )
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(8, "Too Short!")
    .matches(/(?!^\d+$)^.+$/, "Password cannot consist of only numbers")
    .required("Required"),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords don't match")
    .required("Required"),
});

const Signup = () => {
  // This could be parametrized to accept multiple different redirects
  // e.g. hold a component to redirect to rather than a boolean for a redirect to login page
  const [redirect, setRedirect] = useState(false);

  const { signup } = useUser();

  const onRegister = () => {
    return <Redirect to={Routes.LOGIN} />
  }

  const [submittionError, setSubmittionError] = useState("");

  if (redirect) return onRegister();
  else
    return (
      <ThemeProvider theme={DarkTheme}>
        <CssBaseline />
      <AccountPageDiv>
        <HeaderBar></HeaderBar>
        <StyledFormDiv>
          <FormTitle>Sign up for free!</FormTitle>
          {submittionError ? (
            <FormAlert severity="error">
              Error logging in: {submittionError}.
            </FormAlert>
          ) : null}
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              username: "",
              email: "",
              password: "",
              passwordConfirm: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);

              // Sign up *and* login the user
              signup(values.username, values.email, values.password, values.firstName, values.lastName)
                .then(() => {
                  setSubmitting(false);
                  setRedirect(true);
                })
                .catch(function (error) {
                  setSubmitting(false);
                  setSubmittionError(error);
                });
            }}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form>
                <StyledFormEntry name="firstName" placeholder="First Name" />
                {errors.firstName && touched.firstName ? (
                  <ErrorMessage>{errors.firstName}</ErrorMessage>
                ) : null}

                <StyledFormEntry name="lastName" placeholder="Last Name" />
                {errors.lastName && touched.lastName ? (
                  <ErrorMessage>{errors.lastName}</ErrorMessage>
                ) : null}

                <StyledFormEntry name="username" placeholder="Username" />
                {errors.username && touched.username ? (
                  <ErrorMessage>{errors.username}</ErrorMessage>
                ) : null}

                <StyledFormEntry
                  name="email"
                  type="email"
                  placeholder="Email"
                />
                {errors.email && touched.email ? (
                  <ErrorMessage>{errors.email}</ErrorMessage>
                ) : null}

                <StyledFormEntry
                  name="password"
                  type="password"
                  placeholder="Password"
                />
                {errors.password && touched.password ? (
                  <ErrorMessage>{errors.password}</ErrorMessage>
                ) : null}

                <StyledFormEntry
                  name="passwordConfirm"
                  type="password"
                  placeholder="Confirm Password"
                />
                {errors.passwordConfirm && touched.passwordConfirm ? (
                  <ErrorMessage>{errors.passwordConfirm}</ErrorMessage>
                ) : null}
                <StyledButton 
                  type="submit" 
                  disabled={isSubmitting}>
                  Join
                </StyledButton>

                <StyledLink href={Routes.LOGIN}><FormText>Already have an account? Log In</FormText></StyledLink>
              </Form>
            )}
          </Formik>
        </StyledFormDiv>
      </AccountPageDiv>
      </ThemeProvider>
    );
};

export default Signup;
