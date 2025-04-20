import React from "react";

function PreviewModal({ isOpen, onClose, previewContent }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-[1100px] w-full relative">
        <div className="flex justify-between p-3 items-center shadow-lg">
          <h4 className="font-semibold text-xl">Preview</h4>
          <button onClick={onClose} className="text-3xl font-bold">
            &times;
          </button>
        </div>
        <div
          className="p-3 h-auto max-h-[400px] overflow-auto"
          dangerouslySetInnerHTML={{ __html: previewContent }}
        ></div>
      </div>
    </div>
  );
}

export default PreviewModal;
