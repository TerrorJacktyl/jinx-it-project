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
  const index = props.sections.findIndex(
    (p: TEditSection) => p.uid === props.section.uid
  );

  return (
    <>
      {index === 0 && (
        <NewSectionMenu
          section={props.section}
          sections={props.sections}
          setSections={props.setSections}
          placeAbove={true}
        />
      )}
      <PaperSection
        section={props.section}
        sections={props.sections}
        setSections={props.setSections}
      >
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
