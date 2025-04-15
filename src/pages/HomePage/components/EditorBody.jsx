import { useDroppable } from "@dnd-kit/core";
import React from "react";

function EditorBody({ items }) {
  const { setNodeRef, isOver } = useDroppable({
    id: "editor-body",
  });

  return (
    <div
      ref={setNodeRef}
      className={`bg-white h-[calc(100%-80px)] w-[1000px] mx-auto mt-5 p-4 border ${
        isOver ? "border-blue-500 bg-blue-50" : "border-gray-300"
      }`}
    >
      {items.map((item, idx) => (
        <div
          contentEditable={true}
          key={idx}
          className="p-4 mb-3 border border-dashed border-gray-400 rounded"
        >
          {item}
        </div>
      ))}
    </div>
  );
}

export default EditorBody;
