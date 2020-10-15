import React from "react"

import {
  PaperSection,
  UploadImageSubSection,
  TwoColumnSectionDiv,
  TextFieldSubSection,
} from "jinxui"


function ImageTextSectionInput(
  title: string,
  key: string,
  value: string,
//  touched: any,
//  errors: any,
  path: any,
  handleChange: any,
  setImageResponse: any
) {
  return (
    <>
      <PaperSection title={title}>
        <TwoColumnSectionDiv>
          <div>
            {TextFieldSubSection(key, value, handleChange, 18)}
            {/*errors && touched ? <ErrorMessage>{errors}</ErrorMessage> : null*/}
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