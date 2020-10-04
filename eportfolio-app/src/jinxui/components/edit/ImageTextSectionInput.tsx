import React from "react"

import {
  PaperSection,
  UploadImageSubSection,
  TwoColumnSectionDiv,
  TextFieldSubSection,
  ErrorMessage,
} from "jinxui"


function ImageTextSectionInput(
  title: string,
  sectionName: string,
  touched: any,
  errors: any,
  imageResponse: any,
  setImageResponse: any
) {
  return (
    <>
      <PaperSection title={title}>
        <TwoColumnSectionDiv>
          <div>
            {TextFieldSubSection(sectionName, 18)}
            {errors && touched ? <ErrorMessage>{errors}</ErrorMessage> : null}
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