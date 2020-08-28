import React, { useState } from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { ErrorMessage, EntryTitle, FormDiv, FormEntry, SubmitButton, SiteLayout } from 'jinxui';

const StyledFormEntry = styled(FormEntry)`

    ${({ nameentry }) => nameentry && `
    max-width: 80%;
    `}
`;

const NameEntry = styled.div`
    display: inline-block;
    vertical-align:top;
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
        <SiteLayout>
        <h1>Sign up</h1>
        <FormDiv>
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
                    <SubmitButton variant="contained" type="submit" disabled={isSubmitting}>Sign Up</SubmitButton>
                    {submittionError ? <ErrorMessage>Error signing up. Please try again later.</ErrorMessage> : null}
                </Form>
                )}
            </Formik>
        </FormDiv>
        </SiteLayout>
    )
}

export default Signup;