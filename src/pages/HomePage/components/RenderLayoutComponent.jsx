import { useDroppable } from "@dnd-kit/core";
import RenderGalleryComponent from "./RenderGalleryComponent";
import RenderImageComponent from "./RenderImageComponent";
import RenderTextComponent from "./RenderTextComponent";
import RenderVideoComponent from "./RenderVideoComponent";

const TwoColumnLayout = ({ layoutId, columnId, child }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: `twoColumn-${layoutId}-${columnId}`,
  });

  return (
    <div
      // contentEditable={true}
      // suppressContentEditableWarning={true}
      ref={setNodeRef}
      className={`flex-1 bg-[#F5FAFF] border border-[#EAEAEA] ${
        isOver ? "border-blue-500 bg-blue-50" : "border-gray-300"
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
            key={value.id}
            id={value.id}
            value={value.value}
          />
        );
      })}
    </div>
  );
};

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
            {child.map((value) => {
              return (
                <RenderTextComponent
                  id={value.id}
                  value={value.value}
                  key={value.id}
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
          <div className="absolute inset-0 z-10 flex justify-between gap-4">
            <TwoColumnLayout
              layoutId={id}
              columnId={1}
              child={child?.[0] ?? []}
            />
            <TwoColumnLayout
              layoutId={id}
              columnId={2}
              child={child?.[1] ?? []}
            />
          </div>
        </div>
      );

    case "Container":
      return (
        <div
          key={id}
          ref={setNodeRef}
          contentEditable={true}
          className={`h-[350px] border border-[#EAEAEA] p-4 my-5 bg-[#F5FAFF] relative ${
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
          <div className="absolute inset-0 bg-[#F5FAFF] z-10  px-3">
            {child.map((value) => {
              return (
                <RenderTextComponent
                  id={value.id}
                  value={value.value}
                  key={value.id}
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
