import { useDroppable } from "@dnd-kit/core";
import RenderTextComponent from "./RenderTextComponent";

const RenderLayoutComponent = ({
  item,
  id,
  handleLayoutRearrange,
  index,
  child,
}) => {
  const { setNodeRef, isOver } = useDroppable({ id: `layout-${id}` });

  switch (item) {
    case "1 Column":
      return (
        <div
          key={id}
          ref={setNodeRef}
          className={`h-[77px] bg-[#F5FAFF] border border-[#EAEAEA] p-4 my-10 relative ${
            isOver ? "border-blue-500 bg-blue-50" : "border-gray-300"
          }`}
        >
          <div className="absolute top-0 -translate-y-1/2 right-10 rounded-lg bg-[#F5FAFF] w-32 h-12 border border-[#EAEAEA] border-b-0 flex px-2 gap-x-3">
            <p
              onClick={() => handleLayoutRearrange({ index, type: "move-up" })}
            >
              U
            </p>
            <p
              onClick={() =>
                handleLayoutRearrange({ index, type: "move-down" })
              }
            >
              D
            </p>
          </div>
          <div className="absolute inset-0 bg-[#F5FAFF] z-10 px-3">
            {child.map(RenderTextComponent)}
          </div>
        </div>
      );

    case "2 Column":
      return (
        <div
          key={id}
          className="my-10 relative flex justify-between gap-4 h-[350px]"
        >
          <div className="absolute top-0 -translate-y-1/2 right-10 rounded-lg bg-[#F5FAFF] w-32 h-12 border border-[#EAEAEA] border-b-0 flex px-2 gap-x-3">
            <p
              onClick={() => handleLayoutRearrange({ index, type: "move-up" })}
            >
              U
            </p>
            <p
              onClick={() =>
                handleLayoutRearrange({ index, type: "move-down" })
              }
            >
              D
            </p>
          </div>
          <div className="absolute inset-0 flex justify-between gap-4">
            <div
              contentEditable={true}
              className="flex-1 bg-[#F5FAFF] border border-[#EAEAEA]"
            ></div>
            <div
              contentEditable={true}
              className="flex-1 bg-[#F5FAFF] border border-[#EAEAEA]"
            ></div>
          </div>
        </div>
      );

    case "Container":
      return (
        <div
          contentEditable={true}
          key={id}
          className="h-[350px] border border-[#EAEAEA] p-4 my-5 bg-[#F5FAFF] relative"
        >
          <div className="absolute top-0 -translate-y-1/2 right-10 rounded-lg bg-[#F5FAFF] w-32 h-12 border border-[#EAEAEA] border-b-0 flex px-2 gap-x-3">
            <p
              onClick={() => handleLayoutRearrange({ index, type: "move-up" })}
            >
              U
            </p>
            <p
              onClick={() =>
                handleLayoutRearrange({ index, type: "move-down" })
              }
            >
              D
            </p>
          </div>
          <div className="absolute inset-0 bg-[#F5FAFF] z-10"></div>
        </div>
      );

    case "Divider":
      return (
        <div
          key={id}
          className="h-10 mt-10 border-t border-[#EAEAEA] w-full relative"
        >
          <div className="absolute inset-0 bg-white z-10"></div>
          <div className="absolute top-0 -translate-y-1/2 right-10 rounded-lg w-32 h-12 border border-[#EAEAEA] border-b-0 flex px-2 gap-x-3">
            <p
              onClick={() => handleLayoutRearrange({ index, type: "move-up" })}
            >
              U
            </p>
            <p
              onClick={() =>
                handleLayoutRearrange({ index, type: "move-down" })
              }
            >
              D
            </p>
          </div>
        </div>
      );

    default:
      return null;
  }
};

export default RenderLayoutComponent;
