import React from "react";

import {
  PaperSection,
  UploadImageSubSection,
  TwoColumnSectionDiv,
  TextFieldSubSection,
  NewSectionMenu,
  useSection,
} from "jinxui";

import { TEditSection } from "jinxui/types";

type TImageTextSectionInput = {
  key: string;
  section: TEditSection;
  handleChange: any;
  handleTitleChange: any;
  handlePublish: any;
  // sections: any;
  // setSections: any;
};

const ImageTextSectionInput = (props: TImageTextSectionInput) => {
  const {
    getSavedSections,
  } = useSection();

  const index = getSavedSections().findIndex(
    (p: TEditSection) => p.uid === props.section.uid
  );

  return (
    <>
      {index === 0 && (
        <NewSectionMenu
          section={props.section}
          // sections={props.sections}
          // setSections={props.setSections}
          placeAbove={true}
        />
      )}
      <PaperSection
        section={props.section}
        // sections={props.sections}
        // setSections={props.setSections}
        handleTitleChange={props.handleTitleChange}
        handlePublish={props.handlePublish}
      >
        <TwoColumnSectionDiv>

            <TextFieldSubSection
              section={props.section}
              handleChange={props.handleChange}
              rows={15}
            />
            <UploadImageSubSection 
              section={props.section} 
            />

        </TwoColumnSectionDiv>
      </PaperSection>
      <NewSectionMenu
        section={props.section}
        // sections={props.sections}
        // setSections={props.setSections}
      />
    </>
  );
};

export default ImageTextSectionInput;
