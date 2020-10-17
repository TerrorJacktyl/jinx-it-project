import styled from "styled-components";
import React from "react";
import { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import SvgIcon from "@material-ui/core/SvgIcon";
import { LightTheme, UploadIcon, FormIcon, } from "jinxui";

// Primary outer div. Makes a grid for placing the rest of the objects
const OuterDiv = styled.div`
  margin: 30px;
  display: grid;
  grid-template-columns repeat(12, 1fr);
  grid-template-rows repeat(32, 100px);
  justify-items: center;
`;

// Background circle numbers styling
const BGImage = styled.img`
  opacity: 70%;
  object-fit: scale-down;
  max-width: 110vw;
`;

// Icon to be displayed for various steps
const StyledIcon = styled(SvgIcon)`
  width: 250px;
  height: 250px;
  max-width: 90%;
  max-width: 50vw;
  color: ${() => LightTheme.palette.info.main}; ;
`;

// Main title div
const HowWorkDiv = styled.div`
  grid-row 1/2;
  grid-column: 1/13;
  z-index: 10;
  justify-self: center;
`;

// Place the bg number for step one
const NumberOneBGDiv = styled.div`
  grid-row: 4/8;
  grid-column: 4/11;
  align-self: center;

`;

// Place the bg number for step two
const NumberTwoBGDiv = styled.div`
  grid-row: 13/16;
  grid-column: 2/9;
  align-self: center;
`;

// Place the bg number for step three
const NumberThreeBGDiv = styled.div`
  grid-row: 24/28;
  grid-column: 4/11;
  align-self: cecnter;
`;

// Place the icon for step one
const NumberOneIconDiv = styled.div`
  grid-row: 5/8;
  grid-column: 5/13;
  z-index: 8;
  min-width: 300px;
  padding: 30px;
`;

// Place the icon for step two
const NumberThreeIconDiv = styled.div`
  grid-row: 24/27;
  grid-column: 5/13;
  z-index: 8;
  min-width: 300px;
  padding: 30px;
`;

// Place the container for the theme previews (both portrait and landscape)
const TemplatePreviewContainerOuter = styled.div`
  grid-column: 2/13;
  grid-row: 17/21;
  z-index: 8;
  max-width: 400px;
  justify-self: baseline;
`;

// Set up a new grid for the two template previews so they can be arranged
// relative to each other
const TemplatePreviewContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr minmax(120px, 2fr) 1fr;
  grid-template-rows: 1fr 3fr;
`;

// Style landscape template preview image and place within template
// preview grid
const TemplatePreviewLandscapeImg = styled.img`
  grid-row: 1/4;
  grid-column: 1/5;
  max-width: 400px;
  border: 6px solid ${() => LightTheme.palette.info.main};
  border-radius: 10px;
  width: 100%;
  min-width: 230px;
`;

// Style portrait template preview image and place within template
// preview grid
const TemplatePreviewPortraitImg = styled.img`
  grid-row: 2/3;
  grid-column: 2/3;
  width: 100%;
  border: 6px solid ${() => LightTheme.palette.info.main};
  border-radius: 10px;
  z-index: 10;
`;

// Place copy for step one
const NumberOneTextDiv = styled.div`
  grid-row: 8/11;
  grid-column: 4/13;
  z-index: 9;
  text-align: left;
`;

// Place copy for step two
const NumberTwoTextDiv = styled.div`
  grid-row: 15/17;
  grid-column: 2/11;
  z-index: 12;
  text-align: left;
`;

// Place copy for step three
const NumberThreeTextDiv = styled.div`
  grid-row: 27/29;
  grid-column: 4/13;
  z-index: 9;
  text-align: left;
`;

// Place call to action
const CallToActionTextDiv = styled.div`
  grid-row: 32/34;
  grid-column: 1/13;
  z-index: 9;
  text-align: center;
`;

const HomeTemplates = () => {
  const [offset, setOffset] = useState(0);

  // Required for parallax animation
  useEffect(() => {
    function handleScroll() {
      setOffset(window.pageYOffset);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [offset]);

  return (
    <>
      <OuterDiv>
        <HowWorkDiv>
          <Typography variant="h1">How does it work?</Typography>
        </HowWorkDiv>

        {/* STEP ONE */}

        <NumberOneBGDiv>
          <BGImage
            src={require("images/circle_1.svg")}
            style={{ transform: `translateY(${offset * 0.2 - 180}px)` }}
          />
        </NumberOneBGDiv>
        <NumberOneIconDiv>
          <StyledIcon color="inherit">
            <FormIcon />
          </StyledIcon>
        </NumberOneIconDiv>
        <NumberOneTextDiv>
          <Typography variant="h3">
            Make an account and fill out your details. It only a few minutes!
          </Typography>
        </NumberOneTextDiv>

        {/* STEP TWO */}

        <NumberTwoBGDiv>
          <BGImage 
            src={require("images/circle_2.svg")} 
            style={{ transform: `translateY(${offset * 0.13 - 100}px)` }}
          />
        </NumberTwoBGDiv>
        <NumberTwoTextDiv>
          <Typography variant="h3">
            Choose a theme. They all look great on desktop and mobile!
          </Typography>
        </NumberTwoTextDiv>
        <TemplatePreviewContainerOuter>
          <TemplatePreviewContainer>
            <TemplatePreviewLandscapeImg
              src={require("images/template_1_landscape.jpg")}
            />
            <TemplatePreviewPortraitImg
              src={require("images/template_1_portrait.jpg")}
            />
          </TemplatePreviewContainer>
        </TemplatePreviewContainerOuter>

        {/* STEP THREE */}

        <NumberThreeBGDiv>
          <BGImage 
            src={require("images/circle_3.svg")} 
            style={{ transform: `translateY(${offset * 0.2 - 700}px)` }} />
        </NumberThreeBGDiv>
        <NumberThreeIconDiv>
          <StyledIcon color="inherit">
            <UploadIcon />
          </StyledIcon>
        </NumberThreeIconDiv>
        <NumberThreeTextDiv>
          <Typography variant="h3">
            Publish your site. It really is as easy as that!
          </Typography>
        </NumberThreeTextDiv>
        <CallToActionTextDiv>
          <Typography variant="h3">So, what are you waiting for?</Typography>
        </CallToActionTextDiv>
      </OuterDiv>
    </>
  );
};

export default HomeTemplates;
