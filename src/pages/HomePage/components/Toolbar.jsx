import React from "react";
import Select from "../../../components/Select";
import {
  availableFontFamilies,
  availableFontSize,
  availableFontUnits,
} from "../HomePage.constants";
import StyleButton from "../../../components/ToolbarButton";

function Toolbar({ styles, toolbarRef, applyStyle, handleStyleChange }) {
  return (
    <div
      ref={toolbarRef}
      className="absolute bottom-full left-0 bg-white rounded px-2 py-1 flex flex-col items-center gap-2 z-20 shadow-md"
    >
      <button className="bg-yellow-300 px-1 w-fit">A</button>

      <div className="w-full mt-1 flex gap-5">
        <Select
          value={styles?.["fontFamily"]}
          options={availableFontFamilies}
          onChange={(value) => handleStyleChange("fontFamily", value)}
        />
        <Select
          value={styles?.["fontSize"]}
          options={availableFontSize}
          onChange={(value) => handleStyleChange("fontSize", value)}
        />
        <Select options={availableFontUnits} onChange={() => {}} />

        <StyleButton
          styleKey="fontWeight"
          styleValue="bold"
          applyStyle={applyStyle}
          className="font-extrabold"
        >
          B
        </StyleButton>

        <StyleButton
          styleKey="fontStyle"
          styleValue="italic"
          applyStyle={applyStyle}
          className="italic"
        >
          I
        </StyleButton>

        <StyleButton
          styleKey="textDecoration"
          styleValue="underline"
          applyStyle={applyStyle}
          className="underline"
        >
          U
        </StyleButton>

        <StyleButton
          styleKey="textDecoration"
          styleValue="line-through"
          applyStyle={applyStyle}
          className="line-through"
        >
          S
        </StyleButton>

        <StyleButton
          styleKey="verticalAlign"
          styleValue="super"
          applyStyle={applyStyle}
        >
          X<sup>2</sup>
        </StyleButton>

        <StyleButton
          styleKey="verticalAlign"
          styleValue="sub"
          applyStyle={applyStyle}
        >
          X<sub>2</sub>
        </StyleButton>
      </div>
    </div>
  );
}

export default Toolbar;
