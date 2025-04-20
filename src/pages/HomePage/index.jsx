import { DndContext } from "@dnd-kit/core";
import React from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import ActionButton from "./components/ActionButton";
import EditorBody from "./components/EditorBody";
import PreviewModal from "./components/PreviewModal";
import useHomePage from "./useHomePage";

function HomePage() {
  const {
    droppedItems,
    layoutRef,
    isModalOpen,
    previewContent,
    handleOpen,
    handleClose,
    setDroppedItems,
    handleDragEnd,
    handleConvertToHTML,
    handleLayoutRearrange,
    handleLayoutDelete,
  } = useHomePage();

  return (
    <>
      <DndContext onDragEnd={handleDragEnd}>
        <Navbar />
        <Sidebar />
        <div className="ml-[238px] bg-gray-100 h-[calc(100vh-60px)]">
          <ActionButton
            handleOpen={handleOpen}
            handleConvertToHTML={handleConvertToHTML}
          />
          <EditorBody
            items={droppedItems}
            setDroppedItems={setDroppedItems}
            layoutRef={layoutRef}
            handleLayoutRearrange={handleLayoutRearrange}
            handleLayoutDelete={handleLayoutDelete}
          />
        </div>
      </DndContext>

      <PreviewModal
        isOpen={isModalOpen}
        onClose={handleClose}
        previewContent={previewContent}
      />
    </>
  );
}

export default HomePage;
