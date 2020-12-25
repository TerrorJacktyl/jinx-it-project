import React from "react";
import {
  PaperSection,
  OneColumnSectionDiv,
  UploadImageSubSection,
  NewSectionMenu,
  useSection,
} from "jinxui";
import { TEditSection } from "jinxui/types";

type TImageSection = {
  key: string;
  pageUid: string;
  section: TEditSection;
};
const ImageSectionInput = (props: TImageSection) => {
  const { sectionIndex, handleTitleChange } = useSection();
  const index = props.section.uid 
    ? sectionIndex(props.pageUid, props.section.uid)
    : 0

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
        <OneColumnSectionDiv>
          <UploadImageSubSection section={props.section} />
        </OneColumnSectionDiv>
      </PaperSection>
      <NewSectionMenu
        pageUid={props.pageUid}
        section={props.section}
      />
    </>
  );
};

export default ImageSectionInput;
