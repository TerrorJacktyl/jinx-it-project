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
    image: 0,
    uid: uuidv4(),
  };
  return defaultSection;
};

export default DefaultSectionData;
