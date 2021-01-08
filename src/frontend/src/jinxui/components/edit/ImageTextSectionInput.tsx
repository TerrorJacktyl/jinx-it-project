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
};

const ImageTextSectionInput = (props: TImageTextSectionInput) => {
  const { getFetchedSections } = useSection();

  const index = getFetchedSections().findIndex(
    (p: TEditSection) => p.uid === props.section.uid
  );

  return (
    <>
      {index === 0 && (
        <NewSectionMenu
          section={props.section}
          placeAbove={true}
        />
      )}
      <PaperSection
        section={props.section}
        handleTitleChange={props.handleTitleChange}
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
      />
    </>
  );
};

export default ImageTextSectionInput;
