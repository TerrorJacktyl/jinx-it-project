import React from "react";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import CSSBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper"
import {
  SiteLayout,
  PrimaryButton,
  SecondaryButton,
  useUser,
  LightTheme,
  LightTitleBGGrad,
  HeaderBar,
  Routes,
} from "jinxui";


const SiteHeader = styled.header`
  margin-bottom: 1.45rem;
`;

const HeaderDiv = styled.div`
  max-width: 90%;
  padding: 0.6rem 0.5rem 0.2rem;
`;

const StyledLink = styled.a`
  text-decoration: none;
`;

const TopBlockDiv = styled(Paper)`
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-rows: 
    minmax(90px,2fr) 
    minmax(100px,340px) 
    minmax(max-content, 2fr) 
    minmax(max-content, 1fr) 
    max-content 
    40px;
  justify-content: center;
`;

const StyledLogin = styled(SecondaryButton)`
  margin-top: 0px;
  margin-right: 30px;
  margin-left: 0px;
  margin-bottom: 0px;
  height: 30px;
`;

const JinxLogo = styled.img`
  height: 90%;
  width: 90%;
  object-fit: scale-down;
  opacity: 70%;
`;

const BodyDiv = styled.div`
  overflow: auto;
`;

const JinxName = styled.h1`
  font-family: "Josefin Sans", sans-serif;
  font-style: normal;
  font-weight: 250;
  font-size: 90px;
  letter-spacing: 0.3em;
  margin: 0;
  margin-left:30px;
  @media (max-width: 400px) {
    font-size: 70px;
  }
  @media (max-height: 700px) {
    font-size: 70px;
  }
`;

const Gap = styled.div`
  height: 100px;
`;

const Content = styled.div`
  margin: 60px;
`;

const CatchPhrase = styled.h3`
  font-family: "Heebo", sans-serif;
  font-weight: 200;
  font-size: 30px;
  @media (max-width: 400px) {
    font-size: 20px;
  }
  @media (max-height: 700px) {
    font-size: 20px;
  }
`;


const currentTheme = LightTheme

const Home = () => {
  const { userData } = useUser();
  // const theme = useTheme(DarkTheme);

  return (
    <div>
      <ThemeProvider theme={currentTheme}>
        <CSSBaseline />
        <BodyDiv>
          <TopBlockDiv
            elevation={8}
            style={{ background: LightTitleBGGrad }}
          >
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
                    <StyledLogin>Login</StyledLogin>
                  </StyledLink>
                </HeaderBar>
              </HeaderDiv>
            </SiteHeader>
            {/* <LogoDiv> */}
            <div>
              <JinxLogo src={require("images/Logo_Main.png")} />
            </div>
            {/* </LogoDiv> */}
            <div>
              {/* <Typography variant='h1'>Jinx</Typography> */}
              <JinxName>Jinx</JinxName>
            </div>
            <div>
              {/* <Typography variant='h3' display='block'>
                Your portfolio, made simple
              </Typography> */}
              <CatchPhrase>Your portfolio, made simple</CatchPhrase>
            </div>
            <div>
              <StyledLink href="/signup">
                <PrimaryButton>JOIN TODAY</PrimaryButton>
              </StyledLink>
            </div>
          </TopBlockDiv>

          <SiteLayout>
            <Gap/>
            <Content>

            <Typography variant="body1" color="textPrimary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Typography>
            </Content>
          </SiteLayout>
        </BodyDiv>
      </ThemeProvider>
    </div>
  );
};

export default Home;
