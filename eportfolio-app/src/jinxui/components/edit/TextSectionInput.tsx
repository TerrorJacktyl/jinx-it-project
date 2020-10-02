import React from "react"
import styled from "styled-components"
import { Field } from "formik"
import { TextField } from "formik-material-ui"
import { 
  PaperSection,
  ErrorMessage,
 } from "jinxui"

const OneColumnSectionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  margin: 30px;
  margin-bottom: 15px;
  direction: column;
`;

const TextSectionInput = (props: any) => {
  return (
    <>
      <PaperSection title={props.title}>
        <OneColumnSectionGrid>
          {TextSectionField(props.sectionName, 15)}
          {props.errors && props.touched ? (
            <ErrorMessage>{props.errors}</ErrorMessage>
          ) : null}
        </OneColumnSectionGrid>
      </PaperSection>
    </>
  );
};

const TextSectionField = (sectionName: string, rows: number) => {
  return (
    <Field
      component={TextField}
      name={sectionName}
      id="standard-full-width"
      style={{ margin: 0, marginBottom: 15 }}
      fullWidth
      multiline
      rows={rows}
      rowsMax={30}
      // variant="filled"
      color="secondary"
    />
  );
};

export default TextSectionInput