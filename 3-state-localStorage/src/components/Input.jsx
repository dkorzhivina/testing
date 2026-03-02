import { forwardRef } from "react";

const Input = forwardRef(function Input(
  { value, onChange, placeholder, onKeyDown, error },
  ref
) {
  return (
    <div className="input-wrapper">
      <input
        ref={ref}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onKeyDown={onKeyDown}
        className={`input${error ? " input-error" : ""}`}
      />
    </div>
  );
});

export default Input;
