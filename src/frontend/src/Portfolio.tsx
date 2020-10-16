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
import { TPortfolio, TPage, TSection } from "jinxui/types";

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
};

interface PortfolioProps {
  username: string;
}

/*
  At the moment only the first page of portfolio is displayed.
  TODO: primary portfolio redirection
 */
const Portfolio = ({ username }: PortfolioProps) => {
  const {
    userData,
    getFullPortfolio,
    getAccountDetailsFromUsername,
  } = useUser();

  const [portfolio, setPortfolio] = useState<TPortfolio>(null);
  const [pages, setPages] = useState<TPage[]>([]);
  const [currPage] = useState<number>(0);
  // Define as TSection[][] when incorporating multiple pages
  const [sections, setSections] = useState<TSection[]>([]);

  useEffect(() => {
    const fetchPortfolio = async () => {
      const { primary_portfolio } = await getAccountDetailsFromUsername(
        username
      );
      const { portfolio, pages, sections } = await getFullPortfolio(
        primary_portfolio
      );
      setPortfolio(portfolio);
      setPages(pages);
      setSections(sections);
    };
    fetchPortfolio();
  }, [username]); // rendering a portfolio depends on the username

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
        <HeaderBar
          title={portfolio === null ? "" : portfolio.name}
          lightTheme
        ></HeaderBar>
        <PageDiv>
          <PageName>
            {pages.length !== 0 ? pages[currPage].name : null}
          </PageName>
          {sections.length !== 0
            ? sections.sort(compare).map((section: TSection, i) => {
                if (section.type === "text") {
                  return (
                    <TextSection
                      name={section.name}
                      content={section.content}
                    />
                  );
                } else if (section.type === "image") {
                  return <UserImage src={section.path} />;
                } else if (section.type === "image_text") {
                  return (
                    <ImageTextSection
                      name={section.name}
                      path={section.path == undefined ? "" : section.path}
                      content={section.content}
                    />
                  );
                } else {
                  return (
                    <MediaSection
                      name={section.name}
                      path={section.media == undefined ? "" : section.media}
                    />
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

const ImageTextSection: React.FC<ImageTextSectionProps> = ({
  name,
  path,
  content,
}) => (
  <>
    <UserImage src={path} />
    <TextSection name={name} content={content} />
  </>
);

export default Portfolio;
