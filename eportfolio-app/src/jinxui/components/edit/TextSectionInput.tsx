import React from "react";
import {
  PaperSection,
  ErrorMessage,
  TextFieldSubSection,
  OneColumnSectionDiv,
} from "jinxui";

const TextSectionInput = (props: any) => {
  return (
    <>
      <PaperSection title={props.title}>
        <OneColumnSectionDiv>
          {TextFieldSubSection(props.sectionName, 15)}
          {props.errors && props.touched ? (
            <ErrorMessage>{props.errors}</ErrorMessage>
          ) : null}
        </OneColumnSectionDiv>
      </PaperSection>
    </>
  );
};

export default TextSectionInput;
