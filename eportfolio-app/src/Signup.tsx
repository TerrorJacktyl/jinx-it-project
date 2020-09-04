import React, { useState } from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { ErrorMessage, EntryTitle, FormDiv, FormEntry, SubmitButton, SiteLayout, Button, SiteHeader, HeaderDiv, LogoLink, HeaderTitle } from 'jinxui';

const StyledFormEntry = styled(FormEntry)`
    margin-top: 15px;
    margin-bottom: 15px;
`
const FormTitle = styled.h2`
    color: #EEEEEE;
    font-weight: 300;
`

const PageDiv = styled.div`
    background: #434343;
    height: 100vh;
    background-image: url(${require("images/Logo_Background.svg")});
    background-position: center; 
    background-repeat: no-repeat; 
    overflow: auto;
    text-align: center;
`

const StyledButton = styled(Button)`
  margin: auto;
  margin-top: 30px;
`

const StyledFormDiv = styled(FormDiv)`
  margin-top: 100px;
`

const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    lastName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    email: Yup.string()
      .email('Invalid email')
      .required('Required'),
    password: Yup.string()
      .required('Required')
  });

const Signup = () => {

    const axios = require('axios').default;
    const [submittionError, setSubmittionError] = useState(false);

    return(
        <PageDiv>
        <SiteHeader>
            <HeaderDiv>
                <LogoLink />
                <HeaderTitle>Sign Up</HeaderTitle>
            </HeaderDiv>
        </SiteHeader>
        <StyledFormDiv>
            <FormTitle>Sign up for free!</FormTitle>
            <Formik
                initialValues={{ firstName: '', lastName: '', email: '', password: '' }}
                validationSchema={SignupSchema}
                onSubmit={(values, { setSubmitting }) => {

                    setSubmitting(true);

                    axios.post(`localhost:8080/api/sign_up`, {
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
                    <StyledFormEntry name="firstName" placeholder="First Name"/>
                    {errors.firstName && touched.firstName ? (<ErrorMessage>{errors.firstName}</ErrorMessage>) : null}
                    <StyledFormEntry name="lastName" placeholder="Last Name"/>
                    {errors.lastName && touched.lastName ? (<ErrorMessage>{errors.lastName}</ErrorMessage>) : null}
                    <StyledFormEntry name="email" type="email" placeholder="Email"/>
                    {errors.email && touched.email ? <ErrorMessage>{errors.email}</ErrorMessage> : null}
                    <StyledFormEntry name="password" type="password" placeholder="Password"/>
                    {errors.password && touched.password ? <ErrorMessage>{errors.password}</ErrorMessage> : null}
                    <StyledButton type="submit" disabled={isSubmitting} width={null} textColour="#00FFC2" backgroundColour={null} hoverColour="#00FFC2" contrastColour="#1C1C1C" text="Join" fontSize={null}/>
                    {submittionError ? <ErrorMessage>Error signing up. Please try again later.</ErrorMessage> : null}
                </Form>
                )}
            </Formik>
        </StyledFormDiv>
        </PageDiv>
    )
}

export default Signup;