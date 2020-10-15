import React from "react"

import {
  PaperSection,
  UploadImageSubSection,
  TwoColumnSectionDiv,
  TextFieldSubSection,
} from "jinxui"


function ImageTextSectionInput(
  title: string,
  sectionName: string,
  imageResponse: any,
  setImageResponse: any
) {
  return (
    <>
      <PaperSection title={title}>
        <TwoColumnSectionDiv>
          <div>
            {TextFieldSubSection(sectionName, 18)}
          </div>
          <div>
            {UploadImageSubSection(
              sectionName,
              imageResponse,
              setImageResponse
            )}
          </div>
        </TwoColumnSectionDiv>
      </PaperSection>
    </>
  );
}

export default ImageTextSectionInput