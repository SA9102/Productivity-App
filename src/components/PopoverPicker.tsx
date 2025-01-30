// A popover colour picker that uses react-colourful
// Most of the code is from the documentation

import { Box } from "@mui/material";
import { useCallback, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";
import useClickOutside from "../hooks/useClickOutside";

type props = {
  colour: string;
  onChange: (arg: string) => void;
};

const PopoverPicker = ({ colour, onChange }: props) => {
  const popover = useRef();
  const [isOpen, toggleOpen] = useState(false);

  const close = useCallback(() => toggleOpen(false), []);
  useClickOutside(popover, close);
  return (
    // Picker
    <Box sx={{ position: "relative" }}>
      {/* Swatch */}
      <Box
        sx={{
          backgroundColor: colour,
          width: "28px",
          height: "28px",
          borderRadius: "8px",
          border: "3px solid #fff",
          boxShadow:
            "0 0 0 1px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(0, 0, 0, 0.1)",
          cursor: "pointer",
        }}
        onClick={() => toggleOpen(true)}
      />
      {isOpen && (
        // Popover
        <Box
          sx={{
            position: "absolute",
            top: "calc(100% + 2px)",
            left: "0",
            borderRadius: "9px",
            boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
            zIndex: "999",
          }}
          ref={popover}
        >
          <HexColorPicker color={colour} onChange={onChange} />
        </Box>
      )}
    </Box>
  );
};

export default PopoverPicker;
