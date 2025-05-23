import React from "react";
import {
  CiTextAlignCenter,
  CiTextAlignJustify,
  CiTextAlignLeft,
  CiTextAlignRight,
} from "react-icons/ci";
import Select from "../../../components/Select";
import StyleButton from "../../../components/ToolbarButton";
import {
  availableFontFamilies,
  availableFontSize,
  availableFontUnits,
} from "../HomePage.constants";

function Toolbar({ styles, toolbarRef, applyStyle, handleStyleChange }) {
  return (
    <div
      ref={toolbarRef}
      className="absolute top-3/4 left-0 bg-white  border rounded px-2 py-1 flex flex-col items-center gap-2 z-20 shadow-md"
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

      <div className="w-full mt-1 flex justify-center gap-5">
        <StyleButton
          styleKey="justifyContent"
          styleValue="flex-start"
          applyStyle={applyStyle}
        >
          <CiTextAlignLeft size={24} />
        </StyleButton>
        <StyleButton
          styleKey="justifyContent"
          styleValue="center"
          applyStyle={applyStyle}
        >
          <CiTextAlignCenter size={24} />
        </StyleButton>
        <StyleButton
          styleKey="justifyContent"
          styleValue="flex-end"
          applyStyle={applyStyle}
        >
          <CiTextAlignRight size={24} />
        </StyleButton>
        <StyleButton
          styleKey="alignItems"
          styleValue="flex-start"
          applyStyle={applyStyle}
          className="-mt-3"
        >
          <CiTextAlignJustify size={24} />
        </StyleButton>
        <StyleButton
          styleKey="alignItems"
          styleValue="center"
          applyStyle={applyStyle}
        >
          <CiTextAlignJustify size={24} />
        </StyleButton>
        <StyleButton
          styleKey="alignItems"
          styleValue="flex-end"
          applyStyle={applyStyle}
          className="mt-3"
        >
          <CiTextAlignJustify size={24} />
        </StyleButton>
      </div>
    </div>
  );
}

export default Toolbar;
