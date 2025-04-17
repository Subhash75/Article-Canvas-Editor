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

    if (
      (over?.id === "editor-body" ||
        ["1 Column", "2 Column", "Container", "Divider"].includes(active.id)) &&
      !["Headline", "Sub-header", "Body"].includes(active.id)
    ) {
      //layout drop
      setDroppedItems((prev) => [
        ...prev,
        { id: Date.now(), value: active.id, children: [] },
      ]);
    } else if (over?.id?.startsWith("layout-")) {
      //text drop inside layout
      const id = +over.id.split("-")?.[1];

      if (typeof id === "number") {
        setDroppedItems((prev) => {
          const newItems = prev.map((value) => {
            if (value.id === id) {
              return {
                ...value,
                children: [{ id: Date.now(), value: active.id }],
              };
            } else {
              return value;
            }
          });

          return newItems;
        });
      }
    } else if (over?.id?.startsWith("twoColumn")) {
      const layoutId = +over.id.split("-")?.[1];
      const columnId = +over.id.split("-")?.[2] - 1;

      if (typeof layoutId === "number" && typeof columnId === "number") {
        setDroppedItems((prev) => {
          const newItems = prev.map((value) => {
            if (value.id === layoutId) {
              return {
                ...value,
                children: {
                  ...value.children,
                  [columnId]: [
                    {
                      id: Date.now(),
                      value: active.id,
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
      }
    }
  };

  console.log(droppedItems);

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
