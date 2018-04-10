import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions/index";

const Breadcrumb = props => {
  const breadcrumbList = window.location.pathname.split("/");

  return (
    <div className="BreadcrumbStyles">
      {breadcrumbList.map((item, i) => {
        console.debug("i: ", i, breadcrumbList.length - 1);
        if (item === "") {
          return (
            <span key={i}>
              <NavLink
                to="/"
                exact
                onClick={() => {
                  props.setCurrentView(props.viewTo);
                }}
              >
                Home
              </NavLink>
              <span className="_sep">></span>
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
                key={item}
                exact
                to={`/${item}`}
                onClick={() => {
                  props.setCurrentView("CategoryView");
                }}
              >
                {item}
              </NavLink>
              <span className="_sep">></span>
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
