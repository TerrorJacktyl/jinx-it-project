import React, { useState, useEffect } from "react";

import styled from "styled-components";
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
} from "jinxui";


const WideFormDiv = styled(FormDiv)`
  width: 920px;
`;

const StyledFormEntry = styled(FormEntry)`
  width: 850px;
  margin-top: 5px;
  margin-bottom: 10px;
`;

const TallStyledFormEntry = styled(StyledFormEntry)`
  height: 360px;
  control: textarea;
  rows: 6;
`;

const FormTitle = styled.h2`
  font-family: "Heebo", sans-serif;
  color: #eeeeee;
  font-weight: 300;
`;

const FieldTitle = styled.h3`
  font-family: "Heebo", sans-serif;
  color: #eeeeee;
  font-weight: 300;
  margin-bottom: 0px;
  margin-left: 30px;
  text-align: left;
`;

const StyledButton = styled(Button)`
  display: inline;
  float: right;
  margin-top: 30px;
  margin-right: 30px;
  display: block;
  position: relative;
`;

const StyledCancelButton = styled(Button)`
  display: inline;
  float: left;
  margin-top: 30px;
  margin-left: 30px;
  display: block;
  position: relative;
`;

const StyledFormDiv = styled(WideFormDiv)`
  margin-top: 100px;
  height: 1520px;
`;

const StyledLink = styled.a`
  text-decoration: none;
  position: relative;
`;


type Section = {
  id: string,
  name: string,
  type: string,
  numer: number,
  content: string
};


const Portfolio = () => {
  const axios = require("axios").default;
  const account = {
    username: 'yeahnah',
    password: 'yeupyeup'
  }
  const [token, setToken] = useState(null);
  const [portfolios, setPortfolios] = useState(null);
  const [pages, setPages] = useState(null);
  const [sections, setSections] = useState(null);
//  useEffect(() => {
//    axios
//      .get(`http://127.0.0.1:8080/auth/token/login`, { auth: account })
//      .then((response: any) => {
//        setToken(response);
//        console.log(response);
//        return axios.get(`http://127.0.0.1:8080/api/portfolios`, { auth: token })
//      })
//      .then((response: any) => {
//        setPortfolios(response);
//        console.log(response);
//        return axios.get(`http://127.0.0.1:8080/api/portfolios/${response[0].id}/pages`, { auth: token }) 
//      })
//      .then((response: any) => {
//        setPages(response);
//        console.log(response);
//        return axios.get('http://127.0.0.1:8080/api/portfolios/' + portfolios[0].id + '/pages/' + pages[0].id + '/sections', { auth: token })
//      })
//      .then((response: any) => {
//        setSections(response);
//        console.log(response);
//      })
//      .catch((error: any) => {
//        console.log(error);
//      });
//  }, []);{
  const fetchToken = async () => {
    const token = await axios.post(
      `http://127.0.0.1:8080/auth/token/login`, account
    )
    .catch((error: any) => {
      console.log(error);
    });
    setToken(token.auth_token);
    console.log(token);
  }
  const fetchPortfolios = async () => {
    const portfolios = await axios.get(
      `http://127.0.0.1:8080/api/portfolios`, { headers: {'Authorization': 'Token ' + token} }
    );
    setPortfolios(portfolios);
  };
  const fetchPages = async () => {
    const pages = await axios.get(
      `http://127.0.0.1:8080/api/porfolios/${portfolios[0].id}/pages`, { auth: token }
    );
    setPages(pages);
  }
  const fetchSections = async () => {
    const sections = await axios.get(
      `http://127.0.0.1:8080/api/portfolios/'${portfolios[0].id}/pages/${pages[0].id}/sections`, { auth: token }
    );
    setSections(sections);
  };

  fetchToken();
  fetchPortfolios();
  fetchPages();
  fetchSection();

  return (
    <AccountPageDiv>      
      <SiteHeader>
        <HeaderDiv>
          <LogoLink />
          <HeaderTitle>
            {portfolios[0].name}
          </HeaderTitle>
        </HeaderDiv>
      </SiteHeader>
      <StyledFormDiv>
        <FormTitle>{page[0].name}</FormTitle>
      </StyledFormDiv>
      {/*{sections.map((section: Section) => <TextSection title={section.name} content={section.content} />)}*/}
    </AccountPageDiv>

  );
}

//const TextSection: React.FC = (title: string, content: string) => (
//  <div>
//    <FieldTitle>{title}</FieldTitle>
//    <FormDiv>{content}</FormDiv>
//  </div>
//);

export default Portfolio;