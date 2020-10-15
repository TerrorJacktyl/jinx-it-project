import React from "react";
import { PaperSection, TextFieldSubSection, OneColumnSectionDiv } from "jinxui";
import Button from "@material-ui/core/Button";
import { TEditSection } from "jinxui/types";
import { DefaultSectionData } from "jinxui";


type TTextSectionProps = {
  key: string,
  section: TEditSection,
  handleChange: any,
  sections: any,
  setSections: any,
}

const TextSectionInput = (
  props: TTextSectionProps
) => {
  const addSection = () => {
    const index = props.sections.findIndex(
      (p: TEditSection) => p.uid === props.section.uid
    );
    props.setSections([
      ...props.sections.slice(0, index),
      DefaultSectionData(),
      ...props.sections.slice(index)
    ]);
    console.log();
  };

  return (
    <>
      <Button onClick={addSection} type="button">
        Add
      </Button>
      <PaperSection title={props.section.name}>
        <OneColumnSectionDiv>
          {TextFieldSubSection(
            props.section.uid,
            props.section.content,
            props.handleChange,
            15
          )}
        </OneColumnSectionDiv>
      </PaperSection>
    </>
  );
};

export default TextSectionInput;
