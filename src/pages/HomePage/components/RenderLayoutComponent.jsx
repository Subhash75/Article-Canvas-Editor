import { useDroppable } from "@dnd-kit/core";
import { useEffect, useRef, useState } from "react";
import { AiOutlineDrag } from "react-icons/ai";
import { FaAngleDown, FaChevronUp } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import RenderGalleryComponent from "./RenderGalleryComponent";
import RenderImageComponent from "./RenderImageComponent";
import RenderTextComponent from "./RenderTextComponent";
import RenderVideoComponent from "./RenderVideoComponent";

const TwoColumnLayout = ({ layoutId, columnId, child, setDroppedItems }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: `twoColumn-${layoutId}-${columnId}`,
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex-1 bg-[#F5FAFF] border border-[#EAEAEA] ${
        isOver ? "border-blue-500 bg-blue-50" : "border-gray-300"
      }`}
    >
      {child?.map((value) => {
        if (value.value === "Image") {
          return <RenderImageComponent key={value.id} />;
        } else if (value.value === "Gallery") {
          return <RenderGalleryComponent key={value.id} />;
        } else if (value.value === "Video") {
          return <RenderVideoComponent key={value.id} />;
        }
        return (
          <RenderTextComponent
            key={value.id}
            id={value.id}
            value={value.value}
            layoutId={layoutId}
            columnId={columnId}
            layoutType="two-column"
            setDroppedItems={setDroppedItems}
          />
        );
      })}
    </div>
  );
};

const RenderLayoutComponent = ({
  item,
  id,
  index,
  child,
  setDroppedItems,
  handleLayoutRearrange,
  handleLayoutDelete,
}) => {
  console.log(id);
  const { setNodeRef, isOver } = useDroppable({ id: `layout-${id}` });
  const [isFocused, setIsFocused] = useState(false);

  const layoutRef = useRef(null);
  const controlRef = useRef(null);

  const handleFocus = () => {
    setIsFocused(true);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        layoutRef.current?.contains(e.target) ||
        controlRef.current?.contains(e.target)
      ) {
        return;
      }

      setIsFocused(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  switch (item) {
    case "1 Column":
      return (
        <div
          key={id}
          ref={setNodeRef}
          onFocus={handleFocus}
          className={`h-[77px] bg-[#F5FAFF] p-4 my-10 relative ${
            isOver ? "border-blue-500 bg-blue-50" : "border-gray-300"
          } ${child.length === 0 ? "border border-[#EAEAEA]" : ""}`}
        >
          {(isFocused || child.length === 0) && (
            <div
              ref={controlRef}
              className="layout-controls absolute top-0 -translate-y-1/2 right-10 rounded-lg bg-[#F5FAFF] w-36 h-12 border border-[#EAEAEA] border-b-0 flex px-2 gap-x-3 "
            >
              <FaChevronUp
                size={22}
                className="cursor-pointer"
                onClick={() =>
                  handleLayoutRearrange({ index, type: "move-up" })
                }
              />
              <FaAngleDown
                size={22}
                className="cursor-pointer"
                onClick={() =>
                  handleLayoutRearrange({ index, type: "move-down" })
                }
              />
              <IoSettingsOutline size={22} className="cursor-pointer" />
              <AiOutlineDrag size={22} className="cursor-pointer" />
              <RiDeleteBin6Line
                size={22}
                className="cursor-pointer"
                onClick={() => handleLayoutDelete({ id })}
              />
            </div>
          )}
          <div
            ref={layoutRef}
            className={`absolute inset-0  ${
              child.length === 0 ? "bg-[#F5FAFF]" : "bg-white"
            }`}
          >
            {child.map((value) => {
              if (value.value === "Image") {
                return <RenderImageComponent key={value.id} />;
              } else if (value.value === "Gallery") {
                return <RenderGalleryComponent key={value.id} />;
              } else if (value.value === "Video") {
                return <RenderVideoComponent key={value.id} />;
              }
              return (
                <RenderTextComponent
                  id={value.id}
                  value={value.value}
                  key={value.id}
                  layoutId={id}
                  setDroppedItems={setDroppedItems}
                />
              );
            })}
          </div>
        </div>
      );

    case "2 Column":
      return (
        <div
          key={id}
          className={`my-10 relative flex justify-between gap-4 h-[350px]`}
          onFocus={handleFocus}
        >
          {isFocused ||
            (child.length === 0 && (
              <div
                ref={controlRef}
                className="absolute top-0 -translate-y-1/2 right-10 rounded-lg bg-[#F5FAFF] w-36 h-12 border border-[#EAEAEA] border-b-0 flex px-2 gap-x-3"
              >
                <FaChevronUp
                  size={22}
                  className="cursor-pointer"
                  onClick={() =>
                    handleLayoutRearrange({ index, type: "move-up" })
                  }
                />
                <FaAngleDown
                  size={22}
                  className="cursor-pointer"
                  onClick={() =>
                    handleLayoutRearrange({ index, type: "move-down" })
                  }
                />
                <IoSettingsOutline size={22} className="cursor-pointer" />
                <AiOutlineDrag size={22} className="cursor-pointer" />
                <RiDeleteBin6Line
                  size={22}
                  className="cursor-pointer"
                  onClick={() => handleLayoutDelete({ id })}
                />{" "}
              </div>
            ))}
          <div
            ref={layoutRef}
            className="absolute inset-0 z-10 flex justify-between gap-4"
          >
            <TwoColumnLayout
              layoutId={id}
              columnId={1}
              child={child?.[0] ?? []}
              setDroppedItems={setDroppedItems}
            />
            <TwoColumnLayout
              layoutId={id}
              columnId={2}
              child={child?.[1] ?? []}
              setDroppedItems={setDroppedItems}
            />
          </div>
        </div>
      );

    case "Container":
      return (
        <div
          key={id}
          ref={setNodeRef}
          onFocus={handleFocus}
          className={`h-[350px] border border-[#EAEAEA] p-4 my-5 bg-[#F5FAFF] relative ${
            isOver ? "border-blue-500 bg-blue-50" : "border-gray-300"
          }`}
        >
          {isFocused ||
            (child.length === 0 && (
              <div
                ref={controlRef}
                className="absolute top-0 -translate-y-1/2 right-10 rounded-lg bg-[#F5FAFF] w-36 h-12 border border-[#EAEAEA] border-b-0 flex px-2 gap-x-3"
              >
                <FaChevronUp
                  size={22}
                  className="cursor-pointer"
                  onClick={() =>
                    handleLayoutRearrange({ index, type: "move-up" })
                  }
                />
                <FaAngleDown
                  size={22}
                  className="cursor-pointer"
                  onClick={() =>
                    handleLayoutRearrange({ index, type: "move-down" })
                  }
                />
                <IoSettingsOutline size={22} className="cursor-pointer" />
                <AiOutlineDrag size={22} className="cursor-pointer" />
                <RiDeleteBin6Line
                  size={22}
                  className="cursor-pointer"
                  onClick={() => handleLayoutDelete({ id })}
                />
              </div>
            ))}
          <div ref={layoutRef} className="absolute inset-0 bg-[#F5FAFF] z-10">
            {child.map((value) => {
              if (value.value === "Image") {
                return <RenderImageComponent key={value.id} />;
              } else if (value.value === "Gallery") {
                return <RenderGalleryComponent key={value.id} />;
              } else if (value.value === "Video") {
                return <RenderVideoComponent key={value.id} />;
              }
              return (
                <RenderTextComponent
                  id={value.id}
                  value={value.value}
                  key={value.id}
                  layoutId={id}
                  setDroppedItems={setDroppedItems}
                />
              );
            })}
          </div>
        </div>
      );

    case "Divider":
      return (
        <div
          key={id}
          className="h-10 mt-10 border-t border-[#EAEAEA] w-full relative"
        >
          <div className="absolute inset-0 bg-white z-10"></div>
          <div className="absolute top-0 -translate-y-1/2 right-10 rounded-lg w-28 h-12 border border-[#EAEAEA] border-b-0 flex px-2 gap-x-3">
            <FaChevronUp
              size={22}
              className="cursor-pointer"
              onClick={() => handleLayoutRearrange({ index, type: "move-up" })}
            />
            <FaAngleDown
              size={22}
              className="cursor-pointer"
              onClick={() =>
                handleLayoutRearrange({ index, type: "move-down" })
              }
            />
            <AiOutlineDrag size={22} className="cursor-pointer" />
            <RiDeleteBin6Line
              size={22}
              className="cursor-pointer"
              onClick={() => handleLayoutDelete({ id })}
            />
          </div>
        </div>
      );

    default:
      return null;
  }
};

export default RenderLayoutComponent;
