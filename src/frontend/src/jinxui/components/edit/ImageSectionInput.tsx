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
  section: TEditSection;
  handleTitleChange: any;
  handlePublish: any;
};

const ImageSectionInput = (props: TImageSection) => {
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
        <OneColumnSectionDiv>
          <UploadImageSubSection section={props.section} />
        </OneColumnSectionDiv>
      </PaperSection>
      <NewSectionMenu
        section={props.section}
      />
    </>
  );
};

export default ImageSectionInput;
