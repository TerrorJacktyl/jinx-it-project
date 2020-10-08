import React from "react";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import CSSBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider, useTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import {
  SiteLayout,
  PrimaryButton,
  SecondaryButton,
  useUser,
  DarkTheme,
  LightTheme,
  LightTitleBGGrad,
  HeaderBar,
  Routes,
} from "jinxui";

const MAX_WIDTH = "630px"
const MAX_HEIGHT = "800px"

const SiteHeader = styled.header`
  margin-bottom: 1.45rem;
`;

const HeaderDiv = styled.div`
  max-width: 90%;
  padding: 0.6rem 0.5rem 0.2rem;
`;

const StyledLink = styled.a`
  // text-decoration: none;
  // position: relative;
`;

const TopBlockDiv = styled(Paper)`
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
  width: 98vw;
  height: 100vh;
  display: grid;
  grid-template-rows:
    minmax(80px, 1fr) minmax(50px,400px) minmax(max-content,0.7fr) minmax(max-content,1.2fr) minmax(100px,0.7fr);
  justify-content: center;
  align-content: center;
`;

const JinxLogo = styled.img`
  height: 90%;
  width: 90%;
  object-fit: scale-down;
  opacity: 70%;
  @media (max-width: ${(props) => MAX_WIDTH}) {
    width: 70%;
  }
  @media (max-height: ${(props) => MAX_HEIGHT}) {
    width: 70%;
  })
  align-self: center;
  justify-self: center;
`;


const JinxName = styled.h1`
  font-family: "Josefin Sans", sans-serif;
  font-style: normal;
  font-weight: 250;
  font-size: 100px;
  letter-spacing: 0.3em;
  margin: 0;
  margin-left: 30px;
  @media (max-width: ${(props) => MAX_WIDTH}) {
    font-size: 60px;
  }
  @media (max-height: ${(props) => MAX_HEIGHT}) {
    font-size: 60px;
  }
  opacity: 70%;
`;

const CatchPhrase = styled.h3`
  font-family: "Heebo", sans-serif;
  font-weight: 200;
  font-size: 30px;
  @media (max-width: 350px) {
    width: 200px;
  }
  @media (max-width: ${(props) => MAX_WIDTH}) {
    font-size: 23px; 
  }
  @media (max-height: ${(props) => MAX_HEIGHT}) {
    font-size: 23px;
  }
  margin: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  justify-self: center
`;

const StyledLogin = styled(SecondaryButton)`
  margin-top: 0px;
  margin-right: 30px;
  margin-left: 20px;
  margin-bottom: 0px;
  height: 30px;
`;

const BodyDiv = styled.div`
  overflow: auto;
`;



const Gap = styled.div`
  height: 100px;
`;

const Content = styled.div`
  margin: 60px;
`;



const SecondaryCatchPhrase = styled.h5`
  margin 20px;
  margin-top: 5px;
  font-weight: 200;
  font-size: 22px;
  @media (max-width: ${(props) => MAX_WIDTH}) {
    font-size: 16px;
  }
  @media (max-height: ${(props) => MAX_HEIGHT}) {
    font-size: 16px;
  }
`;

const currentTheme = LightTheme;

const Home = () => {
  const { userData } = useUser();
  // const theme = useTheme(DarkTheme);

  return (
    <>
      <ThemeProvider theme={currentTheme}>
        <CSSBaseline />
        <BodyDiv>
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
                    <StyledLogin>Login</StyledLogin>
                  </StyledLink>
                </HeaderBar>
              </HeaderDiv>
            </SiteHeader>
            {/* <LogoDiv> */}
            {/* <TopBlockInner> */}
              
              <JinxLogo src={require("images/Logo_Main.png")} />

              {/* </LogoDiv> */}

              {/* <Typography variant='h1'>Jinx</Typography> */}
              <JinxName>Jinx</JinxName>

              {/* <Typography variant='h3' display='block'>
                Your portfolio, made simple
              </Typography> */}
              <CatchPhrase>Your portfolio, made simple</CatchPhrase>

              {/* <SecondaryCatchPhrase> */}
                {/* <Typography variant="h5"> */}
                  {/* Make a stunning looking portfolio website in seconds */}
                {/* </Typography> */}
              {/* </SecondaryCatchPhrase> */}
              <StyledLink href="/signup">
                <PrimaryButton>JOIN TODAY</PrimaryButton>
              </StyledLink>
            {/* </TopBlockInner> */}
          </TopBlockDiv>
          <SiteLayout>
            <Gap />
            <Content>
              <Typography variant="body1" color="textPrimary">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Typography>
            </Content>
          </SiteLayout>
        </BodyDiv>
      </ThemeProvider>
    </>
  );
};

export default Home;
