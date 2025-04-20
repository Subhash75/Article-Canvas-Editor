import { useRef, useState } from "react";

async function cloneWithInlineStyles(element) {
  const clone = element.cloneNode(true);

  const process = async (sourceElem, clonedElem) => {
    const computed = window.getComputedStyle(sourceElem);
    const style = Array.from(computed)
      .map((key) => `${key}: ${computed.getPropertyValue(key)};`)
      .join(" ");
    clonedElem.setAttribute("style", style);
    clonedElem.removeAttribute("class");

    if (sourceElem.tagName === "IMG") {
      await convertImageToBase64(sourceElem, clonedElem);
    }

    const children = Array.from(sourceElem.children);
    for (let i = 0; i < children.length; i++) {
      await process(children[i], clonedElem.children[i]);
    }
  };

  await process(element, clone);
  return clone;
}

async function convertImageToBase64(sourceImg, clonedImg) {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous"; // to deal with CORS issues
    img.src = sourceImg.src;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      try {
        const dataUrl = canvas.toDataURL("image/png");
        clonedImg.setAttribute("src", dataUrl);
        resolve();
      } catch (error) {
        console.error("Failed to convert image to base64:", error);
        resolve(); // Still resolve so rest of layout is processed
      }
    };

    img.onerror = (e) => {
      console.error("Image failed to load:", e);
      resolve(); // Avoid breaking entire export on image error
    };
  });
}
function useHomePage() {
  const [droppedItems, setDroppedItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const layoutRef = useRef(null);

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  const handleDragEnd = (event) => {
    const { over, active } = event;

    if (
      (over?.id === "editor-body" ||
        ["1 Column", "2 Column", "Container", "Divider"].includes(active.id)) &&
      !["Headline", "Sub-header", "Body", "Image", "Gallery", "Video"].includes(
        active.id
      )
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

  const handleConvertToHTML = async () => {
    const element = layoutRef.current;
    if (!element) return;
    const cloned = await cloneWithInlineStyles(element);

    // Add necessary meta tags and styling for responsive iframes
    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    /* Responsive styling for iframes */
    .iframe-container {
      position: relative;
      width: 100%;
      padding-bottom: 56.25%; /* 16:9 aspect ratio */
      height: 0;
    }
    .iframe-container iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 0;
    }
  </style>
</head>
<body>
${cloned.outerHTML}
</body>
</html>`;

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

  const handleLayoutDelete = ({ id }) => {
    setDroppedItems((prev) => {
      const newItems = prev.filter((value) => value.id !== id);

      return newItems;
    });
  };

  return {
    droppedItems,
    setDroppedItems,
    layoutRef,
    isModalOpen,
    handleOpen,
    handleClose,
    handleDragEnd,
    handleConvertToHTML,
    handleLayoutRearrange,
    handleLayoutDelete,
  };
}

export default useHomePage;
