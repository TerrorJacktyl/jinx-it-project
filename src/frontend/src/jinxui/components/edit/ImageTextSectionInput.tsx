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
  pageId: number,
  section: TEditSection;
  handleChange: any;
  handleTitleChange: any;
  handlePublish: any;
};

const ImageTextSectionInput = (props: TImageTextSectionInput) => {
  const { getFetchedSections } = useSection();

  const index = getFetchedSections(props.pageId).findIndex(
    (p: TEditSection) => p.uid === props.section.uid
  );

  return (
    <>
      {index === 0 && (
        <NewSectionMenu
          pageId={props.pageId}
          section={props.section}
          placeAbove={true}
        />
      )}
      <PaperSection
        pageId={props.pageId}
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
        pageId={props.pageId}
        section={props.section}
      />
    </>
  );
};

export default ImageTextSectionInput;
