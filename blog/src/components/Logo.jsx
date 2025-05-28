import React from "react";

function Logo({ width = "100px" }) {
  return (
    <div
      className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-yellow-500 to-red-500 animate-[marquee_5s_linear_infinite]"
      style={{
        width,
        whiteSpace: "nowrap",
        overflow: "hidden",
        display: "inline-block",
      }}
    >
      <span className="inline-block animate-[marquee_5s_linear_infinite]">
        DailyDrift
      </span>
    </div>
  );
}

export default Logo;
