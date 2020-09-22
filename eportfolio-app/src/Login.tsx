import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
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
  useUser,
} from "jinxui";
import { Alert } from '@material-ui/lab';
import styled from "styled-components";

// The styling isn't DRY - where are we putting this?
const StyledFormEntry = styled(FormEntry)`
  font-family: "Heebo", sans-serif;
  margin-top: 15px;
  margin-bottom: 15px;
`;

const FormTitle = styled.h2`
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

const StyledAlert = styled(Alert)`
  width: 80%;
  margin: auto;
  margin-top: 10px;
`


const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

const Login = () => {
  const [submittionError, setSubmittionError] = useState('');
  const [redirect, setRedirect] = useState(false);

  const { login } = useUser();

  const onLogin = () => {
    return <Redirect to="/profile" />
  }

  if (redirect) {
    return onLogin();
  }
  else {
    return (
      <AccountPageDiv>
        <SiteHeader>
          <HeaderDiv>
            <LogoLink />
            <HeaderTitle>Login</HeaderTitle>
          </HeaderDiv>
        </SiteHeader>

        <StyledFormDiv>
          <FormTitle>Enter Details</FormTitle>
          {submittionError ? <StyledAlert severity="error">Error logging in: {submittionError}.</StyledAlert> : null}
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={SignupSchema}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              login(values.email, values.password)
                .then(data => {
                  setRedirect(true);
                  console.log(data);
                })
                .catch(error => {
                  // Manually unpack error here
                  if (error.response !== undefined){
                    setSubmittionError(error.response.data.non_field_errors[0]);
                    console.log(error.response.data.non_field_errors[0]);
                  }
                  else{
                    setSubmittionError("service is currently unavailable, please try again later");
                    console.error("Unable to connect to API for login");
                  }                  
                });
            }}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form>
                <StyledFormEntry name="email" type="email" placeholder="Email address" />
                {errors.email && touched.email ? <ErrorMessage>{errors.email}</ErrorMessage> : null}

                <StyledFormEntry name="password" type="password" placeholder="Password" />
                {errors.password && touched.password ? <ErrorMessage>{errors.password}</ErrorMessage> : null}

                <StyledButton
                  type="submit"
                  disabled={isSubmitting}
                  width={null}
                  textColour="#00FFC2"
                  backgroundColour={null}
                  hoverColour="#00FFC2"
                  contrastColour="#1C1C1C"
                  text="Login"
                  fontSize={null}
                />

                <StyledButton
                  width={null}
                  textColour="#EEEEEE"
                  backgroundColour={null}
                  hoverColour="#EEEEEE"
                  contrastColour="#1C1C1C"
                  text="Reset Password"
                  fontSize={"20px"}
                />

                <StyledLink href="/signup" ><FormText>Sign up for an account</FormText></StyledLink>

              </Form>

            )}
          </Formik>
        </StyledFormDiv>
      </AccountPageDiv >)
  }
}

export default Login;
