import React from "react";
import styled from "styled-components";
import { PaperSectionStatic } from "jinxui";

const OneColumnThinSectionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  margin: 30px;
  margin-bottom: 10px;
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
        <OneColumnThinSectionGrid>
          <SingleLineRequiredGrid>
            {props.children}
          </SingleLineRequiredGrid>
        </OneColumnThinSectionGrid>
      </PaperSectionStatic>
  );
}

export default PortfolioNameSection