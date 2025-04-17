import useToolbar from "../hooks/useToolbar.js";

const RenderTextComponent = ({ id, value }) => {
  const {
    toolbarRef,
    contentRef,
    showToolbar,
    applyStyle,
    handleFocus,
    handleBlur,
  } = useToolbar();

  switch (value) {
    case "Headline":
      return (
        <div
          key={id}
          className="relative group mb-4"
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          {showToolbar && (
            <Toolbar toolbarRef={toolbarRef} applyStyle={applyStyle} />
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
        <h3
          key={id}
          contentEditable={true}
          className="text-lg font-semibold h-full focus:outline-0 focus:border-0"
        >
          Sub-Header Text
        </h3>
      );

    case "Body":
      return (
        <p
          key={id}
          contentEditable={true}
          className="text-base h-full focus:outline-0 focus:border-0"
        >
          Body Text
        </p>
      );

    default:
      return <div key={id}>Type Here...</div>;
  }
};

export default RenderTextComponent;
