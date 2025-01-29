import { Button, FormControl, TextField, Typography } from "@mui/material";
import categoryType from "../types/categoryType";
import { useState } from "react";
import getEmptyCategory from "../utils/functions/getEmptyCategory";
import { MuiColorInput } from "mui-color-input";
import useCategoryStore from "../store/categoryStore";
import { useNavigate } from "react-router";
import { HOME_ROUTE } from "../utils/fullRoutes";

const ManageCategoriesPage = () => {
  const addCategory = useCategoryStore((state) => state.addCategory);
  const navigate = useNavigate();
  const [categoryInput, setCategoryInput] = useState<categoryType>(
    getEmptyCategory()
  );

  const handleChangeColour = (newColour) => {
    setCategoryInput({ ...categoryInput, colour: newColour });
  };
  return (
    <>
      <Typography variant="h4" component="h1" textAlign="center" mb={3}>
        Manage Categories
      </Typography>
      <FormControl fullWidth sx={{ display: "flex", gap: "1rem" }}>
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
        <MuiColorInput
          format="hex"
          value={categoryInput.colour}
          onChange={handleChangeColour}
        />
        <Button
          variant="contained"
          onClick={() => {
            addCategory(categoryInput);
            navigate(HOME_ROUTE);
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
    </>
  );
};

export default ManageCategoriesPage;
