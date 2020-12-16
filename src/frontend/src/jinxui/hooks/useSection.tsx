import { useContext } from "react";
import { SectionContext, useUser, usePortfolio } from "jinxui";
import API from "../../API";
import { v4 as uuidv4 } from "uuid";
import { TEditSection, TSection } from "../types/PortfolioTypes";
import { defaultSectionContext } from "jinxui/contexts";

const sectionIsNotBlank = (section: TEditSection) => {
  if (section.type === "text") {
    return section.name !== "" || section.content !== "";
  } else if (section.type === "image") {
    return section.name !== "" || section.path !== "";
  } else if (section.type === "image_text") {
    return (
      section.name !== "" || section.path !== "" || section.content !== ""
    );
  } else {
    return true;
  }
};

export const useSection = () => {
  const [state, updateState, setState] = useContext(SectionContext);
  const PORTFOLIOS_PATH = "api/portfolios";
  const { getConfig, getSavedPortfolioId } = useUser();

  async function getSections(portfolio_id: number, page_id: number) {
    const path =
      PORTFOLIOS_PATH + "/" + portfolio_id + "/pages/" + page_id + "/sections";
    const result = API.get(path, getConfig())
      .then((response: any) => response.data)
      .catch((error: any) => {
        console.log(error);
        throw error;
      });
    return result;
  }

  async function fetchSections(page_id: number) {
    try {
      const sectionDetails = await getSections(getSavedPortfolioId(), page_id);
      const IdSections = sectionDetails.map((section: TEditSection) => {
        const uidPair = { uid: uuidv4() };
        const newSection = { ...section, ...uidPair };
        return newSection;
      });
      await setState(IdSections);
    } catch (e) {
      throw e;
    }
  }

  /**
   * Prepare section data for sending to backend.
   * 1. Remove unique identifiers
   * 2. Override section numbers
   * 3. Remove empty sections entirely
   */
  const getCleanedSections = () => {
    var cleanSections: TSection[] = [];
    for (var i = 0; i < state.length; i++) {
      if (sectionIsNotBlank(state[i])) {
        var cleanSection = state[i];
        delete cleanSection.uid;
        cleanSection.number = i;
        cleanSections.push(cleanSection)
      }
    }
    return cleanSections;
  };

  const handleContentChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    updateState(key, { content: e.target.value });
  };

  const handleTitleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    updateState(key, { title: e.target.value });
  };

  function handleSectionChange(targetIndex: number, newSection: TEditSection) {
    setState([
      ...state.slice(0, targetIndex),
      newSection,
      ...state.slice(targetIndex),
    ]);
  }

  function handleSectionDelete(targetIndex: number) {
    setState([...state.slice(0, targetIndex), ...state.slice(targetIndex + 1)]);
  }

  function handleSectionMoveUp(targetIndex: number, section: TEditSection) {
    if (targetIndex === 0) {
      return;
    }
    const curr_sections = state;
    const top = curr_sections.slice(0, targetIndex - 1);
    const one_above = curr_sections.slice(targetIndex - 1, targetIndex);
    const rest = curr_sections.slice(targetIndex + 1);
    setState(top.concat(section, one_above, rest));
  }

  function handleSectionMoveDown(targetIndex: number, section: TEditSection) {
    if (targetIndex === state.length - 1) {
      return;
    }
    const curr_sections = state;
    const top = curr_sections.slice(0, targetIndex);
    const one_below = curr_sections.slice(targetIndex + 1, targetIndex + 2);
    const rest = curr_sections.slice(targetIndex + 2);
    setState(top.concat(one_below, section, rest));
  }

  function getFetchedSections() {
    return state.length == 0? [defaultSectionContext] : state;
  }

  return {
    fetchSections,
    getFetchedSections,
    getCleanedSections,
    handleContentChange,
    handleTitleChange,
    handleSectionChange,
    handleSectionDelete,
    handleSectionMoveUp,
    handleSectionMoveDown,
  };
};
