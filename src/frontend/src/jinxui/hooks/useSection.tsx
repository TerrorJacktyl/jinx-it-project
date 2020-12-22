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

async function getSectionsAll(
  portfolioId: number,
  pages: TPage[],
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
      const pageId = pages[i].id;
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
      cleanResult[pageId] = sectionsResult[i].data;
    }
    return cleanResult;
  } catch (e) {
    throw e;
  }
}

function cleanSectionLinks(links: TLink[], sectionId: number | undefined) {
  var cleanLinks: TSectionLink[] = [];
  const id = sectionId ? sectionId : 0;
  for (var i = 0; i < links.length; i++) {
    // links[i].number = i;
    // links[i] = {section: sectionId, link:links[i]}
    cleanLinks.push({ section: id, link: { ...links[i], number: i } });
  }
  return cleanLinks;
}

async function putSectionsAll(
  portfolioId: number,
  allSections: TEditSections,
  config: any
) {
  const basePath = PORTFOLIOS_PATH + "/" + portfolioId + "/pages/";
  try {
    const response = await Promise.all(
      Object.keys(allSections).map((pageIdString: string) => {
        const sectionsPath = basePath + pageIdString + "/sections";
        const pageId = parseInt(pageIdString);
        const sections = allSections[pageId];
        // const linksResponse = Promise.all(

        // )
        // // const newCleanedSections = []
        // for (var section of sections) {
        //   newCleanedSections.push({...section,
        //     links: cleanSectionLinks(section.links, section.id)
        //   });
        // }

        const pageResponse = API.put(sectionsPath, sections, config).then(
          (response: any) => {
            Promise.all(
              response.data.map((responseSection: any, index: number) => {
                const linksPath =
                  sectionsPath + "/" + responseSection.id + "/links";
                const linksResponse = API.put(linksPath, sections[index].links, config)
                return linksResponse;
              })
            );
          }
        );
        return pageResponse;
      })
    );
    console.log(response);
    return response;
  } catch (e) {
    throw e;
  }
}

export const useSection = () => {
  const [state, updateState, setState, resetState] = useContext(SectionContext);
  const { getConfig, isLoading } = useUser();
  const { linkIndex } = useLink();

  async function fetchSectionsAll(portfolioId: number, pages: TPage[]) {
    const result = await getSectionsAll(portfolioId, pages, getConfig());
    setState(result);
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
    const index = state[pageId].findIndex(
      (section: TEditSection) => section.id === id
    );
    if (index > -1) {
      return index;
    } else {
      throw Error("Section with id: " + id + " could not be found.");
    }
  }

  const getFetchedSection = (pageId: number, uuid_index: string) => {
    try {
      return state[pageId][sectionIndex(pageId, uuid_index)];
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

  const getCleanedSectionsAll = () => {
    var cleanSectionsAll: any = {};
    Object.keys(state).map((pageIdString: string) => {
      const pageId = parseInt(pageIdString);
      cleanSectionsAll[pageId] = getCleanedSections(pageId);
      return cleanSectionsAll[pageId];
    });
    return cleanSectionsAll;
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

  function handleSectionChange(
    pageId: number,
    targetIndex: number,
    newSection: TEditSection
  ) {
    try {
      setState({
        ...state,
        [pageId]: listAdd(state[pageId], targetIndex, newSection),
      });
    } catch (e) {
      throw e;
    }
  }

  function handleSectionDelete(pageId: number, targetIndex: number) {
    try {
      setState({ ...state, [pageId]: listDelete(state[pageId], targetIndex) });
    } catch (e) {
      throw e;
    }
  }

  function handleSectionMoveUp(pageId: number, targetIndex: number) {
    try {
      setState({ ...state, [pageId]: listMoveUp(state[pageId], targetIndex) });
    } catch (e) {
      throw e;
    }
  }

  function handleSectionMoveDown(pageId: number, targetIndex: number) {
    try {
      setState({
        ...state,
        [pageId]: listMoveDown(state[pageId], targetIndex),
      });
    } catch (e) {
      throw e;
    }
  }

  function getFetchedSections(pageId: number) {
    return isLoading() ? [defaultSectionContext] : state[pageId];
  }

  function getFetchedSectionsAll() {
    return isLoading() ? { 1: [defaultSectionContext] } : state;
  }

  async function saveSectionsAll(portfolioId: number) {
    try {
      return putSectionsAll(portfolioId, getCleanedSectionsAll(), getConfig());
    } catch (e) {
      throw e;
    }
  }

  function updateSectionLinks(
    pageId: number,
    uuid_index: string,
    links: TLink[]
  ) {
    updateState(pageId, uuid_index, { links: links });
  }

  function getFetchedSectionLinks(pageId: number, uuid_index: string) {
    const fetchedSection = getFetchedSection(pageId, uuid_index);
    return fetchedSection.links;
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
    const sectionLinks: TLink[] = getFetchedSectionLinks(pageId, uuid_index);
    if (!validate(link.id)) {
      link.id = uuidv4();
    }
    const index = sectionLinks.findIndex(
      (existingLink: TLink) => existingLink.id === link.id
    );
    if (index > -1) {
      updateSectionLinks(pageId, uuid_index, [
        ...sectionLinks.slice(0, index),
        link,
        ...sectionLinks.slice(index + 1),
      ]);
    } else {
      updateSectionLinks(pageId, uuid_index, [...sectionLinks, link]);
    }
  }

  function handleSectionLinkDelete(
    pageId: number,
    uuid_index: string,
    link: TLink
  ) {
    const links = getFetchedSectionLinks(pageId, uuid_index);
    const index = linkIndex(link.id, links);
    try {
      updateSectionLinks(pageId, uuid_index, listDelete(links, index));
    } catch (e) {
      throw e;
    }
  }

  function handleSectionLinkMoveUp(
    pageId: number,
    uuid_index: string,
    link: TLink
  ) {
    const links = getFetchedSectionLinks(pageId, uuid_index);
    const index = linkIndex(link.id, links);
    try {
      updateSectionLinks(pageId, uuid_index, listMoveUp(links, index));
    } catch (e) {
      throw e;
    }
  }

  function handleSectionLinkMoveDown(
    pageId: number,
    uuid_index: string,
    link: TLink
  ) {
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
    sectionIndex,
    fetchSectionsAll,
    getFetchedSection,
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
