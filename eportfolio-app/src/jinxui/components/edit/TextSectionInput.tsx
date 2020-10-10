import React from "react";
import {
  PaperSection,
  ErrorMessage,
  TextFieldSubSection,
  OneColumnSectionDiv,
} from "jinxui";

// TODO: Explicitly declare props
const TextSectionInput = (props: any) => {
  return (
    <>
      <PaperSection title={props.title}>
        <OneColumnSectionDiv>
          {TextFieldSubSection(props.key, 15)}
          {props.errors && props.touched ? (
            <ErrorMessage>{props.errors}</ErrorMessage>
          ) : null}
        </OneColumnSectionDiv>
      </PaperSection>
    </>
  );
};

export default TextSectionInput;
