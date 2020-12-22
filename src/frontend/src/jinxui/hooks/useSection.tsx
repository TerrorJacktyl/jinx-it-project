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
  TEditSection,
  TEditSections,
  TSection,
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

async function getSectionsAll(portfolioId: number, pages: TPage[], config: any) {

  try {
    const sectionsResult = await Promise.all(pages.map((page: TPage) => {
      const sectionPath =
        PORTFOLIOS_PATH +
        "/" +
        portfolioId +
        "/pages/" +
        page.id +
        "/sections";
      return API.get(sectionPath, config)
    }))
    
    var cleanResult: TEditSections = {}
    for (var i = 0; i < pages.length; i++) {
      const pageId = pages[i].id;
      const sectionsData = sectionsResult[i].data;
      // Give the section a uid
      for (var sectionData of sectionsData) {
        sectionData.uid = uuidv4();
      }
      cleanResult[pageId] = sectionsResult[i].data
    }
    return cleanResult;
  } catch(e) {
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

async function putSectionsAll(portfolioId: number, allSections: TEditSections, config: any) {
  const basePath = PORTFOLIOS_PATH + "/" + portfolioId + "/pages/"
  try {
    const response = await Promise.all(Object.keys(allSections).map((pageIdString: string) => {
      const sectionsPath = basePath + pageIdString + "/sections";
      const pageId = parseInt(pageIdString);
      const sections = allSections[pageId];
      const pageResponse = API.put(sectionsPath, sections, config)
      return pageResponse
    }))
    return response
  } catch(e) {
    throw e;
  }
}



export const useSection = () => {
  const [state, updateState, setState, resetState] = useContext(SectionContext);
  const { getConfig, isLoading } = useUser();
  const { linkIndex } = useLink();

  async function fetchSectionsAll(portfolioId: number, pages: TPage[]) {
    const result = await getSectionsAll(portfolioId, pages, getConfig());
    setState(result)
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
        // var cleanLinks = []
        // for (var linkData of cleanSections[i].section_links) {
        //   cleanLinks.push(linkData.link)
        // }
        // cleanSections[i].section_links = cleanLinks;
        cleanSections[i].number = i;
        // for(var i = 0; i < cleanSections[i].section)
      }
    }
    return cleanSections;
  };

  const getCleanedSectionsAll = () => {
    var cleanSectionsAll: any = {}
    Object.keys(state).map((pageIdString: string) => {
      const pageId = parseInt(pageIdString);
      cleanSectionsAll[pageId] = getCleanedSections(pageId)
      // cleanSectionsAll.push(getCleanedSections(pageId))
    })
    return cleanSectionsAll
  }



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

  async function saveSectionsAll(
    portfolioId: number
  ) {
    try {
      return putSectionsAll(portfolioId, getCleanedSectionsAll(), getConfig());
    } catch(e) {
      throw e
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
    fetchSectionsAll,
    getFetchedSections,
    getFetchedSectionsAll,
    getCleanedSections,
    handleContentChange,
    handleTitleChange,
    handleSectionChange,
    handleSectionDelete,
    handleSectionMoveUp,
    handleSectionMoveDown,
    saveSectionsAll,
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
