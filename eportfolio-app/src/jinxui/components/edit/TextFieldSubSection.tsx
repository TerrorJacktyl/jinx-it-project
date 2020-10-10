import React from "react"
import { Field } from "formik"
import { TextField } from "formik-material-ui"

const TextFieldSubSection = (key: string, rows: number) => {
  return (
    <Field
      component={TextField}
      name={key}
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

export default TextFieldSubSection