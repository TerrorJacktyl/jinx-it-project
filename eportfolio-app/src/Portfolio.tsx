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


type Portfolio = {
  id: number,
  owner: number
  name: string,
  pages: number[]
};

type Page = {
  id: number,
  name: string,
  number: number,
  sections: number[]
};

type Section = {
  id: number,
  name: string,
  type: string,
  number: number,
  content: string
};


const Portfolio = () => {
  const axios = require("axios").default;
  const account = {
    username: 'yeahnah',
    password: 'yeupyeup'
  }
  const [token, setToken] = useState(null);
  const [portfolios, setPortfolios] = useState([]);
  const [pages, setPages] = useState([]);
  const [sections, setSections] = useState([]);
  useEffect(() => {
    // Pretty hacky with the returns, but couldn't find a better way to do it :(
    // the token POST shouldn't be needed later, will get from React context
    axios
      .post(
        `http://127.0.0.1:8080/auth/token/login`, account
      )
      .then((tokenResp: any) => {
        console.log(tokenResp.data);
        return (axios
          .get(`http://127.0.0.1:8080/api/portfolios`, { 
            headers: { 
              'Authorization': `Token ${tokenResp.data.auth_token}`
            } 
          })
          .then((portfolioResp: any) => ({
            token: tokenResp.data.auth_token,
            portfolios: portfolioResp.data
          }))
        );
      })
      .then((prevResps: any) => {
        const { token, portfolios } = prevResps
        console.log(token);
        console.log(portfolios);
        setToken(token);
        setPortfolios(portfolios);
        return axios
          .get(`http://127.0.0.1:8080/api/portfolios/${portfolios[0].id}/pages`, {
            headers: { 
              'Authorization': `Token ${token}`
            } 
          })
          .then((pageResp: any) => {
            console.log(pageResp);
            setPages(pageResp.data);
            return axios
              .get(`http://127.0.0.1:8080/api/portfolios/${portfolios[0].id}/pages/${portfolios[0].pages[0]}/sections`, {
                headers: { 
                  'Authorization': `Token ${token}`
                } 
              })
          })
      })
      .then((sectionResp: any) => {
        console.log(sectionResp.data);
        setSections(sectionResp.data);
      })
  }, []);


  return (
    <AccountPageDiv>      
      <SiteHeader>
        <HeaderDiv>
          <LogoLink />
          <HeaderTitle>
            {"yeup"}
          </HeaderTitle>
        </HeaderDiv>
      </SiteHeader>
      <StyledFormDiv>
        <FormTitle>{"yeah nah"}</FormTitle>
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
