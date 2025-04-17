import React from "react";

function Toolbar({ toolbarRef, applyStyle }) {
  return (
    <div
      ref={toolbarRef}
      className="absolute bottom-[-40px] left-0 bg-white border border-gray-300 rounded px-2 py-1 flex gap-2 z-20 shadow-md"
    >
      <button
        onClick={() => applyStyle("fontWeight", "bold")}
        className="text-sm"
      >
        Bold
      </button>
      <button
        onClick={() => applyStyle("fontWeight", "normal")}
        className="text-sm"
      >
        Normal
      </button>
      <select
        onChange={(e) => applyStyle("fontSize", e.target.value)}
        className="text-sm border border-gray-300 rounded"
      >
        <option value="16px">16px</option>
        <option value="20px">20px</option>
        <option value="24px">24px</option>
        <option value="32px">32px</option>
      </select>
    </div>
  );
}

export default Toolbar;
