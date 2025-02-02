import {
  ButtonGroup,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SwatchesPicker from "./SwatchesPicker";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import { grey } from "@mui/material/colors";
import useCategoryStore from "../store/categoryStore";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import useTaskStore from "../store/taskStore";

const CategoryItem = ({ cat, presetColours }) => {
  const [name, setName] = useState(cat.name);
  const [category, setCategory] = useState(cat);
  const [isEditing, setIsEditing] = useState(false);
  const updateCategory = useCategoryStore((state) => state.updateCategory);
  const deleteCategory = useCategoryStore((state) => state.deleteCategory);
  const removeCategory = useTaskStore((state) => state.removeCategory);

  const handleChangeColour = (string) => {
    // setCategory({ ...category, colour: string });
    updateCategory({ id: cat.id, name: cat.name, colour: string });
  };
  return (
    <Paper
      sx={{
        flex: 1,
        // height: "50px",
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

        {/* <PopoverPicker colour={category.colour} onChange={setColour} /> */}
        <SwatchesPicker
          colour={cat.colour}
          onChange={handleChangeColour}
          presetColours={presetColours}
        />
      </Stack>
      {/* <Box></Box> */}

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
