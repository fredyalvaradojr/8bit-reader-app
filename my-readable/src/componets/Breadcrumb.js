import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { css } from "emotion";
import globalStyles from "../utils/globalStyles";
import * as actions from "../actions/index";

const BreadcrumbStyles = css`
  margin-bottom: 2em;
  padding: 0.5em 0.3em;
  font-size: 0.75em;
  border-top: 0.0625rem dotted ${globalStyles.color.lightPurple};

  &_link {
    color: ${globalStyles.color.purple};
    font-weight: 800;
    text-decoration none;
    text-transform: capitalize;
  }
  &_sep {
    margin: 0 0.4em;
    display: inline-block;
  }
`;

const Breadcrumb = props => {
  const breadcrumbList = window.location.pathname.split("/");

  return (
    <div className={BreadcrumbStyles}>
      {breadcrumbList.map((item, i) => {
        console.debug("i: ", i, breadcrumbList.length - 1);
        if (item === "") {
          return (
            <span key={i}>
              <NavLink
                className={`${BreadcrumbStyles}_link`}
                to="/"
                exact
                onClick={() => {
                  props.setCurrentView(props.viewTo);
                }}
              >
                Home
              </NavLink>
              <span className={`${BreadcrumbStyles}_sep`}>/</span>
            </span>
          );
        }
        if (i === breadcrumbList.length - 1) {
          return (
            <span key={i}>{props.postTitle ? props.postTitle : item}</span>
          );
        } else {
          return (
            <span key={i}>
              <NavLink
                className={`${BreadcrumbStyles}_link`}
                key={item}
                exact
                to={`/${item}`}
                onClick={() => {
                  props.setCurrentView("CategoryView");
                }}
              >
                {item}
              </NavLink>
              <span className={`${BreadcrumbStyles}_sep`}>/</span>
            </span>
          );
        }
      })}
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  setCurrentView: view => {
    dispatch(actions.setCurrentView(view));
  }
});

export default connect(null, mapDispatchToProps)(Breadcrumb);
