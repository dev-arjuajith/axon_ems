import React from "react";
import Text from './Text';

type PrimaryButtonProps = {
  text: string;
  onClick?: () => void;
};

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        paddingTop: "14px",
        paddingBottom: "14px",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer",
        background: "linear-gradient(to right, #001E40, #003366)",
        boxShadow: "0px 10px 15px -3px rgba(0, 30, 64, 0.2)"
      }}
    >
        <Text align='center' color='white' size= '16px' weight='bold'>
            {text}
        </Text>
    </button>
  );
};

export default PrimaryButton;