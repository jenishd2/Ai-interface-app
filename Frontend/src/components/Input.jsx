import React from "react";
import { forwardRef, useId } from "react";

const Input = forwardRef(function Input(
  { label, type = "text", classname, ...props },
  ref
) {
  const id = useId();

  return (
    <div className="w-full flex flex-col justify-center items-start">
      {label && (
        <label className="text-xl max-ml:text-lg mb-3 text-gray-600 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${classname}`}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
});
export default Input;
