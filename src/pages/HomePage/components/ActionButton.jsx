import React from "react";

function ActionButton() {
  return (
    <div className="w-[1000px] mx-auto bg-primary flex justify-between rounded-bl-xl rounded-br-xl p-3 font-semibold text-white text-sm">
      <p>Article Manager</p>
      <p>Article Navigator</p>
      <p>Download HTML</p>
      <p className="text-[#FFCF0E]">SAVE</p>
    </div>
  );
}

export default ActionButton;
