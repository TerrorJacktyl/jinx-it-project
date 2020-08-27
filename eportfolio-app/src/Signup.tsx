import React, { useState } from 'react';
import styled from 'styled-components';
import { Formik, Form, Field} from 'formik';
import { Button } from '@material-ui/core';
import * as Yup from 'yup';

const Layout = styled.div`
    max-width: 1100px;
    margin: auto;
`;

const EntryTitle = styled.h3`
    margin-bottom: 10px;
    margin-top: 20px;
    font-weight: 150;

`;

const StyledFormEntry = styled(Field)`
    max-width: 100%;
    font-size: 20px;

    ${({ nameentry }) => nameentry && `
    max-width: 80%;
    `}
`;

const NameEntry = styled.div`
    display: inline-block;
    vertical-align:top;
`

const ErrorMessage = styled.div`
    color: red;
    font-size: 0.8em;
    margin-top: 5px;
`

const StyledButton = styled(Button)`
    display: block !important;
    margin: auto !important;
    margin-top: 20px !important;
    margin-bottom: 20px !important;
`

const FormDiv = styled.div`
    border-style: groove;
    width: 50%;
    margin: auto;
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
        <Layout>
        <h1>Sign up</h1>
        <FormDiv>
            <Formik
                initialValues={{ firstName: '', lastName: '', email: '', password: '' }}
                validationSchema={SignupSchema}
                onSubmit={(values, { setSubmitting }) => {

                    setSubmitting(true);

                    axios.post(`localhost:8080/signup`, {
                        firstName: values.firstName,
                        lastName: values.lastName,
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
                    <NameEntry>
                    <EntryTitle>First Name</EntryTitle>
                    <StyledFormEntry name="firstName" nameentry={true}/>
                    {errors.firstName && touched.firstName ? (<ErrorMessage>{errors.firstName}</ErrorMessage>) : null}
                    </NameEntry>
                    <NameEntry>
                    <EntryTitle>Last Name</EntryTitle>
                    <StyledFormEntry name="lastName" nameentry={true}/>
                    {errors.lastName && touched.lastName ? (<ErrorMessage>{errors.lastName}</ErrorMessage>) : null}
                    </NameEntry>
                    <EntryTitle>Email</EntryTitle>
                    <StyledFormEntry name="email" type="email" />
                    {errors.email && touched.email ? <ErrorMessage>{errors.email}</ErrorMessage> : null}
                    <EntryTitle>Password</EntryTitle>
                    <StyledFormEntry name="password" type="password" />
                    {errors.password && touched.password ? <ErrorMessage>{errors.password}</ErrorMessage> : null}
                    <StyledButton variant="contained" type="submit">Sign Up</StyledButton>
                    {submittionError ? <ErrorMessage>Error signing up. Please try again later.</ErrorMessage> : null}
                </Form>
                )}
            </Formik>
        </FormDiv>
        </Layout>
    )
}

export default Signup;