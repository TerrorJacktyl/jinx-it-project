import React, { useState } from "react";
import styled from "styled-components";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import {
  ErrorMessage,
  FormDiv,
  FormEntry,
  Button2,
  Button3,
  SiteHeader,
  HeaderDiv,
  LogoLink,
  HeaderTitle,
  AccountPageDiv,
} from "jinxui";

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

const UploadButton = styled(Button3)`
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


const StyledPublishButton = styled(Button3)`
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

const StyledCancelButton = styled(Button2)`
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

function post_section(portfolio_id: string, section_id: string, data: any) {
  const axios = require("axios").default;
  const auth_header = {"Authorization": "Token 8295edf270ca01fc8fefabf5e2d508507a970fcd"}
  axios.post(`http://127.0.0.1:8080/api/portfolios/${portfolio_id}/pages/${section_id}/sections`,
    data, {headers: auth_header})
  .then(function (response: any) {
    console.log(response)
  })
  .catch(function (error: any) {
                      console.log(error)
                    })
}

const Edit = () => {
  const axios = require("axios").default;
  const [submittionError, setSubmittionError] = useState(false);
  const [imageFile, setImageFile] = useState<File>(
    new File(["http://127.0.0.1:8080/media/images/blank_user.png"], "blank_user.png"));
  const [imageURL, setImageURL] = useState("http://127.0.0.1:8080/media/images/blank_user.png")
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
            const portfolio_data    = {name: values.websiteName}
            const page_data         = {name: "home", number: "0"}
            const bio_data          = {name: "biography", number: "0", content: values.biography, type: "text"}
            const academic_data     = {name: "academic_history", number: "0", content: values.academicHistory, type: "text"}
            const professional_data = {name: "professional_history", number: "0", content: values.professionalHistory, type: "text"}
            const auth_header = {"Authorization": "Token 8295edf270ca01fc8fefabf5e2d508507a970fcd"}
            setSubmitting(true);
            axios
              .post(`http://127.0.0.1:8080/api/portfolios`, 
                portfolio_data, {headers: auth_header})
              .then(function (portf_response: any) {
                axios
                  .post(`http://127.0.0.1:8080/api/portfolios/${portf_response.data.id}/pages`, 
                    page_data, {headers: auth_header})
                  .then(function (page_response: any) {
                    console.log(page_response);
                    post_section(portf_response.data.id, page_response.data.id, bio_data);
                    post_section(portf_response.data.id, page_response.data.id, academic_data);
                    post_section(portf_response.data.id, page_response.data.id, professional_data);
                  }).catch(function (error2: any) {
                    setSubmittionError(true);
                    setSubmitting(false);
                    console.log(error2);
                  });
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
              <MinimalDivStyle>
                <FieldTitle>Website Name</FieldTitle>
                <StyledFormEntry name="websiteName" />
                {errors.websiteName && touched.websiteName ? (
                  <ErrorMessage>{errors.websiteName}</ErrorMessage>
                ) : null}
                <BlankUser src={imageURL} />
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
                    const form_data = new FormData();
                    form_data.append("image", imageFile, imageFile.name);
                    form_data.append("name", imageFile.name);
                    form_data.append("owner", "2")
                    axios
                      .post("http://127.0.0.1:8080/api/images/", form_data, {
                        headers: {
                          "Content-Type": "multipart/form-data",
                          "Authorization": "Token 8295edf270ca01fc8fefabf5e2d508507a970fcd"
                        },
                      })
                      .then(function (response: any) {
                        console.log(response);
                        setImageURL(response.data.image);
                      })
                      .catch(function (error: any) {
                        console.log(error);
                    });
                  }}>
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
