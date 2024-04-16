import React from "react";
import styles from "./button.module.scss";

type ButtonProps = {
  type: "primary" | "secondary"; // Define the button types
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  type,
  onClick,
  disabled,
  children,
}) => {
  const buttonClassName =
    type === "primary" ? styles.primary : styles.secondary;

  return (
    <button className={buttonClassName} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
