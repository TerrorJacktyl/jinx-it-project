import React from "react";
import {
  PaperSection,
  ErrorMessage,
  TextFieldSubSection,
  OneColumnSectionDiv,
} from "jinxui";

// TODO: Explicitly declare props
const TextSectionInput = (title: string, key: string) => {
  return (
    <>
      <PaperSection title={title}>
        <OneColumnSectionDiv>
          {TextFieldSubSection(key, 15)}
          {/*props.errors && props.touched ? (
            <ErrorMessage>{props.errors}</ErrorMessage>
          ) : null*/}
        </OneColumnSectionDiv>
      </PaperSection>
    </>
  );
};

export default TextSectionInput;
