import React from "react";
import { css } from "emotion";
import { NavLink } from "react-router-dom";
import globalStyles from "../utils/globalStyles";
import MyReadableLogo from "../media/logo.svg";

const AppFooterStyles = css`
  margin: 3em 0 1em;
  border-top: 0.0625rem dotted ${globalStyles.color.purple};

  &_logo-container {
    margin-top: 2em;
    text-align: center;
  }

  &_logo {
    width: 3em;
    height: auto;
  }
`;

const AppFooter = () => {
  return (
    <div className={AppFooterStyles} data-class="AppFooterStyles">
      <div className={`${AppFooterStyles}_logo-container`}>
        <NavLink
          to="/"
          exact
          onClick={() => {
            this.props.setCurrentView("default");
          }}
        >
          <img
            src={MyReadableLogo}
            className={`${AppFooterStyles}_logo`}
            alt="MyReadable App"
          />
          <span className="sr-only">MyReadble App</span>
        </NavLink>
      </div>
    </div>
  );
};

export default AppFooter;
