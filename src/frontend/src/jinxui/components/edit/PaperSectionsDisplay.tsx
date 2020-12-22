import React from "react";

import Backdrop from "@material-ui/core/Backdrop";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";

import {
  useUser,
  usePortfolio,
  useSection,
  TextSectionInput,
  ImageSectionInput,
  ImageTextSectionInput,
  PaperSectionPage,
  SkeletonSectionInput,
} from "jinxui";

import { TEditSection, } from "jinxui/types";

const PaperSectionsDisplay = () => {
  const { isSaving } = useUser();
  const { saveFullPortfolio } = usePortfolio();
  const {
    getFetchedSectionsAll,
    handleContentChange,
    handleTitleChange,
  } = useSection();

  return (
    <>
      <Backdrop open={isSaving()} style={{ zIndex: 2000 }}>
        <CircularProgress color="secondary" />
      </Backdrop>
      <PaperSectionPage />
      {Object.keys(getFetchedSectionsAll()).map(
        // Map over pages
        (pageIdString: string) => {
          const pageId = parseInt(pageIdString);
          return (
            <Box key={pageIdString}>
              <Box
                width="100vw"
                height="40px"
                bgcolor="background.paper"
                position="absolute"
                left="0px"
              />
              <Box height="40px" marginY="15px" />
              {getFetchedSectionsAll()[pageId].map(
                // Map over sections
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
            </Box>
          );
        }
      )}
    </>
  );
};

export default PaperSectionsDisplay;
