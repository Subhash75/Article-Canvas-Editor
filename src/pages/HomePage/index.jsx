import React from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import ActionButton from "./components/ActionButton";
import EditorBody from "./components/EditorBody";

function HomePage() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="ml-[238px] bg-gray-100 h-[calc(100vh-60px)]">
        <ActionButton />
        <EditorBody />
      </div>
    </>
  );
}

export default HomePage;
