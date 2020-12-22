import React from "react";

import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

import {
  useUser,
  usePortfolio,
  usePage,
  useSection,
  TextSectionInput,
  ImageSectionInput,
  ImageTextSectionInput,
  PaperSectionPage,
  SkeletonSectionInput,
} from "jinxui";

import { TEditSection, TEditSections } from "jinxui/types";

const PaperSectionsDisplay = () => {
  const { isSaving } = useUser();
  const { saveFullPortfolio } = usePortfolio();
  const {
    getFetchedSectionsAll,
    handleContentChange,
    handleTitleChange,
  } = useSection();

  const allSections:TEditSections = getFetchedSectionsAll();

  return (
    <>
      <Backdrop open={isSaving()} style={{ zIndex: 2000 }}>
        <CircularProgress color="secondary" />
      </Backdrop>
      <PaperSectionPage />
      {Object.keys(allSections).map(      // Map over pages
        (pageIdString: string) => {
          const pageId = parseInt(pageIdString)
          console.log("PAGE ID")
          console.log(pageId)
          console.log(allSections)
          console.log(allSections[0])
          {allSections[pageId].map(       // Map over sections
            (section: TEditSection) => {
              if (section.type === "skeleton" && section.uid) {
                return <SkeletonSectionInput key={section.uid} />;
              } else if (section.type === "text" && section.uid) {
                return (
                  <TextSectionInput
                    key={section.uid}
                    handleChange={handleContentChange}
                    handleTitleChange={handleTitleChange}
                    handlePublish={saveFullPortfolio}
                    pageId={pageId}
                    section={section}
                  />
                );
              } else if (section.type === "image" && section.uid) {
                return (
                  <ImageSectionInput
                    key={section.uid}
                    handleTitleChange={handleTitleChange}
                    handlePublish={saveFullPortfolio}
                    pageId={pageId}
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
                    pageId={pageId}
                    section={section}
                  />
                );
              } else {
                return <> </>;
              }
            }
          )}

        }
      )}
    </>
  );
};

export default PaperSectionsDisplay;
