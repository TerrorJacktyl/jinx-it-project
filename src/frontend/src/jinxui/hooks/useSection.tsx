import { useContext } from "react";
import {
  SectionContext,
  useUser,
  useLink,
  PORTFOLIOS_PATH,
  listDelete,
  listMoveUp,
  listMoveDown,
  listAdd,
} from "jinxui";
import API from "../../API";
import { v4 as uuidv4, validate } from "uuid";
import {
  TEditSection,
  TSection,
  TLink,
  TSectionLink,
} from "../types/PortfolioTypes";
import { defaultSectionContext } from "jinxui/contexts";

const sectionIsNotBlank = (section: TEditSection) => {
  if (section.type === "text") {
    return section.name !== "" || section.content !== "";
  } else if (section.type === "image") {
    return section.name !== "" || section.path !== "";
  } else if (section.type === "image_text") {
    return section.name !== "" || section.path !== "" || section.content !== "";
  } else {
    return true;
  }
};

interface TSectionLinkResponse {
  data: TSectionLink[];
}
/**
 *
 * Get all sections and for each section, get the list of links associated
 * with it
 *
 */
async function getSections(portfolio_id: number, page_id: number, config: any) {
  const sectionPath =
    PORTFOLIOS_PATH +
    "/" +
    portfolio_id.toString() +
    "/pages/" +
    page_id.toString() +
    "/sections";
  try {
    // Get sections
    const sectionsResult = await API.get(sectionPath, config);

    // Get all links for all sections at once
    const linkResults: TSectionLinkResponse[] = await Promise.all(
      sectionsResult.data.map((sectionResult: TEditSection) => {
        const linksPath = sectionPath + "/" + sectionResult.id + "/links";
        // Get links for individual section
        const linkResult = API.get(linksPath, config);
        return linkResult;
      })
    );

    for (var i = 0; i < linkResults.length; i++) {
      sectionsResult.data[i]["links"] = [];
      for (var linkData of linkResults[i].data) {
        console.assert(sectionsResult.data[i].id === linkData.section);
        sectionsResult.data[i].links.push(linkData.link);
      }
    }

    return sectionsResult.data;
  } catch (e) {
    throw e;
  }
}

async function putSections(
  portfolioId: number,
  pageId: number,
  sections: TSection[],
  editSections: TEditSection[],
  config: any
) {
  const path =
    PORTFOLIOS_PATH +
    "/" +
    portfolioId.toString() +
    "/pages/" +
    pageId.toString() +
    "/sections";
  try {
    const response = await API.put(path, sections, config);

    // Put all section links at the same time.
    await Promise.all(
      editSections.map((section: TEditSection) => {
        const linksPath = path + "/" + section.id + "/links";
        return API.put(linksPath, section.links, config);
      })
    );

    return response;
  } catch (e) {
    throw e;
  }
}

export const useSection = () => {
  const [state, updateState, setState, resetState] = useContext(SectionContext);
  const { getConfig, isLoading } = useUser();
  const { linkIndex } = useLink();

  async function fetchSections(portfolio_id: number, page_id: number) {
    try {
      const sectionDetails = await getSections(
        portfolio_id,
        page_id,
        getConfig()
      );
      const IdSections = sectionDetails.map((section: any) => {
        const uidPair = { uid: uuidv4() };
        const newSection = { ...section, ...uidPair };
        return newSection;
      });
      await setState(IdSections);
    } catch (e) {
      throw e;
    } finally {
    }
  }

  function sectionIndex(uuid_index: string) {
    const index = state.findIndex(
      (section: TEditSection) => section.uid === uuid_index
    );
    if (index > -1) {
      return index;
    } else {
      throw Error("Section with id: " + uuid_index + " could not be found.");
    }
  }

  function sectionIndexFromId(id: number) {
    const index = state.findIndex((section: TEditSection) => section.id === id);
    if (index > -1) {
      return index;
    } else {
      throw Error("Section with id: " + id + " could not be found.");
    }
  }

  const getFetchedSection = (uuid_index: string) => {
    try {
      return state[sectionIndex(uuid_index)];
    } catch(e) {
      throw e
    }
  };

  /**
   * Prepare section data for sending to backend.
   * 1. Remove unique identifiers
   * 2. Override section numbers
   * 3. Remove empty sections entirely
   */
  const getCleanedSections = () => {
    const cleanSections = JSON.parse(JSON.stringify(state));
    for (var i = 0; i < cleanSections.length; i++) {
      if (sectionIsNotBlank(cleanSections[i])) {
        delete cleanSections[i].uid;
        cleanSections[i].number = i;
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
    updateState(key, { name: e.target.value });
  };

  function handleSectionChange(targetIndex: number, newSection: TEditSection) {
    try {
      setState(listAdd(state, targetIndex, newSection));
    } catch(e) {
      throw e;
    }
  }

  function handleSectionDelete(targetIndex: number) {
    try {
      setState(listDelete(state, targetIndex));
    } catch(e) {
      throw e;
    }
  }

  function handleSectionMoveUp(targetIndex: number, section: TEditSection) {
    try {
      setState(listMoveUp(state, targetIndex));
    } catch(e) {
      throw e;
    }
  }

  function handleSectionMoveDown(targetIndex: number, section: TEditSection) {
    try {
      setState(listMoveDown(state, targetIndex));
    } catch (e) {
      throw e;
    }
  }

  function getFetchedSections() {
    return isLoading() ? [defaultSectionContext] : state;
  }

  async function saveSections(
    isNew: boolean,
    portfolio_id: number,
    page_id: number
  ) {
    // Note: cleanup is not required, this is handled automatically on the back end
    try {
      return isNew
        ? await putSections(
            portfolio_id,
            page_id,
            getCleanedSections(),
            state,
            getConfig()
          )
        : await putSections(
            portfolio_id,
            page_id,
            getCleanedSections(),
            state,
            getConfig()
          );
    } catch (e) {
      throw e;
    }
  }

  function updateSectionLinks(uuid_index: string, links: TLink[]) {
    updateState(uuid_index, { links: links });
  }

  function getFetchedSectionLinks(uuid_index: string) {
    return getFetchedSection(uuid_index).links;
  }

  function getFetchedSectionLinksFromId(id: number) {
    try {
      const index = sectionIndexFromId(id);
      return state[index].links;
    } catch (e) {
      throw e;
    }
  }

  function sectionLinkAdd(uuid_index: string, link: TLink) {
    const links = getFetchedSectionLinks(uuid_index);
    if (!validate(link.id)) {
      link.id = uuidv4();
    }
    const index = links.findIndex(
      (existingLink: TLink) => existingLink.id === link.id
    );
    if (index > -1) {
      updateSectionLinks(uuid_index, [
        ...links.slice(0, index),
        link,
        ...links.slice(index + 1),
      ]);
    } else {
      updateSectionLinks(uuid_index, [...links, link]);
    }
  }

  function handleSectionLinkDelete(uuid_index: string, link: TLink) {
    const links = getFetchedSectionLinks(uuid_index);
    const index = linkIndex(link.id, links);
    try {
      updateSectionLinks(uuid_index, listDelete(links, index));
    } catch (e) {
      throw e;
    }
  }

  function handleSectionLinkMoveUp(uuid_index: string, link: TLink) {
    const links = getFetchedSectionLinks(uuid_index);
    const index = linkIndex(link.id, links);
    try {
      updateSectionLinks(uuid_index, listMoveUp(links, index));
    } catch (e) {
      throw e;
    }
  }

  function handleSectionLinkMoveDown(uuid_index: string, link: TLink) {
    const links = getFetchedSectionLinks(uuid_index);
    const index = linkIndex(link.id, links);
    try {
      updateSectionLinks(uuid_index, listMoveDown(links, index));
    } catch (e) {
      throw e;
    }
  }

  function resetSections() {
    resetState();
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
    saveSections,
    updateSectionLinks,
    getFetchedSectionLinks,
    getFetchedSectionLinksFromId,
    sectionLinkAdd,
    handleSectionLinkDelete,
    handleSectionLinkMoveUp,
    handleSectionLinkMoveDown,
    resetSections,
  };
};
