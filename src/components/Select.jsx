function Select({
  options = [],
  onChange = () => {},
  className = "",
  value,
  defaultValue,
}) {
  return (
    <select
      value={value}
      defaultValue={defaultValue}
      onChange={(e) => onChange(e.target.value)}
      className={`text-sm border border-gray-300 rounded ${className}`}
    >
      {options.map((value) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
}

export default Select;
