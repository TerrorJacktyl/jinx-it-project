import React from "react";
import styled from "styled-components";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { LightTitleBGGrad } from "jinxui";

// Main block of footer
const FooterPaper = styled(Paper)`
  width: 100%;
  height: 200px;
  background: ${() => LightTitleBGGrad};
`;

// Container for both logo and links
//
// Since both logo and links are in their own containers, 'space-between'
// will keep them on the left and right sides of the screen respectively
const FooterContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 30px;
  align-items: center;
`;

// Links container
//
// Flex used so that links go on top of each other when screen is too small
const LinksContainer = styled.div`
  display: flex;
  max-width: 300px;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  justify-content: end;
`;

// Space between links
const LinkContainer = styled.div`
  margin: 15px;
  width: max-content;
`;

// Ensure logo goes with background colours a bit better
const SmallLogo = styled.img`
  opacity: 80%;
`;

// Logo text as seperate item so that it can go beneath logo when screen
// too small
const SmallLogoText = styled.img`
  margin-left: 20px;
  margin-top: 10px;
`;

const HomeFooter = () => {
  return (
    <>
      <FooterPaper elevation={0} color="primary">
        <FooterContentContainer>
          <div>
            <SmallLogo src={require("images/Logo_Small_Grad.svg")} />
            <SmallLogoText src={require("images/Logo_Text_Only_Black.svg")} />
          </div>
          <LinksContainer>
            <LinkContainer>
              <Typography variant="button">Terms of service</Typography>
            </LinkContainer>
            <LinkContainer>
              <Typography variant="button">Privacy policy</Typography>
            </LinkContainer>
          </LinksContainer>
        </FooterContentContainer>
      </FooterPaper>
    </>
  );
};

export default HomeFooter;
