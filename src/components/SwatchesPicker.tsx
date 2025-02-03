/***
DISPLAYS A SET A PRE-DEFINED COLOURS TO CHOOSE FROM FOR A CATEGORY.
MOST OF THIS CODE IS TAKEN FROM THE react-colorful DOCUMENTATION.
***/

import { Box, Stack } from "@mui/material";
import { useCallback, useRef, useState } from "react";
import useClickOutside from "../hooks/useClickOutside";

type props = {
  colour: string;
  onChange: (arg: string) => void;
  presetColours: string[];
};

const SwatchesPicker = ({ colour, onChange, presetColours }: props) => {
  const popover = useRef();
  const [isOpen, toggleOpen] = useState(false);

  const close = useCallback(() => toggleOpen(false), []);
  useClickOutside(popover, close);
  return (
    <Stack flexDirection="row" alignItems="center">
      <Box
        sx={{
          backgroundColor: colour,
          width: "28px",
          height: "28px",
          borderRadius: "8px",
          boxShadow:
            "0 0 0 1px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(0, 0, 0, 0.1)",
          cursor: "pointer",
        }}
        onClick={() => toggleOpen(true)}
      />
      {isOpen && (
        <Box
          ref={popover}
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            borderRadius: "9px",
          }}
        >
          {presetColours.map((presetColour) => (
            <button
              key={presetColour}
              style={{
                width: "24px",
                height: "24px",
                margin: "4px",
                border: "none",
                padding: "0",
                borderRadius: "4px",
                cursor: "pointer",
                outline: "none",
                backgroundColor: presetColour,
              }}
              onClick={() => {
                onChange(presetColour);
                close();
              }}
            />
          ))}
        </Box>
      )}
    </Stack>
  );
};

export default SwatchesPicker;
