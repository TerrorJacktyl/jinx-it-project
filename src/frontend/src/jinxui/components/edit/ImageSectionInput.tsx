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
  pageId: string;
  section: TEditSection;
  handleTitleChange: any;
  handlePublish: any;
};
const ImageSectionInput = (props: TImageSection) => {
  const { sectionIndex } = useSection();
  const index = props.section.uid 
    ? sectionIndex(props.pageId, props.section.uid)
    : 0

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
        <OneColumnSectionDiv>
          <UploadImageSubSection section={props.section} />
        </OneColumnSectionDiv>
      </PaperSection>
      <NewSectionMenu
        pageId={props.pageId}
        section={props.section}
      />
    </>
  );
};

export default ImageSectionInput;
