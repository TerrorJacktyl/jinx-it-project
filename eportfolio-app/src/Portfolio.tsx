import React, { useState, useEffect } from "react";

import styled from "styled-components";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  SiteHeader,
  HeaderDiv,
  LogoLink,
  HeaderTitle,
  AccountPageDiv,
  PageName,
  SectionName,
  TextSectionDiv,
  PageDiv,
  UserContext,
  useUser
} from "jinxui";



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

type TextSectionProps = {
  title: string,
  content: string
};

const Portfolio = () => {
  const axios = require("axios").default;
  const account = {
    username: 'yeahnah',
    password: 'yeupyeup'
  }
  const [token, setToken] = useState(null);
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [pages, setPages] = useState<Page[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
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
            console.log(pageResp.data);
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
            {portfolios.length !== 0 ? portfolios[0].name : null}
          </HeaderTitle>
        </HeaderDiv>
      </SiteHeader>
      <PageDiv>
        <PageName>{pages.length !== 0 ? pages[0].name : null}</PageName>
        {sections.length !== 0 ? (
          sections.map((section: Section) => <TextSection title={section.name} content={section.content} />
        )) : null}
      </PageDiv>
    </AccountPageDiv>

  );
}

const TextSection: React.FC<TextSectionProps> = ({ title, content }) => (
  <div>
    <SectionName>{title}</SectionName>
    <TextSectionDiv>{content}</TextSectionDiv>
  </div>
);

export default Portfolio;
