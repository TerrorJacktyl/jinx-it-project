import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";

import styled from "styled-components";
import {
  AccountPageDiv,
  PageName,
  SectionName,
  TextSectionDiv,
  PageDiv,
  useUser,
  UserImage,
  DarkTheme,
  HeaderBar,
} from "jinxui";
import { TPortfolio, TPage, TSection } from "./Types";


const SectionContainer = styled.div`
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

type ImageTextSectionProps = {
  name: string;
  path: string;
  content: string;
}

/* At the moment displays portfolio with the hardcoded id, and only the first page
   of said portfolio. Consider either passing the portfolio id as props, or having
   the current portfolio provided by context. Regardless, we'll probably have to 
   define a user's home portfolio that they'll be redirected to upon login and
   initial portfolio creation */
const Portfolio = () => {
  const { getFullPortfolio, getSavedPortfolioId } = useUser();
  const [portfolio, setPortfolio] = useState<TPortfolio>(null);
  const [pages, setPages] = useState<TPage[]>([]);
  const [currPage, setCurrPage] = useState<number>(0);
  // Define as TSection[][] when incorporating multiple pages
  const [sections, setSections] = useState<TSection[]>([]);
  useEffect(() => {
    const fetchPortfolio = async () => {
      var portfolioId = await getSavedPortfolioId();
      console.log(portfolioId);
      const { portfolio, pages, sections } = await getFullPortfolio(portfolioId);
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
    <ThemeProvider theme={DarkTheme}>
      <CssBaseline />
    <AccountPageDiv>
        <HeaderBar title={portfolio !== null ? portfolio.name : null}></HeaderBar>
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
                return <ImageTextSection name={section.name} path={section.path} content={section.content}  />
              } else {
                return (
                  <MediaSection name={section.name} path={section.media} />
                );
              }
            })
          : null}
      </PageDiv>
    </AccountPageDiv>
    </ThemeProvider>
  );
};

const TextSection: React.FC<TextSectionProps> = ({ name, content }) => (
  <SectionContainer>
    <SectionName>{name}</SectionName>
    <TextSectionDiv>{content}</TextSectionDiv>
  </SectionContainer>
);

const MediaSection: React.FC<MediaSectionProps> = ({ name, path }) => (
  <SectionContainer>
    <SectionName>{name}</SectionName>
    <img src={path} alt="" />
  </SectionContainer>
);

const ImageTextSection: React.FC<ImageTextSectionProps> = ({ name, path, content }) => (
  <>
    <UserImage src={path} />
    <TextSection
      name={name}
      content={content}
    />
  </>

)

export default Portfolio;
