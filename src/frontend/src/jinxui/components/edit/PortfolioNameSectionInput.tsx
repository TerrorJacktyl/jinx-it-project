import React from "react";
import { PaperSectionStatic, OneColumnSectionDiv } from "jinxui";

type TPortfolioNameSection = {
  title: string,
  children: any,
}

const PortfolioNameSection = (props: TPortfolioNameSection) => {
  return (
      <PaperSectionStatic title={props.title}>
        <OneColumnSectionDiv>
            {props.children}
        </OneColumnSectionDiv>
      </PaperSectionStatic>
  );
}

export default PortfolioNameSection