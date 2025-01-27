import { create } from "zustand";
import categoryType from "../types/categoryType";
import dummyCategories from "../utils/dummyCategories";

type state = {
  categories: categoryType[];
};

type actions = {
  addCategory: (task: categoryType) => void;
};

const useCategoryStore = create<state & actions>()((set) => ({
  categories: dummyCategories,
  addCategory: (category: categoryType) =>
    set((state) => ({
      categories: [...state.categories, category],
    })),
}));

export default useCategoryStore;
