import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { ErrorMessage, EntryTitle, FormDiv, FormEntry, SubmitButton, SiteLayout } from 'jinxui';

const StyledFormEntry = styled(FormEntry)`

    ${({ nameentry }) => nameentry && `
    max-width: 80%;
    `}
`;



const StickyDiv = styled.div`
  position: sticky;
  top: 0;
  z-index: 999;
`

const AccountButton = styled(Button)`
    display: flex;
    float: right;
`;

const SiteHeader = styled.header`
  margin-bottom: 1.45rem;

`;

const HeaderDiv = styled.div`
  margin: 0 auto;
  max-width: 90%;
  padding: 0.6rem 0.5rem 0.2rem;
`
const ProfileSchema = Yup.object().shape({
  websiteName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  biography: Yup.string()
    .min(2, 'Too Short!'),
  academicHistory: Yup.string()
    .min(2, 'Too Short!'),
  professionalHistory: Yup.string()
    .min(2, 'Too Short!'),
});

const Profile = () => {
  const axios = require('axios').default;
  const [submittionError, setSubmittionError] = useState(false);
  return (
      <div>
      <StickyDiv>
          <SiteHeader>
              <HeaderDiv>
                  <a href="/" >
                      <AccountButton color="primary">Home</AccountButton>
                  </a>
                  <a href="/" >
                      <AccountButton color="primary">Sign out</AccountButton>
                  </a>
              </HeaderDiv>
          </SiteHeader>
      </StickyDiv>
      <SiteLayout>
      <h1>Profile</h1>
      <FormDiv>
          <Formik
              initialValues={{ websiteName: '', biography: '', academicHistory: '', professionalHistory: '' }}
              validationSchema={ProfileSchema}
              onSubmit={(values, { setSubmitting }) => {

                  setSubmitting(true);

                  axios.post(`localhost:8080/api/create_profile`, {
                      websiteName: values.websiteName,
                      biography: values.biography,
                      academicHistory: values.academicHistory,
                      professionalHistory: values.professionalHistory,
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
                  <EntryTitle>Website Name</EntryTitle>
                  <FormEntry name="websiteName" type="websiteName" />
                  {errors.websiteName && touched.websiteName ? <ErrorMessage>{errors.websiteName}</ErrorMessage> : null}
                  <EntryTitle>Biography</EntryTitle>
                  <FormEntry name="biography" type="biography" />
                  {errors.biography && touched.biography ? <ErrorMessage>{errors.biography}</ErrorMessage> : null}
                  <EntryTitle>Academic History</EntryTitle>
                  <FormEntry name="academicHistory" type="academicHistory" />
                  {errors.academicHistory && touched.academicHistory ? <ErrorMessage>{errors.academicHistory}</ErrorMessage> : null}
                  <EntryTitle>Professional History</EntryTitle>
                  <FormEntry name="professionalHistory" type="professionalHistory" />
                  {errors.professionalHistory && touched.professionalHistory ? <ErrorMessage>{errors.professionalHistory}</ErrorMessage> : null}
                  <SubmitButton variant="contained" type="submit" disabled={isSubmitting}>Sign Up</SubmitButton>
                  {submittionError ? <ErrorMessage>Error signing up. Please try again later.</ErrorMessage> : null}
              </Form>
              )}
          </Formik>
      </FormDiv>
      </SiteLayout>
      </div>
  )
}

export default Profile;