import React from "react"
import { 
  PaperSection,
  OneColumnSectionDiv,
  UploadImageSubSection,
  NewSectionMenu,
 } from "jinxui"
import { TEditSection } from "jinxui/types";

type TImageSection = {
  key: string,
  section: TEditSection,
  sections: any,
  setSections: any,
}

const ImageSectionInput = (
  props: TImageSection
) => {
  return (
    <>
      <PaperSection title={props.section.name}>
        <OneColumnSectionDiv>
          <UploadImageSubSection
            props={props.section} 
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
}

export default ImageSectionInput