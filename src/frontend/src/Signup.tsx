import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline, Typography } from "@material-ui/core";
import styled from "styled-components";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  FormDiv,
  PrimaryButton,
  AccountPageDiv,
  FormAlert,
  Routes,
  useUser,
  LightTheme,
  HeaderBar,
  FormOuterDiv,
  LightTitleBGGrad,
  FormBottomButtonsDiv
} from "jinxui";

import { TextField } from "formik-material-ui";

const StyledButton = styled(PrimaryButton)`
  margin: auto;
  margin-top: 30px;
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
    90px
    90px
    90px
    90px
    max-content
    30px
    10px
`;

const FormTitleDiv = styled.div`
  margin-top: 30px;
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
  const { userData } = useUser();

  /** Due to how the router protection works, this is a bit hackey.
   * The Routes.LOGIN route is not protected, because doing so causes
   * the redirect from LOGIN to PORTFOLIO_EDIT (a protected route) to
   * be overridden by the route protection's redirect (i.e. to home).
   */
  const [redirect, setRedirect] = useState(
    userData.authenticated ? true : false
  );

  const { signup } = useUser();

  const onRegister = () => {
    return <Redirect to={Routes.PORTFOLIO_EDIT} />;
  };

  const [submittionError, setSubmittionError] = useState("");

  if (redirect) return onRegister();
  else
    return (
      <ThemeProvider theme={LightTheme}>
        <CssBaseline />
        <AccountPageDiv>
          <HeaderBar title="Sign Up" lightTheme={true}></HeaderBar>
          <FormOuterDiv>
            <div />
            <FormDiv
              variant="elevation"
              elevation={8}
              style={{ background: LightTitleBGGrad}}
            >
              <FormTitleDiv>
                <Typography variant="h5">Sign up for free!</Typography>
              </FormTitleDiv>
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
                  signup(
                    values.username,
                    values.email,
                    values.password,
                    values.firstName,
                    values.lastName
                  )
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
                    <FormSectionsDiv>
                    <Field
                      component={TextField}
                      id="firstName"
                      variant="outlined"
                      color="primary"
                      fullWidth
                      name="firstName"
                      label="First Name"
                    />

                    <Field
                      component={TextField}
                      id="lastName"
                      variant="outlined"
                      color="primary"
                      fullWidth 
                      name="lastName" 
                      label="Last Name" />

                    <Field
                      component={TextField}
                      id="username"
                      variant="outlined"
                      color="primary"
                      fullWidth 
                      name="username" 
                      label="Username" />

                    <Field
                      component={TextField}
                      id="email"
                      variant="outlined"
                      color="primary"
                      fullWidth
                      name="email"
                      type="email"
                      label="Email"
                    />

                    <Field
                      component={TextField}
                      id="password"
                      variant="outlined"
                      color="primary"
                      fullWidth
                      name="password"
                      type="password"
                      label="Password"
                    />

                    <Field
                      component={TextField}
                      id="passwordConfirm"
                      variant="outlined"
                      color="primary"
                      fullWidth
                      name="passwordConfirm"
                      type="password"
                      label="Confirm Password"
                    />
                    <FormBottomButtonsDiv>

                    <StyledButton 
                      type="submit" 
                      disabled={isSubmitting}>
                      JOIN
                    </StyledButton>
                      </FormBottomButtonsDiv>

                    <StyledLink href={Routes.LOGIN}>
                      <Typography variant="subtitle2">Already have an account? Log In</Typography>
                    </StyledLink>
                    </FormSectionsDiv>
                  </Form>
                )}
              </Formik>
              <div />
            </FormDiv>
          </FormOuterDiv>
        </AccountPageDiv>
      </ThemeProvider>
    );
};

export default Signup;
