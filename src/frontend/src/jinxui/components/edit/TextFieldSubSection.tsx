import React from "react";
import { TextField } from "@material-ui/core";

type TTextFieldSubSection = {
  section: any;
  handleChange: any;
  rows: number;
};


// Material ui text field
//  - variant="outlined" ensures that there is an outline that makes it easy
//      to see which field is selected
//  - placeholder will disappear as soon as a user starts writing something
//      preferrable to default value so the user doesn't have to erase
//      text before starting to write something of their own.

const TextFieldSubSection = (props: TTextFieldSubSection) => {
  return (
      <TextField
        name={props.section.uid}
        defaultValue={props.section.content}
        placeholder={
          "Start writing...\n\n\n"
          + "You can use markdown to format your text. \n\n"
          + "  - This displays as a dot point\n\n"
          + "**This displays in bold**\n\n"
          + "*This displays in italics*\n\n"
          + "[This displays as a link](https://app.jinx.systems/)"
        }
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          props.handleChange(e, props.section.uid)
        }
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

export default TextFieldSubSection;
