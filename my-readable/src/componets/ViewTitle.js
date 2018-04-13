import React from "react";
import { css } from "emotion";
import globalStyles from "../utils/globalStyles";

const viewTitle = css`
  font-family: "Erica One", cursive;
  text-align center;
  font-size: 2.5em;
  font-weight: normal;
  color: ${globalStyles.color.darkGray};
  padding: 0.2em 0 0.28em;
  margin-bottom: 1em;
  text-transform: uppercase;
  border-top: 0.1875em solid ${globalStyles.color.darkGray};
  border-bottom: 0.1875em solid ${globalStyles.color.darkGray};

  &.smaller {
    font-size: 1.8em;
  }
`;

const ViewTitle = props => (
  <h1 className={`${viewTitle} ${props.modifier}`} data-class="viewTitle">
    {props.content}
  </h1>
);

export default ViewTitle;
