import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline, Typography } from "@material-ui/core";
import { Formik, Form, Field } from "formik";

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
  LightTheme,
  LightTitleBGGrad,
  HeaderBar,
} from "jinxui";
import styled from "styled-components";

import { TextField } from "formik-material-ui";

const FormTitleDiv = styled.div`
  // color: #eeeeee;
  // font-weight: 300;
  // display: flex;
  margin-top: 30px;
  //height: 300px;
`;

const FormOuterDiv = styled.div`
  height: 90%;
  width: 100vw;
  display: flex;
  align-items: center;
  align-content: center;
  flex-direction: column;
  justify-content: center;
  margin-top: 10px;
`;

const StyledLink = styled.a`
  text-decoration: none;
  position: relative;
`;

const FormSectionsDiv = styled.div`
  margin: 30px;
  display: grid;
  grid-template-rows:
    90px
    90px
    max-content
    30px
    10px
`;

const BottomButtonsDiv = styled.div`
  display: flex;
  flex-direction: row-reverse;
  flex-wrap: wrap;
  justify-content: center;
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
      <ThemeProvider theme={LightTheme}>
        <CssBaseline />
        <AccountPageDiv>

          <HeaderBar title="Login" lightTheme={true} />

          <FormOuterDiv>
            <FormDiv
              variant="elevation"
              elevation={8}
              style={{ background: LightTitleBGGrad }}
              >
                {/* <FormTitle>Enter Details</FormTitle> */}
              <FormTitleDiv>
                <Typography variant="h5">Enter Details</Typography>
              </FormTitleDiv>
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
                    <FormSectionsDiv>
                      <div>

                      <Field
                        component={TextField}
                        name="username"
                        id="username"
                        label="Username"
                        variant="outlined"
                        color="primary"
                        fullWidth
                        />
                        </div><div>

                      <Field
                        component={TextField}
                        name="password"
                        id="password"
                        type="password"
                        label="Password"
                        variant="outlined"
                        color="primary"
                        fullWidth
                        />
                        </div>
                        <BottomButtonsDiv>
                      <PrimaryButton type="submit" disabled={isSubmitting}>
                        LOGIN
                      </PrimaryButton>
                      <SecondaryButton>Reset Password</SecondaryButton>
                    </BottomButtonsDiv>
                    <div>


                      <StyledLink href={Routes.SIGNUP}>
                        {/* <FormText>Sign up for an account</FormText> */}
                        <Typography variant="button">Sign up for an account</Typography>
                      </StyledLink>
                    </div>
                  </FormSectionsDiv>
                    </Form>
                  )}
                </Formik>
            </FormDiv>
          </FormOuterDiv>
        </AccountPageDiv>
      </ThemeProvider>
    );
  }
};

export default Login;
