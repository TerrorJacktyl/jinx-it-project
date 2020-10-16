import React from "react"
import { TextField } from "@material-ui/core"

type TTextFieldSubSection = {
  section: any,
  handleChange: any,
  rows: number,
}

const TextFieldSubSection = (
  props: TTextFieldSubSection
) => {
  return (
    <TextField
      name={props.section.uid}
      defaultValue={props.section.content}
      placeholder={"Prover your creativity, write something interesting..."}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.handleChange(e, props.section.uid)}
      id="standard-full-width"
      style={{ margin: 0, marginBottom: 15 }}
      fullWidth
      multiline
      rows={props.rows}
      rowsMax={30}
      variant="outlined"
      color="secondary"
    />
  );
};

export default TextFieldSubSection