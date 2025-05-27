import React from "react";

function Button({
  children,
  type = "button",
  bgColor = "bg-blue-500",
  textColor = "text-white",
  borderRadius = "rounded",
  padding = "px-4 py-2",
  hoverEffect = "hover:bg-blue-600",
  className = "",
  ...props
}) {
  return (
    <button
      className={`cursor-pointer w-full transition duration-300 ease-in-out transform  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${padding} ${className} ${bgColor} ${textColor} ${borderRadius} ${hoverEffect}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
