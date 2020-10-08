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
  width: 100vw;
  height: 100vh;
  display: grid;
  // grid-template-rows:
  //   minmax(90px,2fr)
  //   minmax(100px,340px)
  //   50px
  //   minmax(90px, 140px)
  //   minmax(70px, 120px)
  //   40px
  //   minmax(100px, 1fr);
  justify-content: center;
  align-content: center;
`;

const TopBlockInner = styled.div`
  max-height: 600px;
  justify-items: center;
  display: grid;
  width: 900px;
  @media(max-width: ${(props) => MAX_WIDTH}) {
    width: 300px;
  }
`;

const StyledLogin = styled(SecondaryButton)`
  margin-top: 0px;
  margin-right: 30px;
  margin-left: 20px;
  margin-bottom: 0px;
  height: 30px;
`;

const JinxLogo = styled.img`
  height: 90%;
  width: 90%;
  object-fit: scale-down;
  opacity: 70%;
  @media (max-width: ${(props) => MAX_WIDTH}) {
    width: 150px;
  }
  @media (max-height: ${(props) => MAX_HEIGHT}) {
    width: 150px;
  })
`;

const BodyDiv = styled.div`
  overflow: auto;
`;

const JinxName = styled.h1`
  font-family: "Josefin Sans", sans-serif;
  font-style: normal;
  font-weight: 250;
  font-size: 50px;
  letter-spacing: 0.3em;
  margin: 0;
  margin-left: 30px;
  @media (max-width: ${(props) => MAX_WIDTH}) {
    font-size: 40px;
  }
  @media (max-height: ${(props) => MAX_HEIGHT}) {
    font-size: 40px;
  }
  opacity: 70%;
`;

const Gap = styled.div`
  height: 100px;
`;

const Content = styled.div`
  margin: 60px;
`;

const CatchPhrase = styled.h3`
  font-family: "Heebo", sans-serif;
  font-weight: 300;
  font-size: 50px;
  @media (max-width: ${(props) => MAX_WIDTH}) {
    font-size: 25px;
  }
  @media (max-height: ${(props) => MAX_HEIGHT}) {
    font-size: 25px;
  }
  margin: 60px;
  margin-top: 5px;
  margin-bottom: 5px;
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
            <TopBlockInner>
              <JinxLogo src={require("images/Logo_Main.png")} />

              {/* </LogoDiv> */}

              {/* <Typography variant='h1'>Jinx</Typography> */}
              <JinxName>Jinx</JinxName>

              {/* <Typography variant='h3' display='block'>
                Your portfolio, made simple
              </Typography> */}
              <CatchPhrase>Your portfolio, made simple</CatchPhrase>

              <SecondaryCatchPhrase>
                {/* <Typography variant="h5"> */}
                  Make a stunning looking portfolio website in seconds
                {/* </Typography> */}
              </SecondaryCatchPhrase>
              <StyledLink href="/signup">
                <PrimaryButton>JOIN TODAY</PrimaryButton>
              </StyledLink>
            </TopBlockInner>
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
