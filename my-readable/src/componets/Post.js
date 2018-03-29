import React from "react";
import { NavLink } from "react-router-dom";
import { css } from "emotion";
import { connect } from "react-redux";
import * as actions from "../actions";
import globalStyles from "../utils/globalStyles";
import { hexToRGB } from "../utils/index";
import PostTools from "./PostTools";

const article = css`
  margin-bottom: 1em;
  border-bottom: 0.125em dotted ${globalStyles.color.darkGray};
  padding-bottom: 1em;

  &_header {
    font-family: "Bungee", cursive;
    font-size: 1.125em;
  }

  &_header_link {
    text-decoration: none;
    color: ${globalStyles.color.purple};
    text-shadow: 0.25em 0.25em rgba(${hexToRGB(globalStyles.color.purple)}, 0.2);
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
          <h2 className={`${article}_header`}>
            <NavLink
              activeClassName="active"
              className={`${article}_header_link`}
              exact
              to={`/${props.postContent.category}/${props.postContent.id}`}
              onClick={() => {
                props.setCurrentPostDispatch(props.postContent);
                props.setCurrentView("PostView");
              }}
            >
              {props.postContent.title}
            </NavLink>
          </h2>
        </header>
        <div className={`${article}_meta`}>
          <div className={`${article}_author`}>{props.postContent.author}</div>
          <div className={`${article}_number-comments`}>
            {props.postContent.commentCount}
          </div>
          <div className={`${article}_votes`}>
            {props.postContent.voteScore}
          </div>
        </div>
        <PostTools postId={props.postContent.id} />
      </article>
    </li>
  );
};

function mapStateToProps(state, ownProps) {
  console.debug(state);
  return {
    currentPost: state.currentPost
  };
}

const mapDispatchToProps = dispatch => ({
  setCurrentPostDispatch: post => {
    dispatch(actions.setCurrentPost(post));
  },
  setCurrentView: view => {
    dispatch(actions.setCurrentView(view));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
