import React from "react"
import { 
  PaperSection,
  OneColumnSectionDiv,
  UploadImageSubSection
 } from "jinxui"


function ImageSectionInput(
  title: string,
  sectionName: string,
  imageResponse: any,
  setImageResponse: any
) {
  return (
    <>
      <PaperSection title={title}>
        <OneColumnSectionDiv>
          {UploadImageSubSection(sectionName, imageResponse, setImageResponse)}
        </OneColumnSectionDiv>
      </PaperSection>
    </>
  );
}

export default ImageSectionInput