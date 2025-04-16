import { useDroppable } from "@dnd-kit/core";
import React from "react";

const renderComponent = ({ item, id, handleLayoutRearrange, index }) => {
  switch (item) {
    case "1 Column":
      return (
        <div
          key={id}
          className="h-[77px] bg-[#F5FAFF] border border-[#EAEAEA] p-4 my-10 relative"
        >
          <div className="absolute top-0 -translate-y-1/2 right-10 rounded-lg bg-[#F5FAFF] w-32 h-12 border border-[#EAEAEA] border-b-0 flex px-2 gap-x-3">
            <p
              onClick={() =>
                handleLayoutRearrange({ id, index, type: "move-up" })
              }
            >
              U
            </p>
            <p
              onClick={() =>
                handleLayoutRearrange({ id, index, type: "move-down" })
              }
            >
              D
            </p>
          </div>
          <div className="absolute inset-0 bg-[#F5FAFF] z-10"></div>
        </div>
      );

    case "2 Column":
      return (
        <div
          key={id}
          className="my-10 relative flex justify-between gap-4 h-[350px]"
        >
          <div className="absolute top-0 -translate-y-1/2 right-10 rounded-lg bg-[#F5FAFF] w-32 h-12 border border-[#EAEAEA] border-b-0 flex px-2 gap-x-3">
            <p
              onClick={() =>
                handleLayoutRearrange({ id, index, type: "move-up" })
              }
            >
              U
            </p>
            <p
              onClick={() =>
                handleLayoutRearrange({ id, index, type: "move-down" })
              }
            >
              D
            </p>
          </div>
          <div className="absolute inset-0 flex justify-between gap-4">
            <div className="flex-1 bg-[#F5FAFF] border border-[#EAEAEA]"></div>
            <div className="flex-1 bg-[#F5FAFF] border border-[#EAEAEA]"></div>
          </div>
        </div>
      );

    case "Container":
      return (
        <div
          key={id}
          className="h-[350px] border border-[#EAEAEA] p-4 my-5 bg-[#F5FAFF] relative"
        >
          <div className="absolute top-0 -translate-y-1/2 right-10 rounded-lg bg-[#F5FAFF] w-32 h-12 border border-[#EAEAEA] border-b-0 flex px-2 gap-x-3">
            <p
              onClick={() =>
                handleLayoutRearrange({ id, index, type: "move-up" })
              }
            >
              U
            </p>
            <p
              onClick={() =>
                handleLayoutRearrange({ id, index, type: "move-down" })
              }
            >
              D
            </p>
          </div>
          <div className="absolute inset-0 bg-[#F5FAFF] z-10"></div>
        </div>
      );

    case "Divider":
      return (
        <div
          key={id}
          className="h-10 mt-10 border-t border-[#EAEAEA] w-full relative"
        >
          <div className="absolute inset-0 bg-white z-10"></div>
          <div className="absolute top-0 -translate-y-1/2 right-10 rounded-lg w-32 h-12 border border-[#EAEAEA] border-b-0 flex px-2 gap-x-3">
            <p
              onClick={() =>
                handleLayoutRearrange({ id, index, type: "move-up" })
              }
            >
              U
            </p>
            <p
              onClick={() =>
                handleLayoutRearrange({ id, index, type: "move-down" })
              }
            >
              D
            </p>
          </div>
        </div>
      );

    default:
      return null;
  }
};

function EditorBody({ items, handleLayoutRearrange }) {
  const { setNodeRef, isOver } = useDroppable({
    id: "editor-body",
  });

  return (
    <div
      ref={setNodeRef}
      className={`bg-white h-[calc(100%-80px)] w-[1000px] mx-auto mt-5 p-4 border overflow-auto ${
        isOver ? "border-blue-500 bg-blue-50" : "border-gray-300"
      }`}
    >
      {items.length === 0 ? (
        <div className="text-gray-400 text-center py-10">
          Drop components here
        </div>
      ) : (
        items.map((value, index) =>
          renderComponent({
            item: value.value,
            id: value.id,
            index,
            handleLayoutRearrange,
          })
        )
      )}
    </div>
  );
}

export default EditorBody;
