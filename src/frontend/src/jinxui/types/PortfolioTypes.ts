/* Prefix all custom types with T to avoid possible name conflicts 
   with variables and components. Should be OK to not do this for prop 
   types defined within your file */

export type TPortfolio = {
  id: number;
  owner: number;
  name: string;
  pages: number[];
  theme: string;
  background: string;
} | null;

export type TPage = {
  id: number;
  name: string;
  number: number;
  sections: number[];
};

export interface TSection extends TSectionData {
  id?: number;
  type: string;
  number: number;
}
export interface TEditSection extends TSection {
  uid: string
};

export type TPortfolioData = {
  name: string;
  number?: number;
};

export type TPageData = {
  name: string;
  number?: number;
};

export type TSectionData = {
  name: string;
  content: string;
  media?: string;
  image?: number | null;
  path?: string;
  alt?: string;
};

export type TLinkData = {
  title?: string;
  address?: string;
  icon?: string;
  id: string;
} | null;