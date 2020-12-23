import React from "react";

import Backdrop from "@material-ui/core/Backdrop";
import Box from "@material-ui/core/Box";
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
  PageEdit,
} from "jinxui";

import { TEditSection, TPage } from "jinxui/types";

const PaperSectionsDisplay = () => {
  const { isSaving } = useUser();
  const { saveFullPortfolio } = usePortfolio();
  const { getFetchedPages } = usePage();
  const {
    getFetchedSections,
    handleContentChange,
    handleTitleChange,
  } = useSection();

  const pages = getFetchedPages();
  return (
    <>
      <Backdrop open={isSaving()} style={{ zIndex: 2000 }}>
        <CircularProgress color="secondary" />
      </Backdrop>
      <PaperSectionPage />
      {pages.map(
        // Map over pages
        (page: TPage, index: number) => {
          return (
            <Box key={page.id}>
              <PageEdit pageIndex={index}/>
              {getFetchedSections(page.id).map(
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
                        pageId={page.id}
                        section={section}
                      />
                    );
                  } else if (section.type === "image" && section.uid) {
                    return (
                      <ImageSectionInput
                        key={section.uid}
                        handleTitleChange={handleTitleChange}
                        handlePublish={saveFullPortfolio}
                        pageId={page.id}
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
                        pageId={page.id}
                        section={section}
                      />
                    );
                  } else {
                    return <> </>;
                  }
                }
              )}
              {index === getFetchedPages().length - 1 ? <PageEdit /> : <> </>}
            </Box>
          );
        }
      )}
    </>
  );
};

export default PaperSectionsDisplay;
