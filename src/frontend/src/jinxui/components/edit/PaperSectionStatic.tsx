import React from "react";
import { PaperSectionDiv, PaperSectionBase, PaperSectionTitle } from "jinxui";

// This is used for sections that should not be dynamic (i.e. sections
// that shouldn't allow the user to move or delete them)

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
