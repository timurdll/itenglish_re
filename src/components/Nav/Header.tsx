import Button from "../UI/Button/Button";
import styles from "./header.module.scss";
import logo from "../../assets/images/logo.svg";
import menu from "../../assets/images/menu.svg";
import close from "../../assets/images/close.svg";
import ReactSelect from "react-select";
import CustomLink from "../UI/Link/Link";
import LanguageIcon from "@mui/icons-material/Language";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ADMIN_ROUTE, PROFILE_ROUTE, SIGNUP_ROUTE } from "../Router/consts";
import { useAuth } from "../../hooks/use-auth";
import useWindowDimensions from "../../hooks/use-window-dimension";
import { useGetUserQuery } from "../../store/usersApi";
const Header = () => {
  const options = [
    { value: "en", label: "EN" },
    { value: "kk", label: "KK" },
    { value: "ru", label: "RU" },
  ];
  const { isAuth, id } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { width } = useWindowDimensions();
  const { data } = useGetUserQuery({ id });

  const toggleMenu = () => {
    if (width <= 946) {
      setMenuOpen(!isMenuOpen);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <CustomLink to="/">
            <img className={styles.image} src={logo} alt="logo" />
          </CustomLink>
        </div>
        <nav className={isMenuOpen ? styles.nav__open : styles.nav}>
          <div className={isMenuOpen ? styles.links__open : styles.links}>
            <CustomLink handleClick={toggleMenu} to="/about">
              About
            </CustomLink>
            <CustomLink handleClick={toggleMenu} to="/features">
              Features
            </CustomLink>
            <CustomLink handleClick={toggleMenu} to="/modules">
              Modules
            </CustomLink>
            {isAuth ? (
              <>
                <Button
                  type="primary"
                  onClick={() => {
                    navigate(PROFILE_ROUTE);
                    toggleMenu();
                  }}
                >
                  Profile
                </Button>
                {true && (
                  <Button
                    type="primary"
                    onClick={() => {
                      navigate(ADMIN_ROUTE);
                      toggleMenu();
                    }}
                  >
                    Admin
                  </Button>
                )}
              </>
            ) : (
              <>
                <CustomLink handleClick={toggleMenu} to="/login">
                  Login
                </CustomLink>
                <Button
                  type="primary"
                  onClick={() => {
                    navigate(SIGNUP_ROUTE);
                    toggleMenu();
                  }}
                >
                  Sign Up
                </Button>
              </>
            )}

            <span>
              <ReactSelect
                options={options}
                placeholder={
                  <div>
                    <LanguageIcon />
                  </div>
                }
              />
            </span>
          </div>
          <span className={styles.close} onClick={() => setMenuOpen(false)}>
            <img src={close} alt="x" />
          </span>
        </nav>
        <button className={styles.burger} onClick={toggleMenu}>
          <img src={menu} alt="-" />
        </button>
      </div>
    </header>
  );
};

export default Header;
