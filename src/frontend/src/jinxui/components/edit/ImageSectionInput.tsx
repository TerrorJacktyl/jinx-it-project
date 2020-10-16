import React from "react";
import {
  PaperSection,
  OneColumnSectionDiv,
  UploadImageSubSection,
  NewSectionMenu,
} from "jinxui";
import { TEditSection } from "jinxui/types";

type TImageSection = {
  key: string;
  section: TEditSection;
  sections: any;
  setSections: any;
};

const ImageSectionInput = (props: TImageSection) => {
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
          <UploadImageSubSection section={props.section} />
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

export default ImageSectionInput;
