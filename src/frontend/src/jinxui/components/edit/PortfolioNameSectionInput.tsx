import React from "react";
import { PaperSectionStatic, TwoColumnSectionDiv } from "jinxui";

type TPortfolioNameSection = {
  title: string,
  children: any,
}

const PortfolioNameSection = (props: TPortfolioNameSection) => {
  return (
      <PaperSectionStatic title={props.title}>
        <TwoColumnSectionDiv>
            {props.children}
        </TwoColumnSectionDiv>
      </PaperSectionStatic>
  );
}

export default PortfolioNameSection