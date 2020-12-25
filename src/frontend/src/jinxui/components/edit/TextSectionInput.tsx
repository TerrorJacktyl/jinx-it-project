import React from "react";
import { PaperSection, TextFieldSubSection, OneColumnSectionDiv } from "jinxui";
import { TEditSection } from "jinxui/types";
import { NewSectionMenu, useSection } from "jinxui";

type TTextSectionProps = {
  key: string;
  pageUid: string,
  section: TEditSection;
};

const TextSectionInput = (props: TTextSectionProps) => {
  const { getFetchedSections, handleTitleChange, handleContentChange } = useSection();

  const index = getFetchedSections(props.pageUid).findIndex(
    (p: TEditSection) => p.uid === props.section.uid
  );

  return (
    <>
      {/* Add another section menu above the section if at the top */}

      {index === 0 && (
        <NewSectionMenu
          pageUid={props.pageUid}
          section={props.section}
          placeAbove={true}
        />
      )}

      {/* Main content */}

      <PaperSection
        pageUid={props.pageUid}
        section={props.section}
        handleTitleChange={handleTitleChange}
      >
        <OneColumnSectionDiv>
          <TextFieldSubSection
            pageUid={props.pageUid}
            section={props.section}
            handleChange={handleContentChange}
            rows={15}
          />
        </OneColumnSectionDiv>
      </PaperSection>

      {/* Add section menu */}

      <NewSectionMenu
        pageUid={props.pageUid}
        section={props.section}
      />
    </>
  );
};

export default TextSectionInput;
