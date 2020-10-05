import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  ErrorMessage,
  FormDiv,
  FormEntry,
  PrimaryButton,
  SecondaryButton,
  AccountPageDiv,
  FormAlert,
  Routes,
  useUser,
  DarkTheme,
  HeaderBar,
} from "jinxui";
import styled from "styled-components";

// The styling isn't DRY - where are we putting this?
const StyledFormEntry = styled(FormEntry)`
  // font-family: "Heebo", sans-serif;
  width: 300px;
  margin-top: 40px;
  margin-bottom: 5px;
`;

const FormTitle = styled.h2`
  color: #eeeeee;
  font-weight: 300;
`;

const FormText = styled.h4`
  font-family: "Heebo", sans-serif;
  color: #eeeeee;
  font-weight: 300;
`;

const StyledFormDiv = styled(FormDiv)`
  margin-top: 100px;
`;

const StyledLink = styled.a`
  text-decoration: none;
  position: relative;
`;

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Too Short!")
    .max(150, "Too Long!")
    .matches(
      /^[a-zA-Z0-9_@+.-]+$/,
      "Can only contain letters, numbers, and some special characters"
    )
    .required("Required"),
  password: Yup.string().required("Required"),
});

const Login = () => {
  const [submittionError, setSubmittionError] = useState("");

  const { userData, login } = useUser();
  /** Due to how the router protection works, this is a bit hackey.
   * The Routes.LOGIN route is not protected, because doing so causes
   * the redirect from LOGIN to PORTFOLIO_EDIT (a protected route) to
   * be overridden by the route protection's redirect (i.e. to home).
   */
  const [redirect, setRedirect] = useState(
    userData.authenticated ? true : false
  );

  const onLogin = () => {
    // At the moment, this fails if a portfolio hasn't been created yet.
    return <Redirect to={Routes.PORTFOLIO_EDIT} />;
  };

  if (redirect) {
    return onLogin();
  } else {
    return (
      <ThemeProvider theme={DarkTheme}>
        <CssBaseline />
        <AccountPageDiv>
          <HeaderBar title="Login" />
          <StyledFormDiv>
            <FormTitle>Enter Details</FormTitle>
            {submittionError ? (
              <FormAlert severity="error">
                Error logging in: {submittionError}.
              </FormAlert>
            ) : null}
            <Formik
              initialValues={{ username: "", password: "" }}
              validationSchema={SignupSchema}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                login(values.username, values.password)
                  .then((config: any) => {
                    setRedirect(true);
                  })
                  .catch((error) => {
                    setSubmittionError(error);
                    setSubmitting(false)
                  });
              }}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form>
                  <StyledFormEntry
                    name="username"
                    type="username"
                    placeholder="Username"
                  />
                  {errors.username && touched.username ? (
                    <ErrorMessage>{errors.username}</ErrorMessage>
                  ) : null}

                  <StyledFormEntry
                    name="password"
                    type="password"
                    placeholder="Password"
                  />
                  {errors.password && touched.password ? (
                    <ErrorMessage>{errors.password}</ErrorMessage>
                  ) : null}

                  <PrimaryButton type="submit" disabled={isSubmitting}>
                    LOGIN
                  </PrimaryButton>
                  <SecondaryButton>"Reset Password"</SecondaryButton>

                  <StyledLink href={Routes.SIGNUP}>
                    <FormText>Sign up for an account</FormText>
                  </StyledLink>
                </Form>
              )}
            </Formik>
          </StyledFormDiv>
        </AccountPageDiv>
      </ThemeProvider>
    );
  }
};

export default Login;
