function StyleButton({
  styleKey,
  styleValue,
  applyStyle,
  className = "",
  children,
}) {
  const handleClick = () => {
    applyStyle(styleKey, styleValue);
  };

  return (
    <button onClick={handleClick} className={`text-sm px-1 ${className}`}>
      {children}
    </button>
  );
}

export default StyleButton;
