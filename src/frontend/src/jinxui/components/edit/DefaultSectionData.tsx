import { TEditSection } from "jinxui/types";

import { v4 as uuidv4 } from "uuid";

const DefaultSectionData: any = () => {
  const defaultSection: TEditSection = {
    id: 0,
    name: "",
    number: 0,
    content: "",
    media: "",
    type: "text",
    path: "",
    image: null,
    uid: uuidv4(),
    links: [],
  };
  return defaultSection;
};

export default DefaultSectionData;
