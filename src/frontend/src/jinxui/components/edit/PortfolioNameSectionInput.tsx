import React from "react";
import styled from "styled-components";
import { PaperSectionStatic, TwoColumnSectionDiv } from "jinxui";

// const OneColumnThinSectionGrid = styled.div`
//   display: grid;
//   grid-template-columns: 1fr;
//   margin: 30px;
//   margin-bottom: 10px;
// `;

const StyledTwoColumnSectionDiv = styled(TwoColumnSectionDiv)`

`;

const SingleLineRequiredGrid = styled.div`
  display: grid;
  grid-template-rows: 50px;
  margin-bottom: -10px;
`;

type TPortfolioNameSection = {
  title: string,
  children: any,
}

const PortfolioNameSection = (props: TPortfolioNameSection) => {
  return (
      <PaperSectionStatic title={props.title}>
        <StyledTwoColumnSectionDiv>
          {/* <SingleLineRequiredGrid> */}
            {props.children}
          {/* </SingleLineRequiredGrid> */}
        </StyledTwoColumnSectionDiv>
      </PaperSectionStatic>
  );
}

export default PortfolioNameSection