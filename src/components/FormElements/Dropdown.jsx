const DropdownSelect = ({
  inputLabel,
  name,
  id,
  options,
  selectedValue,
  defaultOption,
  ...rest
}) => {
  return (
    <div style={{ width: "100%" }}>
      <label htmlFor={name}>{inputLabel}</label>
      <select style={{ maxWidth: "250px" }} {...rest} name={name} id={id}>
        <option value={0}>{defaultOption}</option>
        {options.map((d) =>
          selectedValue === d.id ? (
            <option key={d.id} value={d.id} selected>
              {d.label || d.type_name || d.discount_name}
            </option>
          ) : (
            <option key={d.id} value={d.id}>
              {d.label || d.type_name || d.discount_name}
            </option>
          )
        )}
      </select>
    </div>
  );
};

export default DropdownSelect;
