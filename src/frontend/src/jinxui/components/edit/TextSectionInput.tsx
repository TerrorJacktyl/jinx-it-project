import React from "react";
import {
  PaperSection,
  TextFieldSubSection,
  OneColumnSectionDiv,
} from "jinxui";

const TextSectionInput = (props: any) => {
  return (
    <>
      <PaperSection title={props.title}>
        <OneColumnSectionDiv>
          {TextFieldSubSection(props.sectionName, 15)}
        </OneColumnSectionDiv>
      </PaperSection>
    </>
  );
};

export default TextSectionInput;
