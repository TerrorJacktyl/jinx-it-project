import React from "react";
import { PaperSection, TextFieldSubSection, OneColumnSectionDiv } from "jinxui";
import Button from "@material-ui/core/Button";
import { v4 as uuidv4 } from "uuid";
import { TEditSection } from "jinxui/types";
import { DefaultSectionData } from "jinxui";

// TODO: Explicitly declare props
const TextSectionInput = (
  props: any
  // title: string,
  // value: string,
  // key: string,
  // handleChange: any,
  // sections: any,
  // setSections: any,
  // section: TEditSection,
) => {
  const addSection = () => {
    const index = props.sections.findIndex(
      (p: TEditSection) => p.uid === props.section.uid
    );
    // const startSections = props.sections.slice(0, index);
    // const endSections = props.sections.slice(index);
    // const newSection = [DefaultSectionData()];
    // const newSections = startSections.concat(newSection, endSections);
    props.setSections([
      ...props.sections.slice(0, index),
      DefaultSectionData(),
      // DefaultSectionData(),
      ...props.sections.slice(index)
    ]);
    console.log();
  };

  // const addSection = () => {
  //   const newSections = sections;
  //   newSections.splice(
  //     i + 1,
  //     0,
  //     DefaultSectionData()
  //   )
  //   setSections(...sections, newSections);

  // // const DefaultSectionData: TEditSection = {
  // //   id: 0,
  // //   name: "First",
  // //   number: 0,
  // //   content: "Write something...",
  // //   media: "",
  // //   type: "text",
  // //   path: "",
  // //   image: 0,
  // //   uid: uuidv4(),
  // // };
  // // const newSection = DefaultSectionData();
  // const thisSection = sections[i];
  // console.log("INDEX");
  // console.log(i);
  // // console.log(DefaultSectionData);
  // const newData = [DefaultSectionData()];
  // console.log(newData);
  // setSections(
  //   // ...sections.slice(0, i + 1),
  //   // DefaultSectionData(),
  //   // ...sections.slice(i + 1),
  //   sections.filter((section: any) => section.uid !== thisSection.uid)
  //   // ...sections
  // );

  // // setSections(sections.concat(newSection));
  // };
  return (
    <>
      <Button onClick={addSection} type="button">
        Add
      </Button>
      <PaperSection title={props.title}>
        <OneColumnSectionDiv>
          {TextFieldSubSection(
            props.section.uid,
            props.section.content,
            props.handleChange,
            15
          )}
        </OneColumnSectionDiv>
      </PaperSection>
    </>
  );
};

export default TextSectionInput;
