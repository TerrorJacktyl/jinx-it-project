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
} from "jinxui";

import {
  TEditSection,
} from "jinxui/types";

const PaperSectionsDisplay = () => {
  const portfolioExists = true;
  // const [redirect, setRedirect] = useState(false);
  const {
    sendFullPortfolio,
    setSaving,
  } = useUser();

  const {
    getFetchedPortfolio,
    saveFullPortfolio,
  } = usePortfolio();

  const { getFetchedPages } = usePage();

  const {
    getFetchedSections,
    handleContentChange,
    handleTitleChange,
  } = useSection();



  const { getFetchedLinks } = useLink();
  const sections = getFetchedSections();




    // const sectionIsNotBlank = (section: TEditSection) => {
    //   if (section.type === "text") {
    //     return section.name !== "" || section.content !== "";
    //   } else if (section.type === "image") {
    //     return section.name !== "" || section.path !== "";
    //   } else if (section.type === "image_text") {
    //     return (
    //       section.name !== "" || section.path !== "" || section.content !== ""
    //     );
    //   } else {
    //     return true;
    //   }
    // };




  // /** Save the currently edited page to the backend without redirecting. */
  // const handleSave = () => {
  //   setSaving(true);
  //   const sections = cleanedSections();
  //   sendFullPortfolio(
  //     getFetchedPortfolio(),
  //     getFetchedPages(),
  //     getFetchedSections(),
  //     getFetchedLinks(),
  //     portfolioExists
  //   )
  //     .then((response: any) => {
  //       setSaving(false);
  //       // setSuccessMessage("Portfolio saved");
  //     })
  //     .catch(() => {
  //       setSaving(false);
  //       // setErrorMessage("Unable to save portfolio, something went wrong");
  //     });
  // };

  return (
    <>
      {sections.map((section: TEditSection) => {
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

export default PaperSectionsDisplay