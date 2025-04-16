import { useRef, useState } from "react";

function cloneWithInlineStyles(element) {
  const clone = element.cloneNode(true);

  const process = (sourceElem, clonedElem) => {
    const computed = window.getComputedStyle(sourceElem);
    const style = Array.from(computed)
      .map((key) => {
        return `${key}: ${computed.getPropertyValue(key)};`;
      })
      .join(" ");
    clonedElem.setAttribute("style", style);
    clonedElem.removeAttribute("class");

    Array.from(sourceElem.children).forEach((child, index) => {
      process(child, clonedElem.children[index]);
    });
  };

  process(element, clone);
  return clone;
}

function useHomePage() {
  const [droppedItems, setDroppedItems] = useState([]);

  const layoutRef = useRef(null);

  const handleDragEnd = (event) => {
    const { over, active } = event;
    console.log({ over, event });

    if (over?.id === "editor-body") {
      setDroppedItems((prev) => [
        ...prev,
        { id: Date.now(), value: active.id },
      ]);
    }
  };

  const handleConvertToHTML = () => {
    const element = layoutRef.current;
    if (!element) return;

    const cloned = cloneWithInlineStyles(element);
    const html = `<!DOCTYPE html>\n<html>\n<body>\n${cloned.outerHTML}\n</body>\n</html>`;

    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "layout.html";
    a.click();
  };

  const handleLayoutRearrange = ({ index, type }) => {
    if (type === "move-up") {
      if (index === 0) return null;
      else {
        setDroppedItems((prev) => {
          const tempItems = [...prev];
          [tempItems[index], tempItems[index - 1]] = [
            tempItems[index - 1],
            tempItems[index],
          ];

          return tempItems;
        });
      }
    } else if (type === "move-down") {
      if (index === droppedItems.length - 1) return null;
      else {
        setDroppedItems((prev) => {
          const tempItems = [...prev];
          [tempItems[index], tempItems[index + 1]] = [
            tempItems[index + 1],
            tempItems[index],
          ];

          return tempItems;
        });
      }
    }
  };

  return {
    droppedItems,
    layoutRef,
    handleDragEnd,
    handleConvertToHTML,
    handleLayoutRearrange,
  };
}

export default useHomePage;
