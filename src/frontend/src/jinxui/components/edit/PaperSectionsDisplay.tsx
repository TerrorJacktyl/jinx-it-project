import React from "react";

import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

import {
  useUser,
  usePortfolio,
  useSection,
  TextSectionInput,
  ImageSectionInput,
  ImageTextSectionInput,
  PaperSectionPage,
  SkelatonSectionInput,
} from "jinxui";

import { TEditSection } from "jinxui/types";

const PaperSectionsDisplay = () => {

  const { isSaving } = useUser()
  const { saveFullPortfolio } = usePortfolio();

  const {
    getFetchedSections,
    handleContentChange,
    handleTitleChange,
  } = useSection();

  return (
    <>
      <Backdrop open={isSaving()} style={{zIndex: 2000}}>
        <CircularProgress color="secondary" />
      </Backdrop>
      <PaperSectionPage />
      {getFetchedSections().map((section: TEditSection, index: number) => {
        if (section.type === "skelaton" && section.uid) {
          return <SkelatonSectionInput key={section.uid} />;
        }
        if (section.type === "text" && section.uid) {
          return (
            <TextSectionInput
              key={section.uid}
              handleChange={handleContentChange}
              handleTitleChange={handleTitleChange}
              handlePublish={saveFullPortfolio}
              section={section}
            />
          );
        } else if (section.type === "image" && section.uid) {
          return (
            <ImageSectionInput
              key={section.uid}
              handleTitleChange={handleTitleChange}
              handlePublish={saveFullPortfolio}
              section={section}
            />
          );
        } else if (section.type === "image_text" && section.uid) {
          return (
            <ImageTextSectionInput
              key={section.uid}
              handleChange={handleContentChange}
              handleTitleChange={handleTitleChange}
              handlePublish={saveFullPortfolio}
              section={section}
            />
          );
        } 
      })}
    </>
  );
};

export default PaperSectionsDisplay;
