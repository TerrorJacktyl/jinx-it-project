import React, { useState } from 'react';
import { Formik, Form} from 'formik';
import * as Yup from 'yup';
import { ErrorMessage, EntryTitle, FormDiv, FormEntry, SubmitButton, SiteLayout } from 'jinxui';


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

const Login = () => {

    const axios = require('axios').default;
    const [submittionError, setSubmittionError] = useState(false);

    return(
        <SiteLayout>
        <h1>Login</h1>
        <FormDiv>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={SignupSchema}
                onSubmit={(values, { setSubmitting }) => {

                    setSubmitting(true);

                    axios.post(`localhost:8080/login`, {
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
                    <EntryTitle>Email</EntryTitle>
                    <FormEntry name="email" type="email" />
                    {errors.email && touched.email ? <ErrorMessage>{errors.email}</ErrorMessage> : null}
                    <EntryTitle>Password</EntryTitle>
                    <FormEntry name="password" type="password" />
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

export default Login;