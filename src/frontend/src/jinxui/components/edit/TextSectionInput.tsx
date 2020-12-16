import React from "react";
import { PaperSection, TextFieldSubSection, OneColumnSectionDiv } from "jinxui";
import { TEditSection } from "jinxui/types";
import { NewSectionMenu, useSection } from "jinxui";

type TTextSectionProps = {
  key: string;
  section: TEditSection;
  handleChange: any;
  handlePublish: any;
  handleTitleChange: any;
  // sections: any;
  // setSections: any;
};

const TextSectionInput = (props: TTextSectionProps) => {
  const { getFetchedSections } = useSection();

  const index = getFetchedSections().findIndex(
    (p: TEditSection) => p.uid === props.section.uid
  );

  return (
    <>
      {/* Add another section menu above the section if at the top */}

      {index === 0 && (
        <NewSectionMenu
          section={props.section}
          placeAbove={true}
        />
      )}

      {/* Main content */}

      <PaperSection
        section={props.section}
        handleTitleChange={props.handleTitleChange}
      >
        <OneColumnSectionDiv>
          <TextFieldSubSection
            section={props.section}
            handleChange={props.handleChange}
            rows={15}
          />
        </OneColumnSectionDiv>
      </PaperSection>

      {/* Add section menu */}

      <NewSectionMenu
        section={props.section}
      />
    </>
  );
};

export default TextSectionInput;
