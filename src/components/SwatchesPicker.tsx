import { Box } from "@mui/material";
import { useCallback, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";
import useClickOutside from "../hooks/useClickOutside";

const SwatchesPicker = ({ colour, onChange, presetColours }) => {
  const popover = useRef();
  const [isOpen, toggleOpen] = useState(false);

  const close = useCallback(() => toggleOpen(false), []);
  useClickOutside(popover, close);
  return (
    <Box>
      {/* <HexColorPicker color={colour} onChange={onChange} /> */}
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
        <Box
          ref={popover}
          sx={{ display: "flex", padding: "12px", flexWrap: "wrap" }}
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
              onClick={() => onChange(presetColour)}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default SwatchesPicker;
