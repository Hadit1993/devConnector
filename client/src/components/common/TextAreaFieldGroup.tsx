import { ChangeEventHandler, CSSProperties } from "react";

const TextAreaFieldGroup = (props: {
  value?: string;
  style?: CSSProperties;
  error?: string;
  placeHolder: string;
  name?: string;
  info?: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
}) => {
  return (
    <>
      <textarea
        value={props.value}
        style={props.style}
        className={`${
          props.error ? "is-invalid" : ""
        } form-control form-control-lg`}
        placeholder={props.placeHolder}
        name={props.name}
        onChange={props.onChange}
      />

      <div className="error-input">{props.error || ""}</div>
      {props.info && <p className="form-text text-muted">{props.info}</p>}
    </>
  );
};

export default TextAreaFieldGroup;
