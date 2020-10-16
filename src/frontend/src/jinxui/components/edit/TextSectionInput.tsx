import React from "react";
import { PaperSection, TextFieldSubSection, OneColumnSectionDiv } from "jinxui";
import { TEditSection } from "jinxui/types";
import { NewSectionMenu } from "jinxui";

type TTextSectionProps = {
  key: string;
  section: TEditSection;
  handleChange: any;
  sections: any;
  setSections: any;
};

const TextSectionInput = (props: TTextSectionProps) => {
  return (
    <>
      <PaperSection title={props.section.name}>
        <OneColumnSectionDiv>
          <TextFieldSubSection
            section={props.section}
            handleChange={props.handleChange}
            rows={15}
          />
        </OneColumnSectionDiv>
      </PaperSection>
      <NewSectionMenu
        section={props.section}
        sections={props.sections}
        setSections={props.setSections}
      />
    </>
  );
};

export default TextSectionInput;
