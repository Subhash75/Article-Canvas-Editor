import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import ActionButton from "./components/ActionButton";
import EditorBody from "./components/EditorBody";
import { DndContext } from "@dnd-kit/core";

function HomePage() {
  const [droppedItems, setDroppedItems] = useState([]);

  const handleDragEnd = (event) => {
    const { over, active } = event;

    if (over?.id === "editor-body") {
      setDroppedItems((prev) => [...prev, active.id]);
    }
  };
  return (
    <DndContext onDragEnd={handleDragEnd}>
      <Navbar />
      <Sidebar />
      <div className="ml-[238px] bg-gray-100 h-[calc(100vh-60px)]">
        <ActionButton />
        <EditorBody items={droppedItems} />
      </div>
    </DndContext>
  );
}

export default HomePage;
