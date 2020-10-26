import React from "react";
import styled from "styled-components";
import CSSBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Paper from "@material-ui/core/Paper";
import Icon from "@material-ui/core/Icon";
import {
  SiteLayout,
  PrimaryButton,
  LightTheme,
  LightTitleBGGrad,
  HeaderBar,
  HomeTemplates,
  HomeFooter,
} from "jinxui";

// Mobile / responsive issues:
// - Login doesn't appear to work from mobile phone

// Constants required for various media quiries for mobile repsonsiveness
const MAX_WIDTH = "630px";
const MAX_HEIGHT = "800px";

const StyledSiteLayout = styled(SiteLayout)`
  // overflow-x: hidden;
  // width: 100%;
`;

const SiteHeader = styled.header`
  margin-bottom: 1.45rem;
`;

const HeaderDiv = styled.div`
  max-width: 90%;
  padding: 0.6rem 0.5rem 0.2rem;
  margin: auto;
`;

// Used for potential modifications to login link
const StyledLink = styled.a`
  text-decoration: none;
`;

// Main top block div. Styled so that it takes up 100% of any screen
const TopBlockDiv = styled(Paper)`
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
  height: 100vh;
  display: grid;
  grid-template-rows:
    minmax(80px,1.2fr) minmax(50px, 3fr) minmax(40px, 1fr) minmax(10px,0.8fr) 
    max-content 1.3fr;
  justify-content: center;
  align-content: center;
  justify-items: center;
`;

const JinxLogo = styled.img`
  height: 90%;
  width: 90%;
  object-fit: scale-down;
  opacity: 70%;
  @media (max-width: ${() => MAX_WIDTH}) {
    width: 70%;
  }
  @media (max-height: ${() => MAX_HEIGHT}) {
    width: 70%;
  }
  align-self: center;
  justify-self: center;
`;

// "Your portfolio, made simple" styling
const CatchPhrase = styled.h3`
  font-family: "Heebo", sans-serif;
  font-weight: 200;
  font-size: 30px;
  @media (max-width: 350px) {
    width: 200px;
  }
  @media (max-width: ${() => MAX_WIDTH}) {
    font-size: 23px;
  }
  @media (max-height: ${() => MAX_HEIGHT}) {
    font-size: 23px;
  }
  margin: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  justify-self: center;
`;


// Nice big white space
const Gap = styled.div`
  height: 200px;
`;

const currentTheme = LightTheme;

const Home = () => {
  return (
    <>
      <ThemeProvider theme={currentTheme}>
        {/* CSSBaseline required for setting background colour */}
        <CSSBaseline />
        <TopBlockDiv elevation={2} style={{ background: LightTitleBGGrad }}>
          <SiteHeader>
            <HeaderDiv>
              <HeaderBar hideLogo title="" lightTheme={true} />
            </HeaderDiv>
          </SiteHeader>

          {/* Top Block */}
          <JinxLogo src={require("images/Logo_Main.svg")} />
          <JinxLogo src={require("images/Logo_Main_Text_Only_Black.svg")} />
          <div />
          <CatchPhrase>Your portfolio, made simple</CatchPhrase>
          <StyledLink href="/signup">
            <PrimaryButton>JOIN TODAY</PrimaryButton>
          </StyledLink>
          <Icon>
            <ExpandMoreIcon />
          </Icon>
        </TopBlockDiv>

        {/* How to section - Mostly implemented in HomeTemplates.tsx*/}

        <StyledSiteLayout>
          <Gap />
          <HomeTemplates />
          <StyledLink href="/signup">
            <PrimaryButton>JOIN TODAY</PrimaryButton>
          </StyledLink>
        </StyledSiteLayout>
        <Gap />

        {/* Footer - Implemented in HomeFooter.tsx*/}

        <HomeFooter />
      </ThemeProvider>
    </>
  );
};

export default Home;
