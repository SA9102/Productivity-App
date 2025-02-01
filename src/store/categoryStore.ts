import { create } from "zustand";
import categoryType from "../types/categoryType";
import dummyCategories from "../utils/dummyCategories";

type state = {
  categories: categoryType[];
};

type actions = {
  addCategory: (category: categoryType) => void;
  updateCategory: (updatedCategory: categoryType) => void;
};

const useCategoryStore = create<state & actions>()((set) => ({
  categories: dummyCategories,
  addCategory: (category: categoryType) =>
    set((state) => ({
      categories: [...state.categories, category],
    })),
  updateCategory: (updatedCategory: categoryType) =>
    set((state) => ({
      categories: state.categories.map((category: categoryType) => {
        if (category.id === updatedCategory.id) {
          return updatedCategory;
        }
        return category;
      }),
    })),
}));

export default useCategoryStore;
