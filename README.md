# 📰 Article-Canvas-Editor

A powerful web-based layout designer that lets you visually create article pages using drag-and-drop components, inline editing, and media embedding. Designed for editors, bloggers, and CMS integration.

Live URL: https://article-canvas-editor.netlify.app/

## 🚀 Features

### 🧱 Layout Designer

- Drag-and-drop interface with the following layout components:
  - 1 Column
  - 2 Column
  - Container
  - Divider
- Add, move, or delete sections dynamically on the canvas.

### ✏️ Text Components

- Text Types:
  - Headline
  - Sub-header
  - Body
- Inline editing with live changes.
- Style options:
  - Font family, size, and weight
  - Alignment and spacing

### 🖼️ Media Components

- **Image Upload:**
  - Drag-and-drop or file picker from local system
  - Supported in Image and Gallery Component
- **Video Embed:**
  - Supports external URLs (YouTube)
  - Inline preview on canvas

### 🧠 Inline Editing

- Rich editor appears when text is selected.
- Change styles directly in canvas view.
- Supported for all text types (Headline, Sub-header, Body)

### 🔍 Preview Mode

- One-click preview for a clean, browser-ready view of your article.
- Hides all editing tools to display final output.

### 📦 Export Options

- **Export as ZIP**: Download a `.zip` with:
  - `index.html`
  - All necessary styles injected as inline styles

---

## 📂 Tech Stack

- Frontend: React JS
- Styling: Tailwind
- Drag & Drop: `@dnd-kit/core`
- Bundler: Vite
- Icons: React Icons

---

## ⚠️ Known Limitations

    Inline Style Overload:
    While exporting, styles are applied using getComputedStyle() to ensure a standalone HTML block. This results in all inherited and computed styles being included, not just the ones explicitly set — leading to larger inline style blocks.

    Gallery Export Issue:
    The Gallery component does not render correctly in the exported .zip file due to missing JavaScript logic or styles required for gallery layout/interaction.

    Text Overflow in Containers:
    In certain cases, long or unwrapped text inside a container may overflow its boundaries, especially when using custom font sizes or narrow columns.

    No Drag-to-Rearrange:
    Elements on the canvas cannot be rearranged using drag-and-drop. Instead, you must use provided Move Up / Move Down buttons to reposition them.
