import React from "react";
import styled from "styled-components";
import { PaperSection } from "jinxui";

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

const PortfolioNameSection = (props: any) => {
  return (
      <PaperSection title={props.title}>
        <OneColumnThinSectionGrid>
          <SingleLineRequiredGrid>
            {props.children}
          </SingleLineRequiredGrid>
        </OneColumnThinSectionGrid>
      </PaperSection>
  );
}

export default PortfolioNameSection