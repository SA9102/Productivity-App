import { v4 as uuidv4 } from "uuid";

import categoryType from "../../types/categoryType";

const getEmptyCategory = (): categoryType => {
  return {
    id: uuidv4(),
    name: "",
    colour: "#ffffff",
  };
};

export default getEmptyCategory;
