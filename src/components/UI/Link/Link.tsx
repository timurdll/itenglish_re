import React from "react";
import styles from "./link.module.scss";
import { Link } from "react-router-dom";

type LinkProps = {
  handleClick?: () => void;
  to: string;
  children: React.ReactNode;
};

const CustomLink: React.FC<LinkProps> = ({ handleClick, to, children }) => {
  return (
    <Link onClick={handleClick} className={styles.link} to={to}>
      {children}
    </Link>
  );
};

export default CustomLink;
