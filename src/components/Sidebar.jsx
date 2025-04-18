import { useDraggable } from "@dnd-kit/core";
import { useState } from "react";

const sidebarConfig = [
  {
    title: "Text",
    items: ["Headline", "Sub-header", "Body"],
  },
  {
    title: "Media",
    items: ["Image", "Gallery", "Video"],
  },
  {
    title: "Layouts",
    items: ["1 Column", "2 Column", "Container", "Divider"],
  },
];

const DraggableItem = ({ id }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({ id });

  return (
    <li
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="pl-2 py-3 list-disc cursor-move"
    >
      {id}
    </li>
  );
};

const Sidebar = () => {
  const [openSection, setOpenSection] = useState("Layouts");

  const toggleSection = (sectionTitle) => {
    setOpenSection((prev) => (prev === sectionTitle ? "" : sectionTitle));
  };

  return (
    <div className="w-[238px] bg-white border-r text-sm py-3 fixed left-0 right-0 top-[60px] h-screen">
      <h2 className="p-3 font-semibold text-sm text-[#171717]">COMPONENTS</h2>

      {sidebarConfig.map((section) => (
        <div key={section.title}>
          <ul className="px-3">
            <li
              onClick={() => toggleSection(section.title)}
              className="w-full text-sm py-3 font-medium text-[#4B4B4B] border-t border-[#EAEAEA] cursor-pointer"
            >
              {section.title}
            </li>
          </ul>

          {openSection === section.title && (
            <ul
              className={`pl-8 py-1 space-y-1 bg-[#F5FAFF] font-medium text-[#4B4B4B] ${
                section.items.length ? "py-2 rounded-sm" : ""
              }`}
            >
              {section.items.length > 0 ? (
                section.items.map((item) => (
                  <DraggableItem key={item} id={item} />
                ))
              ) : (
                <li className="text-gray-500">No items</li>
              )}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
