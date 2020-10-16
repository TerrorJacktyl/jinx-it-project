import { AnyNaptrRecord } from "dns";
import React from "react";
import { PaperSectionDiv, PaperSectionBase, PaperSectionTitle } from "jinxui";

type TPaperSectionStatic = {
  children: any;
  title: string;
};

const PaperSectionStatic = (props: TPaperSectionStatic) => {
  return (
    <>
      <PaperSectionDiv>
        <PaperSectionTitle>{props.title}</PaperSectionTitle>
        <PaperSectionBase elevation={3} variant="outlined" square>
          {props.children}
        </PaperSectionBase>
      </PaperSectionDiv>
    </>
  );
};

export default PaperSectionStatic;
