import React from "react";
import { useNavigate } from "react-router-dom";

interface NavigateButtonProps {
  label: string;
  to: string;
  className?: string;
}

const NavigateButton: React.FC<NavigateButtonProps> = ({
  label,
  to,
  className,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  };

  return (
    <button
      onClick={handleClick}
      className={`px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition ${className}`}
    >
      {label}
    </button>
  );
};

export default NavigateButton;
