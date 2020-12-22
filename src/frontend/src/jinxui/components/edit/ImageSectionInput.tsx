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
  pageId: number;
  section: TEditSection;
  handleTitleChange: any;
  handlePublish: any;
};

const ImageSectionInput = (props: TImageSection) => {
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
