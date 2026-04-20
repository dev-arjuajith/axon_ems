import React from "react";
import { AppColors } from "../core/colors";

type TextProps = {
  children: React.ReactNode;
  size?: string | number;
  width?: string | number;
  color?: string;
  weight?: string | number;
  height?: string | number;
  align?: "left" | "center" | "right";
  cursor?: string & {};
  letterSpacing?: string | number;
};

const Text: React.FC<TextProps> = ({
  children,
  size = "16px",
  width = "auto",
  color = AppColors.text.primary,
  weight = "normal",
  align = "left",
  cursor = null,
  letterSpacing = null,
}) => {
  return (
    <p
      style={{
        fontSize: size,
        width: width,
        color: color,
        fontWeight: weight,
        textAlign: align,
        margin: 0,
        cursor: cursor,
        letterSpacing: letterSpacing, 
      }}
    >
      {children}
    </p>
  );
};

export default Text;