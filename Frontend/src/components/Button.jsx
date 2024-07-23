import React from "react";

export default function Button({ children, type, classname, ...props }) {
  return (
    <button className={`btn btn-ghost ${classname}`} {...props}>
      {children}
    </button>
  );
}
