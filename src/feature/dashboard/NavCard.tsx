import React from "react";
import SizedBox from "../../components/SizedBox";
import Text from "../../components/Text";
import './Dashboard.css';

type NavCardProps = {
  logo: string;
  text: string;
  isSelected?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>
};

const NavCard: React.FC<NavCardProps> = ({
  logo,
  text,
  isSelected = false,
  onClick,
}) => {
  return (
     <div className={`nav-card ${isSelected ? "selected" : ""}`} onClick={onClick}>
      <img src={logo} alt={text} />

      <SizedBox width="8px" />

      <Text
        size={isSelected ? "16" : "14"}
        weight={isSelected ? "bold" : "normal"}
      >
        {text}
      </Text>
    </div>
  );
};

export default NavCard;