import { DndContext } from "@dnd-kit/core";
import React from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import ActionButton from "./components/ActionButton";
import EditorBody from "./components/EditorBody";
import useHomePage from "./useHomePage";

function HomePage() {
  const {
    droppedItems,
    layoutRef,
    setDroppedItems,
    handleDragEnd,
    handleConvertToHTML,
    handleLayoutRearrange,
  } = useHomePage();

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <Navbar />
      <Sidebar />
      <div className="ml-[238px] bg-gray-100 h-[calc(100vh-60px)]">
        <ActionButton handleConvertToHTML={handleConvertToHTML} />
        <EditorBody
          items={droppedItems}
          setDroppedItems={setDroppedItems}
          layoutRef={layoutRef}
          handleLayoutRearrange={handleLayoutRearrange}
        />
      </div>
    </DndContext>
  );
}

export default HomePage;
