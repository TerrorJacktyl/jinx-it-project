/* Prefix all custom types with T to avoid possible name conflicts 
   with variables and components. Should be OK to not do this for prop 
   types defined within your file */

export type TPortfolio = {
  id: number;
  owner: number;
  name: string;
  pages: number[];
  private: boolean;
  theme: string;
  background: string;
};// | null;

export type TPage = {
  id: number;
  name: string;
  number: number;
  sections: number[];
};

export type TSectionData = {
  name: string;
  content: string;
  media?: string;
  image?: number | null;
  path?: string;
  alt?: string;
};

export interface TSection extends TSectionData {
  id?: number;
  type: string;
  number: number;
}
export interface TEditSection extends TSection {
  uid?: string
  links: TLink[]
};

export interface TEditSections {
  [pageId: number]: TEditSection[]
}

export type TPortfolioData = {
  name: string;
  number?: number;
};

export type TPageData = {
  name: string;
  number?: number;
};



export type TLink = {
  title?: string;
  address?: string;
  icon?: number;
  id: string;
  number: number;
};

export type TPageLink = {
  page: number;
  link: TLink;
}

export type TSectionLink = {
  section: number;
  link: TLink;
}

