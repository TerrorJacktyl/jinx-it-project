import React, { useState } from "react";
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
import styled from "styled-components";

const StyledFormEntry = styled(FormEntry)`
  font-family: "Heebo", sans-serif;
  margin-top: 15px;
  margin-bottom: 15px;
`;

const FormTitle = styled.h2`
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

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

const Login = () => {
  const [submittionError, setSubmittionError] = useState(false);

  const { login, logout } = useUser();

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
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={SignupSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            // login(values.email, values.password);
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
              {submittionError ? <ErrorMessage>Error signing up. Please try again later.</ErrorMessage> : null}

              <StyledButton
                width={null}
                textColour="#EEEEEE"
                backgroundColour={null}
                hoverColour="#EEEEEE"
                contrastColour="#1C1C1C"
                text="Reset Password"
                fontSize={"20px"}
              />
            </Form>
          )}
        </Formik>
      </StyledFormDiv>
    </AccountPageDiv >)
}

export default Login;
