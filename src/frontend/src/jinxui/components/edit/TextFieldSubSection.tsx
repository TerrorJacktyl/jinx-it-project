import React, { useState } from "react";
import { TextField, Box } from "@material-ui/core";
import { LinksDisplay, LinkDialog } from "jinxui"
import { TEditSection } from "jinxui/types"


type TTextFieldSubSection = {
  pageUid: string
  section: TEditSection;
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
  const [content, setContent] = useState("")


  return (
    <Box>
      <Box
        display="flex"
        alignItems="center"
        flexWrap="wrap"
        marginBottom="15px"
      >
        <LinksDisplay sectionUid={props.section.uid} pageUid={props.pageUid} />
        <LinkDialog sectionUid={props.section.uid} pageUid={props.pageUid} />
      </Box>
      <TextField
        name={props.section.uid}
        defaultValue={props.section.content}
        placeholder={
          "Start writing...\n\n\n" +
          "You can use markdown to format your text. \n\n" +
          "  - This displays as a dot point\n\n" +
          "**This displays in bold**\n\n" +
          "*This displays in italics*\n\n" +
          "[This displays as a link](https://app.jinx.systems/)"
        }
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          props.handleChange(e, props.pageUid, props.section.uid)
          // setContent(e.target.value)
        }
        id="standard-full-width"
        style={{ margin: 0, marginBottom: 15 }}
        fullWidth
        multiline
        rows={props.rows}
        rowsMax={1000}
        variant="outlined"
        color="secondary"
        inputProps={{
          style: {
            lineHeight: 1.4,
          },
        }}
      />
    </Box>
  );
};

export default TextFieldSubSection;
