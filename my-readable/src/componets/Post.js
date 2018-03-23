import React from "react";
import { css } from "emotion";
import globalStyles from "../utils/globalStyles";

const article = css`
  margin-bottom: 1em;
  border-bottom: 0.125em dotted #ccc;
  padding-bottom: 1em;

  &_header {
    font-family: "Bungee", cursive;
  }

  &_header_link {
    text-decoration: none;
    color: ${globalStyles.color.black};
    line-height: 1.5;
    border-bottom-width: 0.0625em;
    border-bottom-color: transparent;
    cursor: pointer;

    &:focus,
    &:hover,
    &:active {
      border-bottom-style: dotted;
      border-bottom-width: 0.0625em;
      border-bottom-color: ${globalStyles.color.black};
    }
  }

  &_meta {
    margin-bottom: 0.5em;
    border-bottom: 0.0625 dashed #ccc;
    padding-bottom: 0.5em;
    display: flex;
  }
`;

const Post = props => {
  return (
    <li key={props.postContent.id}>
      <article className={article}>
        <header>
          <h1 className={`${article}_header`}>
            <a className={`${article}_header_link`}>
              {props.postContent.title}
            </a>
          </h1>
        </header>
        <div className={`${article}_meta`}>
          <div className={`${article}_author`}>{props.postContent.author}</div>
          <div className={`${article}_number-comments`}>
            {props.postContent.commentCount}
          </div>
        </div>
      </article>
    </li>
  );
};

export default Post;
