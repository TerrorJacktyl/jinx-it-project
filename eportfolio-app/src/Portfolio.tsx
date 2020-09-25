import React, { useState, useEffect } from "react";

import styled from "styled-components";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  SiteHeader,
  HeaderDiv,
  HeaderTitle,
  LogoLink,
  AccountPageDiv,
  PageName,
  SectionName,
  TextSectionDiv,
  PageDiv,
  UserContext,
  useUser
} from "jinxui";
import { TPortfolio, TPage, TSection } from './Types'

const TextSectionContainer = styled.div`
  padding-left: 12px;
  padding-right: 12px;
`;

type TextSectionProps = {
  name: string,
  content: string
};

type MediaSectionProps = {
  name: string,
  path: string
};

/* At the moment displays portfolio with the hardcoded id, and only the first page
   of said portfolio. Consider either passing the portfolio id as props, or having
   the current portfolio provided by context. Regardless, we'll probably have to 
   define a user's default portfolio that they'll be redirected to upon login and
   initial portfolio creation */
const Portfolio = () => {
  // Testing purposes only
  const tempPortfolioId = 1;
  const { getFullPortfolio } = useUser();
  const [portfolio, setPortfolio] = useState<TPortfolio>(null);
  const [pages, setPages] = useState<TPage[]>([]);
  const [currPage, setCurrPage] = useState<number>(0);
  const [sections, setSections] = useState<TSection[][]>([]);
  useEffect(() => {
    const fetchPortfolio = async () => {
      const {portfolio, pages, sections } = await getFullPortfolio(tempPortfolioId);
      setPortfolio(portfolio);
      setPages(pages);
      setSections(sections); 
    }
    fetchPortfolio();
  }, []);


  return (
    <AccountPageDiv>      
      <SiteHeader>
        <HeaderDiv>
          <LogoLink />
          <HeaderTitle>
            {portfolio !== null ? portfolio.name : null}
          </HeaderTitle>
        </HeaderDiv>
      </SiteHeader>
      <PageDiv>
        <PageName>{pages.length !== 0 ? pages[currPage].name : null}</PageName>
        {sections.length !== 0 ? (
          sections[currPage].map((section: TSection) => {
            if (section.type === "text") {
              return <TextSection name={section.name} content={section.content} />
            } else {
              return <MediaSection name={section.name} path={section.media} />
            }
          }
        )) : null}
      </PageDiv>
    </AccountPageDiv>

  );
}

const TextSection: React.FC<TextSectionProps> = ({ name, content }) => (
  <TextSectionContainer>
    <SectionName>{name}</SectionName>
    <TextSectionDiv>{content}</TextSectionDiv>
  </TextSectionContainer>
);

const MediaSection: React.FC<MediaSectionProps> = ({ name, path }) => (
  <TextSectionContainer>
    <SectionName>{name}</SectionName>
    <img src={path} alt="" />
  </TextSectionContainer>
);

export default Portfolio;
