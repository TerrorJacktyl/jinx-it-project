import React from "react";

import {
  PaperSection,
  UploadImageSubSection,
  TwoColumnSectionDiv,
  TextFieldSubSection,
  NewSectionMenu,
} from "jinxui";

import { TEditSection } from "jinxui/types";
// function ImageTextSectionInput(
//   title: string,
//   key: string,
//   value: string,
// //  touched: any,
// //  errors: any,
//   path: any,
//   handleChange: any,
//   setImageResponse: any
// ) {

type TImageTextSectionInput = {
  key: string;
  section: TEditSection;
  handleChange: any;
  sections: any;
  setSections: any;
};

const ImageTextSectionInput = (props: TImageTextSectionInput) => {
  return (
    <>
      <PaperSection title={props.section.name}>
        <TwoColumnSectionDiv>

            <TextFieldSubSection
              section={props.section}
              handleChange={props.handleChange}
              rows={15}
            />
            <UploadImageSubSection 
              props={props.section} 
            />
            
        </TwoColumnSectionDiv>
      </PaperSection>
      <NewSectionMenu
        section={props.section}
        sections={props.sections}
        setSections={props.setSections}
      />
    </>
  );
};

export default ImageTextSectionInput;
