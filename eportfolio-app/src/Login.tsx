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

const LoginButton = styled(PrimaryButton)`
  margin: auto;
  margin-top: 30px;
`;

const ResetPasswordButton = styled(SecondaryButton)`
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

const SmallText = styled(FormText)`
  font-size: 14px;
  margin-top: 0px;
  margin-right: auto;
  margin-left: 30px;
  text-align: left;
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
  const [redirect, setRedirect] = useState(false);

  const { login } = useUser();

  const onLogin = () => {
    return <Redirect to="/edit" />;
  };

  if (redirect) {
    return onLogin();
  } else {
    return (
      <ThemeProvider theme={DarkTheme}>
        <CssBaseline />
        <AccountPageDiv>
          <HeaderBar />
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

                  <SmallText> Forgot your password? </SmallText>

                  <LoginButton type="submit" disabled={isSubmitting}>
                    Login
                  </LoginButton>

                  <ResetPasswordButton type="button">
                    Reset Password
                  </ResetPasswordButton>

                  <StyledLink href="/signup">
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
