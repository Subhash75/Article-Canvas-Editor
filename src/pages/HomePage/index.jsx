import { DndContext } from "@dnd-kit/core";
import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import ActionButton from "./components/ActionButton";
import EditorBody from "./components/EditorBody";

function HomePage() {
  const [droppedItems, setDroppedItems] = useState([]);

  console.log(droppedItems);

  const handleDragEnd = (event) => {
    const { over, active } = event;

    if (over?.id === "editor-body") {
      setDroppedItems((prev) => [
        ...prev,
        { id: Date.now(), value: active.id },
      ]);
    }
  };

  const handleLayoutRearrange = ({ id, index, type }) => {
    console.log({ id, index, type });
    if (type === "move-up") {
      if (index === 0) return null;
      else {
        setDroppedItems((prev) => {
          const tempItems = [...prev];
          [tempItems[index], tempItems[index - 1]] = [
            tempItems[index - 1],
            tempItems[index],
          ];

          return tempItems;
        });
      }
    } else if (type === "move-down") {
      if (index === droppedItems.length - 1) return null;
      else {
        setDroppedItems((prev) => {
          const tempItems = [...prev];
          [tempItems[index], tempItems[index + 1]] = [
            tempItems[index + 1],
            tempItems[index],
          ];

          return tempItems;
        });
      }
    }
    console.log({ id, index });
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <Navbar />
      <Sidebar />
      <div className="ml-[238px] bg-gray-100 h-[calc(100vh-60px)]">
        <ActionButton />
        <EditorBody
          items={droppedItems}
          handleLayoutRearrange={handleLayoutRearrange}
        />
      </div>
    </DndContext>
  );
}

export default HomePage;
