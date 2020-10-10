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
  key: string,
  touched: any,
  errors: any,
  path: any,
  setImageResponse: any
) {
  return (
    <>
      <PaperSection title={title}>
        <TwoColumnSectionDiv>
          <div>
            {TextFieldSubSection(key, 18)}
            {errors && touched ? <ErrorMessage>{errors}</ErrorMessage> : null}
          </div>
          <div>
            {UploadImageSubSection(
              key,
              path,
              setImageResponse
            )}
          </div>
        </TwoColumnSectionDiv>
      </PaperSection>
    </>
  );
}

export default ImageTextSectionInput