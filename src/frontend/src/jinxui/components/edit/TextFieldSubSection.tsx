import React from "react"
import { Field } from "formik"
import { TextField } from "formik-material-ui"

type TTextFieldSubSection = {
  section: any,
  handleChange: any,
  rows: number,
}

// const TextFieldSubSection = (key: string, value:string, handleChange: any, rows: number) => {
const TextFieldSubSection = (
  props: TTextFieldSubSection
) => {
  return (
    <Field
      component={TextField}
      name={props.section.uid}
      defaultValue={props.section.value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.handleChange(e, props.section.uid)}
      id="standard-full-width"
      style={{ margin: 0, marginBottom: 15 }}
      fullWidth
      multiline
      rows={props.rows}
      rowsMax={30}
      // variant="filled"
      color="secondary"
    />
  );
};

export default TextFieldSubSection