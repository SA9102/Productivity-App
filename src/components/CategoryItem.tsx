/***
DISPLAYS A 'CATEGORY ITEM', WHICH CONTAINS THE CATEGORY'S NAME AND COLOUR.
THE CATEGORY ITEM IS EDITABLE AND DELETABLE.
***/
// React
import { useState } from "react";
// MUI components
import {
  ButtonGroup,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
// MUI Icons
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
// MUI colours
import { grey } from "@mui/material/colors";
// Store
import useCategoryStore from "../store/categoryStore";
import useTaskStore from "../store/taskStore";
// Custom components
import SwatchesPicker from "./SwatchesPicker";
// Custom types
import categoryType from "../types/categoryType";

type props = {
  cat: categoryType;
  presetColours: string[];
};

const CategoryItem = ({ cat, presetColours }: props) => {
  const [name, setName] = useState(cat.name); // Used for controlled input when editing the name
  const [isEditing, setIsEditing] = useState(false); // Display typography or text field depending on this value
  const updateCategory = useCategoryStore((state) => state.updateCategory);
  const deleteCategory = useCategoryStore((state) => state.deleteCategory);
  const removeCategory = useTaskStore((state) => state.removeCategory);

  const handleChangeColour = (newColour: string) => {
    updateCategory({ id: cat.id, name: cat.name, colour: newColour });
  };
  return (
    <Paper
      sx={{
        flex: 1,
        backgroundColor: grey[900],
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      <Stack flexDirection="row">
        {isEditing ? (
          <TextField
            size="small"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          <Typography width="130px">{name}</Typography>
        )}

        <SwatchesPicker
          colour={cat.colour}
          onChange={handleChangeColour}
          presetColours={presetColours}
        />
      </Stack>

      <ButtonGroup>
        {isEditing ? (
          <>
            <IconButton
              onClick={() => {
                setIsEditing(false);
                updateCategory({ id: cat.id, name: name, colour: cat.colour });
              }}
            >
              <CheckIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                setIsEditing(false);
                setName(cat.name);
              }}
            >
              <CloseIcon />
            </IconButton>
          </>
        ) : (
          <IconButton onClick={() => setIsEditing(true)}>
            <EditIcon />
          </IconButton>
        )}

        <IconButton
          onClick={() => {
            deleteCategory(cat.id);
            removeCategory(cat.id);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </ButtonGroup>
    </Paper>
  );
};

export default CategoryItem;
