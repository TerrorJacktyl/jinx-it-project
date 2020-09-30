import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import styled from "styled-components";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import {
  ErrorMessage,
  FormDiv,
  FormEntry,
  PrimaryButton,
  SecondaryButton,
  SiteHeader,
  HeaderDiv,
  LogoLink,
  HeaderTitle,
  AccountPageDiv,
  useUser
} from "jinxui";

const FRONT_END_URL = 'http://localhost:3000/'

const MinimalDivStyle = styled.div`
  margin-left: 30px;
  margin-right: 30px;
  width: auto;
`;

const WideFormDiv = styled(FormDiv)`
  width: 920px;
`;

const StyledFormEntry = styled(FormEntry)`
  width: 100%;
  margin-top: 5px;
  margin-bottom: 10px;
`;
const TallStyledFormEntry = styled(StyledFormEntry)`
  height: 360px;
  width: 100%;
  align: left;
  control: textarea;
  rows: 6;
`;

const UploadButton = styled(PrimaryButton)`
  max-width: 362px;
`;

const BlankUser = styled.img`
  display: block;
  max-width: 362px;
  width: 100%;
  margin-right: 30px;
  height: auto;
  align: left;
  margin-top: 30px;
  border: 2px solid #FFFFFF;
  border-radius: 10px;
`;

const FormTitle = styled.h2`
  font-family: "Heebo", sans-serif;
  color: #eeeeee;
  font-weight: 300;
`;

const BrowseButton = styled.input`
  color: #eeeeee;
  align: left;
  margin-top: 10px;
  margin-left: 0px;
  display: block;
  align: left;
  text-align: left;
`;

const FieldTitle = styled.h3`
  font-family: "Heebo", sans-serif;
  color: #eeeeee;
  font-weight: 300;
  margin-bottom: 0px;
  margin-left: 0px;
  text-align: left;
`;


const StyledPublishButton = styled(SecondaryButton)`
  @media (max-width: 600px) {
    margin-left: auto;
    margin-right: auto;  
    align: centre;
    position: relative;
  }
  @media (min-width: 600px) {
    float: right;
  }
`;

const StyledCancelButton = styled(PrimaryButton)`
  @media (max-width: 600px) {
    margin-left: auto;
    margin-right: auto;
    align: centre;
    position: relative;
  }  
  @media (min-width: 600px) {
    display: block;
    position: relative;
    float: left;
  }
`;
const StyledFormDiv = styled(WideFormDiv)`
  margin-top: 70px;
  height: auto;
  margin-bottom: 100px;
  width: 90%;
  max-width: 900px;
`;

const StyledLink = styled.a`
  text-decoration: none;
  position: relative;
`;

const ProfileSchema = Yup.object().shape({
  websiteName: Yup.string()
    .max(50, "Too Long!")
    .required("Required"),
});

function PostSection(postSection: any, portfolio_id: string, page_id: string, data: any) {
  postSection(portfolio_id, page_id, data)
  .then(function (response: any) {
    console.log(response)
  })
  .catch(function (error: any) {
    console.log(error)
  })
}


const Edit = () => {
  // TEST
  const [published, setPublished] = useState(false);
  // TEST
  const [portfolioId, setPortfolioId] = useState(-1);
  const [submittionError, setSubmittionError] = useState(false);
  const [imageFile, setImageFile] 
    = useState<File>(
      new File([FRONT_END_URL + "blank_user.png"], "blank_user.png")
    );
  const [imageResponse, setImageResponse] 
    = useState({image: FRONT_END_URL + "blank_user.png", id: "0"})
  const { uploadImage, postPortfolio, postPage, postSection } = useUser();
  const { setCurrentPortfolio } = useUser();

  // TEST
  const onPublish = () => {
    return <Redirect to="/portfolio" />
  }

  // TEST
  if (published) {
    if (portfolioId > 0) {
      setCurrentPortfolio(portfolioId);
    }
    return onPublish();
  }

  return (
    <AccountPageDiv>
      <SiteHeader>
        <HeaderDiv>
          <LogoLink />
          <HeaderTitle>Account Profile</HeaderTitle>
        </HeaderDiv>
      </SiteHeader>
      <StyledFormDiv>
        <FormTitle>Enter your information</FormTitle>
        <Formik
          initialValues={{
            websiteName: "",
            biography: "",
            academicHistory: "",
            professionalHistory: "",
          }}
          validationSchema={ProfileSchema}
          onSubmit={(values, { setSubmitting }) => {
            const portfolio_data = {
              name: values.websiteName}
            const page_data = {
              name: "home", 
              number: "0"
            }
            const bio_data          = {
              name: "biography", 
              number: "0", 
              image: imageResponse.id, 
              content: values.biography, 
              type: "image_text"
            }
            const academic_data = {
              name: "academic_history", 
              number: "0", 
              content: values.academicHistory, 
              type: "text"
            }
            const professional_data = {
              name: "professional_history", 

              number: "0", 
              content: values.professionalHistory, 
              type: "text"
            }
            setSubmitting(true);
            // TEST
            setPublished(true);
            postPortfolio(portfolio_data)
            .then(function (portfolio_response: any) {
              const portfolio_id = portfolio_response.data.id
              // TEST
              setPortfolioId(portfolio_id);
              postPage(portfolio_id, page_data)
              .then(function (page_response: any) {
                console.log(page_response)
                const page_id = page_response.data.id
                PostSection(postSection, portfolio_id, page_id, bio_data)
                PostSection(postSection, portfolio_id, page_id, academic_data)
                PostSection(postSection, portfolio_id, page_id, professional_data)
              })
              .catch(function (error: any) {
                console.log(error)
                setSubmitting(false)
              })
              console.log(portfolio_response);
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
              <MinimalDivStyle>
                <FieldTitle>Website Name</FieldTitle>
                <StyledFormEntry name="websiteName" />
                {errors.websiteName && touched.websiteName ? (
                  <ErrorMessage>{errors.websiteName}</ErrorMessage>
                ) : null}
                <BlankUser src={imageResponse.image} />
                <BrowseButton
                  id="file"
                  name="file"
                  type="file"
                  onChange={(event) => {
                    if (event.currentTarget.files) {
                      setImageFile(event.currentTarget.files[0]);
                    } else {
                      setImageFile(new File([""], "blank_file"));
                    }
                  }}
                />
                <UploadButton
                type="button"
                onClick={() => {
                  uploadImage(imageFile, imageFile.name)
                    .then(response => {
                      console.log(response);
                      setImageResponse(response.data)
                    })
                    .catch(error =>{
                      console.log(error)
                    })
                  }}
                >
                  Upload
                </UploadButton>
                <br></br>
                <FieldTitle>Biography</FieldTitle>

                <TallStyledFormEntry component="textarea" name="biography" />
                {errors.biography && touched.biography ? (
                  <ErrorMessage>{errors.biography}</ErrorMessage>
                ) : null}

                <FieldTitle>Academic History</FieldTitle>
                <TallStyledFormEntry
                  component="textarea"
                  name="academicHistory"
                />
                {errors.academicHistory && touched.academicHistory ? (
                  <ErrorMessage>{errors.academicHistory}</ErrorMessage>
                ) : null}

                <FieldTitle>Professional History</FieldTitle>
                <TallStyledFormEntry
                  component="textarea"
                  name="professionalHistory"
                />
                {errors.professionalHistory && touched.professionalHistory ? (
                  <ErrorMessage>{errors.professionalHistory}</ErrorMessage>
                ) : null}
                <div>
                  <StyledPublishButton 
                  type = "submit">
                    Publish
                  </StyledPublishButton>
                </div>
                <StyledLink href="/">
                  <StyledCancelButton
                  type = "button">
                    Cancel
                  </StyledCancelButton>
                </StyledLink>
                {submittionError ? (
                  <ErrorMessage>
                    Error signing up. Please try again later.
                  </ErrorMessage>
                ) : null}
              </MinimalDivStyle>
            </Form>
          )}
        </Formik>          
      </StyledFormDiv>
    </AccountPageDiv>
  );
};

export default Edit;
