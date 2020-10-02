import React, { useState, useEffect } from "react";

import styled from "styled-components";
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
  useUser,
  UserImage,
} from "jinxui";
import { TPortfolio, TPage, TSection } from "./Types";


const TextSectionContainer = styled.div`
  padding-left: 12px;
  padding-right: 12px;
`;

type TextSectionProps = {
  name: string;
  content: string;
};

type MediaSectionProps = {
  name: string;
  path: string;
};

/* At the moment displays portfolio with the hardcoded id, and only the first page
   of said portfolio. Consider either passing the portfolio id as props, or having
   the current portfolio provided by context. Regardless, we'll probably have to 
   define a user's default portfolio that they'll be redirected to upon login and
   initial portfolio creation */
const Portfolio = () => {
  const { getFullPortfolio, getSavedPortfolioId } = useUser();
  const portfolioId = getSavedPortfolioId();
  // const tempPortfolioId = 26;

  const [portfolio, setPortfolio] = useState<TPortfolio>(null);
  const [pages, setPages] = useState<TPage[]>([]);
  const [currPage, setCurrPage] = useState<number>(0);
  // Define as TSection[][] when incorporating multiple pages
  const [sections, setSections] = useState<TSection[]>([]);
  useEffect(() => {
    const fetchPortfolio = async () => {
      const { portfolio, pages, sections } = await getFullPortfolio(
        portfolioId
      );
      setPortfolio(portfolio);

      setPages(pages);
      setSections(sections);
    };
    fetchPortfolio();
  }, []);
  const compare = (s1: TSection, s2: TSection) => {
    if (s1.number < s2.number) {
      return -1;
    }
    if (s1.number > s2.number) {
      return 1;
    }
    return 0;
  };
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
        {sections.length !== 0
          ? sections.sort(compare).map((section: TSection) => {
              if (section.type === "text") {
                return (
                  <TextSection name={section.name} content={section.content} />
                );
              } else if (section.type === "image") {
                return <UserImage src={section.path} />;
              } else if (section.type === "image_text") {
                return (
                  <>
                    <UserImage src={section.path} />
                    <TextSection
                      name={section.name}
                      content={section.content}
                    />
                  </>
                );
              } else {
                return (
                  <MediaSection name={section.name} path={section.media} />
                );
              }
            })
          : null}
      </PageDiv>
    </AccountPageDiv>
  );
};

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
