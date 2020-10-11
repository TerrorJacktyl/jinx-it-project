import React from "react";
import styled from "styled-components";
import CSSBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import {
  SiteLayout,
  PrimaryButton,
  SecondaryButton,
  useUser,
  LightTheme,
  LightTitleBGGrad,
  HeaderBar,
  Routes,
  HomeTemplates,
  HomeFooter,
} from "jinxui";

// Mobile / responsive issues:
// - Login button not appearing on page
// - Signup form not completely visible
// - Login doesn't appear to work
// - Number three image appears to be broken
// - Login button half off screen

// Constants required for various media quiries for mobile repsonsiveness
const MAX_WIDTH = "630px";
const MAX_HEIGHT = "800px";

const SiteHeader = styled.header`
  margin-bottom: 1.45rem;
`;

const HeaderDiv = styled.div`
  max-width: 90%;
  padding: 0.6rem 0.5rem 0.2rem;
`;

// Used for potential modifications to login link
const StyledLink = styled.a`
`;

// Main top block div. Styled so that it takes up 100% of any screen
const TopBlockDiv = styled(Paper)`
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
  height: 100vh;
  display: grid;
  grid-template-rows:
    minmax(80px,1fr) minmax(50px,400px) minmax(50px,1fr) 
    minmax(max-content,1.2fr) minmax(100px,0.7fr);
  justify-content: center;
  align-content: center;
`;

// Main logo
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
  )align-self: center;
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

// Call to action button
const StyledLogin = styled(SecondaryButton)`
  margin-top: 0px;
  margin-right: 30px;
  margin-left: 20px;
  margin-bottom: 0px;
  height: 30px;
`;

// Nice big white space
const Gap = styled.div`
  height: 200px;
`;

const currentTheme = LightTheme;

const Home = () => {
  const { userData } = useUser();
  return (
    <>
      <ThemeProvider theme={currentTheme}>
        {/* CSSBaseline required for setting background colour */}
        <CSSBaseline />
          <TopBlockDiv elevation={8} style={{ background: LightTitleBGGrad }}>
            <SiteHeader>
              <HeaderDiv>
                <HeaderBar title="" lightTheme={true}>
                  <StyledLink
                    href={
                      userData.authenticated
                        ? Routes.PORTFOLIO_DISPLAY
                        : Routes.LOGIN
                    }
                  >
                    <StyledLogin>{userData.authenticated ? "My Portfolio" : "Login" }</StyledLogin>
                  </StyledLink>
                </HeaderBar>
              </HeaderDiv>
            </SiteHeader>

            {/* Top Block */}

            <JinxLogo src={require("images/Logo_Main.svg")} />
            <JinxLogo src={require("images/Logo_Main_Text_Only_Black.svg")} />
            <CatchPhrase>Your portfolio, made simple</CatchPhrase>
            <StyledLink href="/signup">
              <PrimaryButton>JOIN TODAY</PrimaryButton>
            </StyledLink>
          </TopBlockDiv>

          {/* How to section - Mostly implemented in HomeTemplates.tsx*/}

          <SiteLayout>
            <Gap />
            <HomeTemplates />
            <StyledLink href="/signup">
              <PrimaryButton>JOIN TODAY</PrimaryButton>
            </StyledLink>
          </SiteLayout>
          <Gap />

          {/* Footer - Implemented in HomeFooter.tsx*/}

          <HomeFooter />
      </ThemeProvider>
    </>
  );
};

export default Home;
