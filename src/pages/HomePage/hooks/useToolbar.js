import { useRef, useState } from "react";

function useToolbar() {
  const [showToolbar, setShowToolbar] = useState(false);
  const [styles, setStyles] = useState();
  const contentRef = useRef(null);
  const toolbarRef = useRef(null);

  const handleStyleChange = (property, value) => {
    setStyles((prev) => ({ ...prev, [property]: value }));
    applyStyle(property, value);
  };

  const applyStyle = (styleType, value) => {
    const el = contentRef.current;
    if (!el) return;

    el.style[styleType] = value;
  };

  const handleFocus = () => {
    setShowToolbar(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      if (
        toolbarRef.current &&
        toolbarRef.current.contains(document.activeElement)
      ) {
        // Keep the toolbar open if focus moved to it
        return;
      }
      setShowToolbar(false);
    }, 100);
  };

  return {
    toolbarRef,
    contentRef,
    showToolbar,
    styles,
    applyStyle,
    handleFocus,
    handleBlur,
    handleStyleChange,
  };
}

export default useToolbar;
