import React, { useContext } from "react";
import styles from "./Header.module.css";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { ThemeContext } from "../Context/ThemeContext";
import styled from "styled-components";

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerIcons}>
      <LinkedInIcon
          className={styles.headerIcon}
          onClick={() =>
            window.open("https://www.linkedin.com/in/ram-kumar-nukala/")
          }
        />
        <GitHubIcon
          className={styles.headerIcon}
          onClick={() => window.open("https://github.com/ramkumarnukala")}
        />
      </div>
      <div>
        <StyledHeader>Weather Forecast</StyledHeader>
      </div>
      <div className={styles.headerIcons}>
        <DarkModeIcon
          className={styles.headerIcon}
          onClick={() => toggleTheme()}
        />
      </div>
    </div>
  );
};

export default Header;

const StyledHeader = styled.h1`
  margin: 0px;
  cursor: default;
`;
