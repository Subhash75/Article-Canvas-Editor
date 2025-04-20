import { useEffect, useState } from "react";
import Select from "../../../components/Select.jsx";
import { availableFontFamilies } from "../HomePage.constants.js";
import useToolbar from "../hooks/useToolbar.js";
import Toolbar from "./Toolbar.jsx";

const TextProperties = ({
  styles,
  layoutId,
  setDroppedItems,
  layoutType,
  columnId,
  handleStyleChange,
  handleShowImageProperties,
}) => {
  const [activeTab, setActiveTab] = useState("Content");

  const handleTextTypeChange = (newValue) => {
    if (layoutType === "two-column") {
      setDroppedItems((prev) => {
        const newItems = prev.map((value) => {
          if (value.id === layoutId) {
            return {
              ...value,
              children: {
                ...value.children,
                [columnId - 1]: [
                  {
                    id: Date.now(),
                    value: newValue,
                  },
                ],
              },
            };
          } else {
            return value;
          }
        });

        return newItems;
      });
    } else {
      setDroppedItems((prevValue) => {
        const newItems = prevValue.map((value) => {
          if (value.id === layoutId) {
            return {
              ...value,
              children: [{ id: Date.now(), value: newValue }],
            };
          } else {
            return value;
          }
        });

        return newItems;
      });
    }
  };

  return (
    <div
      className={`absolute top-0 right-0 z-20 bg-white w-[317px] rounded-lg shadow-lg text-properties-container-${columnId}`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between px-3 py-5 bg-[#F6F6F6] rounded-tl-lg rounded-tr-lg">
        <h3 className="text-[15px] font-semibold">Text Properties</h3>
        <p
          className="cursor-pointer"
          onClick={(e) => handleShowImageProperties(e, false)}
        >
          X
        </p>
      </div>

      <div className="px-3 py-5">
        <div className="flex gap-x-3 border-b">
          <p
            onClick={() => setActiveTab("Content")}
            className={`text-[15px] font-medium ${
              activeTab === "Content"
                ? "border-b-4 border-primary text-primary"
                : ""
            }`}
          >
            Content
          </p>
          <p
            onClick={() => setActiveTab("Style")}
            className={`text-[15px] font-medium ${
              activeTab === "Style"
                ? "border-b-4 border-primary text-primary"
                : ""
            }`}
          >
            Style
          </p>
        </div>

        {activeTab === "Content" && (
          <>
            <div className="flex justify-between items-center px-3 py-2 mt-2">
              <p className="text-[13px] font-medium">Type</p>
              <Select
                options={["Headline", "Sub-header", "Body"]}
                className="w-[148px] h-[33px]"
                onChange={handleTextTypeChange}
              />
            </div>

            <div className="flex justify-between items-center px-3 py-2">
              <p className="text-[13px] font-medium">Link</p>
              <Select options={["None"]} className="w-[148px] h-[33px]" />
            </div>
          </>
        )}

        {activeTab === "Style" && (
          <>
            <div className="flex justify-between items-center px-3 py-2 mt-2">
              <p className="text-[13px] font-medium">Width</p>
              <div className="w-[148px] flex gap-x-2">
                <input className="border-2 rounded-md w-[122px]" />
                <p>pt</p>
              </div>
            </div>

            <div className="flex justify-between items-center px-3 py-2">
              <p className="text-[13px] font-medium">Font Family</p>
              <Select
                className="w-[148px] h-[33px]"
                value={styles?.["fontFamily"]}
                options={availableFontFamilies}
                onChange={(value) => handleStyleChange("fontFamily", value)}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const RenderTextComponent = ({
  id,
  value,
  layoutId,
  columnId,
  layoutType,
  setDroppedItems,
}) => {
  const {
    toolbarRef,
    contentRef,
    showToolbar,
    styles,
    applyStyle,
    handleFocus,
    handleBlur,
    handleStyleChange,
  } = useToolbar();

  const [showImageProperties, setShowImageProperties] = useState(true);

  const handleShowImageProperties = (e, open) => {
    e.stopPropagation();
    setShowImageProperties(open);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (e.target.closest(`.text-properties-container-${columnId}`)) return;
      setShowImageProperties(false);
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  switch (value) {
    case "Headline":
      return (
        <>
          <div
            key={id}
            className="relative group h-full"
            onFocus={handleFocus}
            onBlur={handleBlur}
            onClick={(e) => handleShowImageProperties(e, true)}
          >
            {showToolbar && (
              <Toolbar
                styles={styles}
                toolbarRef={toolbarRef}
                applyStyle={applyStyle}
                handleStyleChange={handleStyleChange}
              />
            )}
            <h1
              ref={contentRef}
              contentEditable={true}
              suppressContentEditableWarning={true}
              className="text-2xl font-bold h-full flex focus:outline-none"
            >
              Headline Text
            </h1>
          </div>

          {showImageProperties && (
            <TextProperties
              styles={styles}
              layoutId={layoutId}
              columnId={columnId}
              layoutType={layoutType}
              setDroppedItems={setDroppedItems}
              handleStyleChange={handleStyleChange}
              handleShowImageProperties={handleShowImageProperties}
            />
          )}
        </>
      );

    case "Sub-header":
      return (
        <>
          <div
            key={id}
            className="relative group h-full"
            onFocus={handleFocus}
            onBlur={handleBlur}
            onClick={(e) => handleShowImageProperties(e, true)}
          >
            {showToolbar && (
              <Toolbar
                styles={styles}
                toolbarRef={toolbarRef}
                applyStyle={applyStyle}
                handleStyleChange={handleStyleChange}
              />
            )}
            <h3
              ref={contentRef}
              contentEditable={true}
              suppressContentEditableWarning={true}
              className="text-lg font-bold h-full flex focus:outline-none"
            >
              Sub-Header Text
            </h3>
          </div>

          {showImageProperties && (
            <TextProperties
              styles={styles}
              layoutId={layoutId}
              columnId={columnId}
              layoutType={layoutType}
              setDroppedItems={setDroppedItems}
              handleStyleChange={handleStyleChange}
              handleShowImageProperties={handleShowImageProperties}
            />
          )}
        </>
      );

    case "Body":
      return (
        <>
          <div
            key={id}
            className="relative group h-full"
            onFocus={handleFocus}
            onBlur={handleBlur}
            onClick={(e) => handleShowImageProperties(e, true)}
          >
            {showToolbar && (
              <Toolbar
                styles={styles}
                toolbarRef={toolbarRef}
                applyStyle={applyStyle}
                handleStyleChange={handleStyleChange}
              />
            )}
            <p
              ref={contentRef}
              contentEditable={true}
              suppressContentEditableWarning={true}
              className="text-base h-full flex focus:outline-none"
            >
              Body Text
            </p>
          </div>

          {showImageProperties && (
            <TextProperties
              styles={styles}
              layoutId={layoutId}
              columnId={columnId}
              layoutType={layoutType}
              setDroppedItems={setDroppedItems}
              handleStyleChange={handleStyleChange}
              handleShowImageProperties={handleShowImageProperties}
            />
          )}
        </>
      );

    default:
      return <div key={id}>Type Here...</div>;
  }
};

export default RenderTextComponent;
