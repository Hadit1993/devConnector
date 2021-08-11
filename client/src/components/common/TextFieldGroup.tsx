import { ChangeEventHandler, CSSProperties } from "react";

const TextFieldGroup = (props: {
  value?: string;
  style?: CSSProperties;
  error?: string;
  placeHolder?: string;
  type?: string;
  name?: string;
  info?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
}) => {
  return (
    <>
      <input
        value={props.value}
        style={props.style}
        type={props.type || "text"}
        className={`${
          props.error ? "is-invalid" : ""
        } form-control form-control-lg`}
        placeholder={props.placeHolder}
        name={props.name}
        onChange={props.onChange}
        disabled={props.disabled}
      />

      <div
        style={{ marginBottom: props.info ? 0 : 10 }}
        className="error-input"
      >
        {props.error || ""}
      </div>
      {props.info && <p className="form-text text-muted">{props.info}</p>}
    </>
  );
};

export default TextFieldGroup;
