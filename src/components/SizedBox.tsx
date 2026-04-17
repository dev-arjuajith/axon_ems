import React from "react";

type SizedBoxProps = {
  width?: number | string;
  height?: number | string;
  children?: React.ReactNode;
};

const SizedBox: React.FC<SizedBoxProps> = ({
  width,
  height,
  children,
}) => {
  return (
    <div
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
        display: "block",
      }}
    >
      {children}
    </div>
  );
};

export default SizedBox;