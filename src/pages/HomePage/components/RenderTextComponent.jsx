import useToolbar from "../hooks/useToolbar.js";
import Toolbar from "./Toolbar.jsx";

const RenderTextComponent = ({ id, value }) => {
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

  switch (value) {
    case "Headline":
      return (
        <div
          key={id}
          className="relative group h-full"
          onFocus={handleFocus}
          onBlur={handleBlur}
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
            className="text-2xl font-bold h-full focus:outline-none"
          >
            Headline Text
          </h1>
        </div>
      );

    case "Sub-header":
      return (
        <div
          key={id}
          className="relative group h-full"
          onFocus={handleFocus}
          onBlur={handleBlur}
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
            className="text-lg font-bold h-full focus:outline-none"
          >
            Sub-Header Text
          </h3>
        </div>
      );

    case "Body":
      return (
        <div
          key={id}
          className="relative group h-full"
          onFocus={handleFocus}
          onBlur={handleBlur}
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
            className="text-base h-full focus:outline-none"
          >
            Body Text
          </p>
        </div>
      );

    default:
      return <div key={id}>Type Here...</div>;
  }
};

export default RenderTextComponent;
