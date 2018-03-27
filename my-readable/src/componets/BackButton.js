import React from "react";
import { NavLink } from "react-router-dom";
import { css } from "emotion";
import { connect } from "react-redux";
import * as actions from "../actions/index";
import globalStyles from "../utils/globalStyles";

const BackButton = props => {
  const backTo = css`
    text-align: left;
    color: ${globalStyles.color.black};
    padding: 0.3em 0.6em;
    font-size: 0.625em;
    border-radius: 0.1875em;
    text-transform: uppercase;
    font-weight: bold;
    border: 0.0625em dotted;
    margin-bottom: 2em;
    display: inline-block;
    text-decoration: none;
    background-color: buttonface;

    &:hover,
    &:visited,
    &:focus {
      color: ${globalStyles.color.black};
    }
  `;
  return (
    <NavLink
      className={backTo}
      data-class="backTo"
      exact
      to={props.backTo}
      onClick={() => {
        props.setCurrentView(props.viewTo);
      }}
    >
      &lt; Return to {props.backToTitle}
    </NavLink>
  );
};

const mapDispatchToProps = dispatch => ({
  setCurrentView: view => {
    dispatch(actions.setCurrentView(view));
  }
});

export default connect(null, mapDispatchToProps)(BackButton);
