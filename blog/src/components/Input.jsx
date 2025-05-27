import React, { useId } from "react";
import { forwardRef } from "react";

// here we are using forwardRef to pass the ref to the input element
const Input = forwardRef(function Input(
  { label, type = "text", placeholder = "", className = "", ...props },
  ref
) {
  // useId is used to generate a unique id for the input element
  const id = useId();

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm font-medium text-gray-700" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        ref={ref}
        id={id}
        className={`border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
        {...props}
        placeholder={placeholder}
      />
    </div>
  );
});
export default Input;
