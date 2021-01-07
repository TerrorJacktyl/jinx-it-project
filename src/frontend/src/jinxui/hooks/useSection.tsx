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
  TPage,
  TEditPage,
  TEditSection,
  TEditSections,
  TLink,
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

async function getSectionsAll(
  portfolioId: number,
  pages: TEditPage[],
  config: any
) {
  try {
    const sectionsResult = await Promise.all(
      pages.map((page: TPage) => {
        const sectionPath =
          PORTFOLIOS_PATH +
          "/" +
          portfolioId +
          "/pages/" +
          page.id +
          "/sections";
        return API.get(sectionPath, config);
      })
    );

    // Extract appropriate information
    var cleanResult: TEditSections = {};
    for (var i = 0; i < pages.length; i++) {
      const pageUid = pages[i].uid;
      const sectionsData = sectionsResult[i].data;
      // Give the section a uid
      for (var sectionData of sectionsData) {
        sectionData.uid = uuidv4();

        // Extract link from sectionLink object
        var cleanLinks = [];
        for (var sectionLink of sectionData.links) {
          cleanLinks.push(sectionLink.link);
        }
        sectionData.links = cleanLinks;
      }
      cleanResult[pageUid] = sectionsResult[i].data;
    }
    return cleanResult;
  } catch (e) {
    throw e;
  }
}

// Call from UsePage to prevent circular dependency issues
export async function putSections(
  portfolioId: number,
  pageId: number,
  sections: TEditSection[],
  config: any
) {
  const basePath =
    PORTFOLIOS_PATH + "/" + portfolioId + "/pages/" + pageId + "/sections";

  return API.put(basePath, sections, config).then((response: any) => {
    Promise.all(
      response.data.map((responseSection: any, index: number) => {
        const linksPath = basePath + "/" + responseSection.id + "/links";
        const linksResponse = API.put(linksPath, sections[index].links, config);
        return linksResponse;
      })
    );
  });
}

export const useSection = () => {
  const [state, updateState, setState, resetState] = useContext(SectionContext);
  const { getConfig, isLoading } = useUser();
  const { linkIndex } = useLink();

  async function fetchSectionsAll(portfolioId: number, pages: TEditPage[]) {
    const result = await getSectionsAll(portfolioId, pages, getConfig());
    setState(result);
  }

  function sectionIndex(pageUid: string, uuid_index: string) {
    const index = state[pageUid].findIndex(
      (section: TEditSection) => section.uid === uuid_index
    );
    if (index > -1) {
      return index;
    } else {
      throw Error("Section with id: " + uuid_index + " could not be found.");
    }
  }

  function sectionIndexFromId(pageUid: string, id: number) {
    const index = state[pageUid].findIndex(
      (section: TEditSection) => section.id === id
    );
    if (index > -1) {
      return index;
    } else {
      throw Error("Section with id: " + id + " could not be found.");
    }
  }

  const getFetchedSection = (pageUid: string, uuid_index: string) => {
    try {
      return state[pageUid][sectionIndex(pageUid, uuid_index)];
    } catch (e) {
      throw e;
    }
  };

  /**
   * Prepare section data for sending to backend.
   * 1. Remove unique identifiers
   * 2. Override section numbers
   * 3. Remove empty sections entirely
   */
  const getCleanedSections = (pageUid: string) => {
    const cleanSections = JSON.parse(JSON.stringify(state[pageUid]));
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
    pageUid: string,
    sectionUid: string,
  ) => {
    updateState(pageUid, sectionUid, { content: e.target.value });
  };

  const handleTitleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    pageUid: string,
    sectionUid: string,
  ) => {
    updateState(pageUid, sectionUid, { name: e.target.value });
  };

  function handleSectionChange(
    pageUid: string,
    targetIndex: number,
    newSection: TEditSection
  ) {
    try {
      setState({
        ...state,
        [pageUid]: listAdd(state[pageUid], targetIndex, newSection),
      });
    } catch (e) {
      throw e;
    }
  }

  function handleSectionAddPage(pageUid: string) {
    if (pageUid in state) {
      throw Error("Tried to add new page with an existing page ID");
    } else {
      setState({ ...state, [pageUid]: [] });
    }
  }

  function handleSectionDelete(pageUid: string, targetIndex: number) {
    try {
      setState({
        ...state,
        [pageUid]: listDelete(state[pageUid], targetIndex),
      });
    } catch (e) {
      throw e;
    }
  }

  function handleSectionDeletePage(pageUid: string) {
    delete state[pageUid];
  }

  function handleSectionMoveUp(pageUid: string, targetIndex: number) {
    try {
      setState({
        ...state,
        [pageUid]: listMoveUp(state[pageUid], targetIndex),
      });
    } catch (e) {
      throw e;
    }
  }

  function handleSectionMoveDown(pageUid: string, targetIndex: number) {
    try {
      setState({
        ...state,
        [pageUid]: listMoveDown(state[pageUid], targetIndex),
      });
    } catch (e) {
      throw e;
    }
  }

  function getFetchedSections(pageUid: string) {
    return isLoading() ? [defaultSectionContext] : state[pageUid];
  }

  function getFetchedSectionsAll() {
    return isLoading() ? { 1: [defaultSectionContext] } : state;
  }

  // async function getFetchedSectionsIndexedAll() {
  //   for (const [pageUid, sections] of Object.entries(state)) {
  //     for(var i = 0; i < sections.length; i++) {
  //       const sectionUid = sections[i].uid
  //       // const section = sections[i]
  //       await updateState(pageUid, sectionUid, {'number': i})
  //     }
  //   }
  //   return state
  // }

  function getSectionsCopyIndexedAll() {
    const allSections:TEditSections = JSON.parse(JSON.stringify(state));
      for (const [, sections] of Object.entries(allSections)) {
        for(var i = 0; i < sections.length; i++) {
          sections[i].number = i
        }
      }
    return allSections
  }

  async function saveSections(
    portfolioId: number,
    pageId: number,
    pageUid: string
  ) {
    try {
      const sections = state[pageUid];
      return await putSections(portfolioId, pageId, sections, getConfig());
    } catch (e) {
      throw e;
    }
  }

  function updateSectionLinks(
    pageUid: string,
    sectionUid: string,
    links: TLink[]
  ) {
    updateState(pageUid, sectionUid, { links: links });
  }

  function getFetchedSectionLinks(pageUid: string, uuid_index: string) {
    const fetchedSection = getFetchedSection(pageUid, uuid_index);
    return fetchedSection.links;
  }

  function getFetchedSectionLinksFromId(pageUid: string, id: number) {
    try {
      const index = sectionIndexFromId(pageUid, id);
      return state[pageUid][index].links;
    } catch (e) {
      throw e;
    }
  }

  function sectionLinkAdd(pageUid: string, uuid_index: string, link: TLink) {
    const sectionLinks: TLink[] = getFetchedSectionLinks(pageUid, uuid_index);
    if (!validate(link.id)) {
      link.id = uuidv4();
    }
    const index = sectionLinks.findIndex(
      (existingLink: TLink) => existingLink.id === link.id
    );
    if (index > -1) {
      updateSectionLinks(pageUid, uuid_index, [
        ...sectionLinks.slice(0, index),
        link,
        ...sectionLinks.slice(index + 1),
      ]);
    } else {
      updateSectionLinks(pageUid, uuid_index, [...sectionLinks, link]);
    }
  }

  function handleSectionLinkDelete(
    pageUid: string,
    uuid_index: string,
    link: TLink
  ) {
    const links = getFetchedSectionLinks(pageUid, uuid_index);
    const index = linkIndex(link.id, links);
    try {
      updateSectionLinks(pageUid, uuid_index, listDelete(links, index));
    } catch (e) {
      throw e;
    }
  }

  function handleSectionLinkMoveUp(
    pageUid: string,
    uuid_index: string,
    link: TLink
  ) {
    const links = getFetchedSectionLinks(pageUid, uuid_index);
    const index = linkIndex(link.id, links);
    try {
      updateSectionLinks(pageUid, uuid_index, listMoveUp(links, index));
    } catch (e) {
      throw e;
    }
  }

  function handleSectionLinkMoveDown(
    pageUid: string,
    uuid_index: string,
    link: TLink
  ) {
    const links = getFetchedSectionLinks(pageUid, uuid_index);
    const index = linkIndex(link.id, links);
    try {
      updateSectionLinks(pageUid, uuid_index, listMoveDown(links, index));
    } catch (e) {
      throw e;
    }
  }

  function resetSections() {
    resetState();
  }

  return {
    sectionIndex,
    fetchSectionsAll,
    getFetchedSection,
    getFetchedSections,
    getFetchedSectionsAll,
    getSectionsCopyIndexedAll,
    getCleanedSections,
    handleContentChange,
    handleTitleChange,
    handleSectionChange,
    handleSectionAddPage,
    handleSectionDelete,
    handleSectionDeletePage,
    handleSectionMoveUp,
    handleSectionMoveDown,
    // saveSectionsAll,
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
