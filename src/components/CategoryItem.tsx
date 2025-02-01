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

const CategoryItem = ({ cat, presetColours }) => {
  const [category, setCategory] = useState(cat);
  const updateCategory = useCategoryStore((state) => state.updateCategory);

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
        <Typography width="130px">{category.name}</Typography>
        {/* <PopoverPicker colour={category.colour} onChange={setColour} /> */}
        <SwatchesPicker
          colour={cat.colour}
          onChange={handleChangeColour}
          presetColours={presetColours}
        />
      </Stack>
      {/* <Box></Box> */}

      <ButtonGroup>
        <IconButton>
          <EditIcon />
        </IconButton>
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </ButtonGroup>
    </Paper>
  );
};

export default CategoryItem;
