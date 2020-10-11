import React from "react";
import {
  PaperSection,
  ErrorMessage,
  TextFieldSubSection,
  OneColumnSectionDiv,
} from "jinxui";

// TODO: Explicitly declare props
const TextSectionInput = (title: string, value: string, key: string, handleChange: any) => {
  return (
    <>
      <PaperSection title={title}>
        <OneColumnSectionDiv>
          {TextFieldSubSection(key, value, handleChange, 15)}
          {/*props.errors && props.touched ? (
            <ErrorMessage>{props.errors}</ErrorMessage>
          ) : null*/}
        </OneColumnSectionDiv>
      </PaperSection>
    </>
  );
};

export default TextSectionInput;
