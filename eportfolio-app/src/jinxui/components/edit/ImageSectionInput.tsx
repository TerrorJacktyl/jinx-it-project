import React from "react"
import { 
  PaperSection,
  OneColumnSectionDiv,
  UploadImageSubSection
 } from "jinxui"


function ImageSectionInput(
  title: string,
  key: string,
  path: any,
  setImageResponse: any
) {
  return (
    <>
      <PaperSection title={title}>
        <OneColumnSectionDiv>
          {UploadImageSubSection(key, path, setImageResponse)}
        </OneColumnSectionDiv>
      </PaperSection>
    </>
  );
}

export default ImageSectionInput