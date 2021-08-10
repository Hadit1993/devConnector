import { ChangeEventHandler, CSSProperties } from "react";

const InputGroup = (props: {
  value?: string;
  style?: CSSProperties;
  error?: string;
  placeHolder: string;
  icon?: string;
  type?: string;
  name?: string;

  onChange: ChangeEventHandler<HTMLInputElement>;
}) => {
  const { type = "text" } = props;
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text" style={{ height: "100%" }}>
          <i className={props.icon} />
        </span>
      </div>
      <input
        value={props.value}
        style={props.style}
        className={`${
          props.error ? "is-invalid" : ""
        } form-control form-control-lg`}
        type={type || "text"}
        placeholder={props.placeHolder}
        name={props.name}
        onChange={props.onChange}
      />

      <div className="error-input">{props.error || ""}</div>
    </div>
  );
};

export default InputGroup;
