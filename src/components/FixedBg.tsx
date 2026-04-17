import React from "react";

type FixedBgProps = {
  image: string;
  zIndex?: number;
};

const FixedBg: React.FC<FixedBgProps> = ({ image, zIndex = -1 }) => {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        zIndex: zIndex,
      }}
    />
  );
};

export default FixedBg;