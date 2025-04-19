import { useDroppable } from "@dnd-kit/core";
import RenderLayoutComponent from "./RenderLayoutComponent";

function EditorBody({
  items,
  setDroppedItems,
  layoutRef,
  handleLayoutRearrange,
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: "editor-body",
  });

  return (
    <div
      ref={layoutRef}
      className="bg-white h-[calc(100%-80px)] w-[1000px] mx-auto mt-5 p-4 border overflow-auto"
    >
      <div
        ref={setNodeRef}
        className={`h-full ${
          isOver ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
      >
        {items.map((value, index) => (
          <RenderLayoutComponent
            key={value.id}
            index={index}
            item={value.value}
            id={value.id}
            child={value.children}
            setDroppedItems={setDroppedItems}
            handleLayoutRearrange={handleLayoutRearrange}
          />
        ))}
      </div>
    </div>
  );
}

export default EditorBody;
