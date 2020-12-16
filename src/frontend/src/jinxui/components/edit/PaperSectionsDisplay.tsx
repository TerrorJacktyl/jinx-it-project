import React from "react";

import {
  useUser,
  usePortfolio,
  usePage,
  useSection,
  useLink,
  TextSectionInput,
  ImageSectionInput,
  ImageTextSectionInput,
  PaperSectionPage,
  SkelatonSectionInput,
} from "jinxui";

import { TEditSection } from "jinxui/types";

const PaperSectionsDisplay = () => {

  const { saveFullPortfolio } = usePortfolio();

  const {
    getFetchedSections,
    handleContentChange,
    handleTitleChange,
  } = useSection();

  return (
    <>
      <PaperSectionPage />
      {getFetchedSections().map((section: TEditSection) => {
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
        } else {
          return <></>;
        }
      })}
    </>
  );
};

export default PaperSectionsDisplay;
