import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import categoryType from "../types/categoryType";
import { useState } from "react";
import getEmptyCategory from "../utils/functions/getEmptyCategory";
import useCategoryStore from "../store/categoryStore";
import { useNavigate } from "react-router";
import { HOME_ROUTE } from "../utils/fullRoutes";
import { grey } from "@mui/material/colors";

import PopoverPicker from "../components/PopoverPicker";
import SwatchesPicker from "../components/SwatchesPicker";
import CategoryItem from "../components/CategoryItem";

const ManageCategoriesPage = () => {
  const categories = useCategoryStore((state) => state.categories);
  const addCategory = useCategoryStore((state) => state.addCategory);
  const updateCategory = useCategoryStore((state) => state.updateCategory);
  const navigate = useNavigate();
  const [categoryInput, setCategoryInput] = useState<categoryType>(
    getEmptyCategory()
  );
  const presetColours = ["#cd9323", "#1a53d8", "#9a2151", "#0d6416", "#8d2808"];

  const handleChangeColour = (newColour) => {
    setCategoryInput({ ...categoryInput, colour: newColour });
  };
  return (
    <>
      <Typography variant="h4" component="h1" textAlign="center" mb={3}>
        Manage Categories
      </Typography>
      <Stack sx={{ gap: "3rem" }}>
        <FormControl fullWidth sx={{ display: "flex", gap: "1rem" }}>
          <Typography>Edit Categories</Typography>
          {categories.map((category) => (
            <CategoryItem
              key={category.id}
              cat={category}
              presetColours={presetColours}
            />
          ))}
        </FormControl>
        <FormControl fullWidth sx={{ display: "flex", gap: "1rem" }}>
          <Typography>New Category</Typography>
          <TextField
            variant="outlined"
            id="category-name-input"
            label="Name"
            aria-describedby="enter-category-name-here"
            value={categoryInput.name}
            onChange={(e) =>
              setCategoryInput({ ...categoryInput, name: e.target.value })
            }
            required
          />
          <SwatchesPicker
            colour={categoryInput.colour}
            onChange={handleChangeColour}
            presetColours={presetColours}
          />
          <Button
            variant="contained"
            onClick={() => {
              addCategory(categoryInput);
              // navigate(HOME_ROUTE);
            }}
          >
            Create Category
          </Button>
          <Button
            onClick={() => {
              navigate(HOME_ROUTE);
            }}
          >
            Cancel
          </Button>
        </FormControl>
      </Stack>
    </>
  );
};

export default ManageCategoriesPage;
