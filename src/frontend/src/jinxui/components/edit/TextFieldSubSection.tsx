import React from "react"
import { Field } from "formik"
import { TextField } from "formik-material-ui"

const TextFieldSubSection = (key: string, value: string, handleChange: any, rows: number) => {
  return (
    <Field
      component={TextField}
      name={key}
      defaultValue={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, key)}
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