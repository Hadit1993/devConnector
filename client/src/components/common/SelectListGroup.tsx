import { ChangeEventHandler, CSSProperties } from "react";

const SelectListGroup = (props: {
  value?: string;
  style?: CSSProperties;
  error?: string;
  name?: string;
  info?: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  options: { label: string; value: string }[];
}) => {
  const selectOptions = props.options.map((opt) => (
    <option key={opt.label} value={opt.value}>
      {opt.label}
    </option>
  ));
  return (
    <>
      <select
        value={props.value}
        style={props.style}
        className={`${
          props.error ? "is-invalid" : ""
        } form-control form-control-lg`}
        name={props.name}
        onChange={props.onChange}
      >
        {selectOptions}
      </select>

      <div className="error-input">{props.error || ""}</div>
      {props.info && <p className="form-text text-muted">{props.info}</p>}
    </>
  );
};

export default SelectListGroup;
