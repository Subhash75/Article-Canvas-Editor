import { useDraggable } from "@dnd-kit/core";
import { useState } from "react";
import { CiTextAlignLeft } from "react-icons/ci";
import { FaAngleDown, FaChevronUp } from "react-icons/fa";
import { GoFileMedia } from "react-icons/go";
import { TbLayoutDashboard } from "react-icons/tb";

const sidebarConfig = [
  {
    title: "Text",
    items: ["Headline", "Sub-header", "Body"],
    icon: <CiTextAlignLeft size={22} />,
  },
  {
    title: "Media",
    items: ["Image", "Gallery", "Video"],
    icon: <GoFileMedia size={22} />,
  },
  {
    title: "Layouts",
    items: ["1 Column", "2 Column", "Container", "Divider"],
    icon: <TbLayoutDashboard size={22} />,
  },
];

const DraggableItem = ({ id }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({ id });

  return (
    <li
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`pl-2 py-3 list-disc cursor-move ${
        id === "Headline"
          ? "text-[44px] font-semibold truncate w-[85%] relative pl-[18px] -ml-[14px]"
          : ""
      }`}
    >
      {id === "Headline" && (
        <div className="absolute top-1/2  left-0 bg-black w-[6px] h-[6px] rounded-full"></div>
      )}
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
              className="w-full flex gap-x-3 items-center text-sm py-3 font-medium text-[#4B4B4B] border-t border-[#EAEAEA] cursor-pointer"
            >
              {section.icon}
              <p>{section.title}</p>
              {openSection === section.title ? (
                <FaChevronUp className="ml-auto" size={16} />
              ) : (
                <FaAngleDown className="ml-auto" size={20} />
              )}
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
