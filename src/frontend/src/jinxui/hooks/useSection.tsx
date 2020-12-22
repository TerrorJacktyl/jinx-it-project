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

  async function fetchSections(portfolio_id: number, pageId: number) {
    try {
      const sectionDetails = await getSections(
        portfolio_id,
        pageId,
        getConfig()
      );
      const IdSections = sectionDetails.map((section: any) => {
        const uidPair = { uid: uuidv4() };
        const newSection = { ...section, ...uidPair };
        return newSection;
      });
      await setState({...state, [pageId] : IdSections});
    } catch (e) {
      throw e;
    } finally {
    }
  }

  function sectionIndex(pageId: number, uuid_index: string) {
    const index = state[pageId].findIndex(
      (section: TEditSection) => section.uid === uuid_index
    );
    if (index > -1) {
      return index;
    } else {
      throw Error("Section with id: " + uuid_index + " could not be found.");
    }
  }

  function sectionIndexFromId(pageId: number, id: number) {
    const index = state[pageId].findIndex((section: TEditSection) => section.id === id);
    if (index > -1) {
      return index;
    } else {
      throw Error("Section with id: " + id + " could not be found.");
    }
  }

  const getFetchedSection = (pageId: number, uuid_index: string) => {
    try {
      return state[pageId][sectionIndex(pageId, uuid_index)];
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
  const getCleanedSections = (pageId: number) => {
    const cleanSections = JSON.parse(JSON.stringify(state[pageId]));
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

  function handleSectionChange(pageId: number, targetIndex: number, newSection: TEditSection) {
    try {
      setState({...state, [pageId]: listAdd(state[pageId], targetIndex, newSection) });
    } catch(e) {
      throw e;
    }
  }

  function handleSectionDelete(pageId: number, targetIndex: number) {
    try {
      setState({...state, [pageId]: listDelete(state[pageId], targetIndex) });
    } catch(e) {
      throw e;
    }
  }

  function handleSectionMoveUp(pageId: number, targetIndex: number) {
    try {
      setState({...state, [pageId]: listMoveUp(state[pageId], targetIndex) });
    } catch(e) {
      throw e;
    }
  }

  function handleSectionMoveDown(pageId: number, targetIndex: number) {
    try {
      setState({...state, [pageId]: listMoveDown(state[pageId], targetIndex)});
    } catch (e) {
      throw e;
    }
  }

  function getFetchedSections(pageId: number) {
    return isLoading() ? [defaultSectionContext] : state[pageId]
  }

  function getFetchedSectionsAll() {
    
    return isLoading() ? {1: [defaultSectionContext]} : state
  }


  async function saveSections(
    pageId: number,
    isNew: boolean,
    portfolio_id: number,
  ) {
    try {
      return isNew
        ? await putSections(
            portfolio_id,
            pageId,
            getCleanedSections(pageId),
            state[pageId],
            getConfig()
          )
        : await putSections(
            portfolio_id,
            pageId,
            getCleanedSections(pageId),
            state[pageId],
            getConfig()
          );
    } catch (e) {
      throw e;
    }
  }

  function updateSectionLinks(pageId: number, uuid_index: string, links: TLink[]) {
    updateState(pageId, uuid_index, { links: links });
  }

  function getFetchedSectionLinks(pageId: number, uuid_index: string) {
    return getFetchedSection(pageId, uuid_index).links;
  }

  function getFetchedSectionLinksFromId(pageId: number, id: number) {
    try {
      const index = sectionIndexFromId(pageId, id);
      return state[pageId][index].links;
    } catch (e) {
      throw e;
    }
  }

  function sectionLinkAdd(pageId: number, uuid_index: string, link: TLink) {
    const links = getFetchedSectionLinks(pageId, uuid_index);
    if (!validate(link.id)) {
      link.id = uuidv4();
    }
    const index = links.findIndex(
      (existingLink: TLink) => existingLink.id === link.id
    );
    if (index > -1) {
      updateSectionLinks(pageId, uuid_index, [
        ...links.slice(0, index),
        link,
        ...links.slice(index + 1),
      ]);
    } else {
      updateSectionLinks(pageId, uuid_index, [...links, link]);
    }
  }

  function handleSectionLinkDelete(pageId: number, uuid_index: string, link: TLink) {
    const links = getFetchedSectionLinks(pageId, uuid_index);
    const index = linkIndex(link.id, links);
    try {
      updateSectionLinks(pageId, uuid_index, listDelete(links, index));
    } catch (e) {
      throw e;
    }
  }

  function handleSectionLinkMoveUp(pageId: number, uuid_index: string, link: TLink) {
    const links = getFetchedSectionLinks(pageId, uuid_index);
    const index = linkIndex(link.id, links);
    try {
      updateSectionLinks(pageId, uuid_index, listMoveUp(links, index));
    } catch (e) {
      throw e;
    }
  }

  function handleSectionLinkMoveDown(pageId: number, uuid_index: string, link: TLink) {
    const links = getFetchedSectionLinks(pageId, uuid_index);
    const index = linkIndex(link.id, links);
    try {
      updateSectionLinks(pageId, uuid_index, listMoveDown(links, index));
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
    getFetchedSectionsAll,
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
