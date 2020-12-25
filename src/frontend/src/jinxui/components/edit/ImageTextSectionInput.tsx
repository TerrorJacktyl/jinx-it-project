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
  pageUid: string;
  section: TEditSection;
};

const ImageTextSectionInput = (props: TImageTextSectionInput) => {
  const {
    getFetchedSections,
    handleTitleChange,
    handleContentChange,
  } = useSection();

  const index = getFetchedSections(props.pageUid).findIndex(
    (p: TEditSection) => p.uid === props.section.uid
  );

  return (
    <>
      {index === 0 && (
        <NewSectionMenu
          pageUid={props.pageUid}
          section={props.section}
          placeAbove={true}
        />
      )}
      <PaperSection
        pageUid={props.pageUid}
        section={props.section}
        handleTitleChange={handleTitleChange}
      >
        <TwoColumnSectionDiv>
          <TextFieldSubSection
            pageUid={props.pageUid}
            section={props.section}
            handleChange={handleContentChange}
            rows={15}
          />
          <UploadImageSubSection section={props.section} />
        </TwoColumnSectionDiv>
      </PaperSection>
      <NewSectionMenu pageUid={props.pageUid} section={props.section} />
    </>
  );
};

export default ImageTextSectionInput;
