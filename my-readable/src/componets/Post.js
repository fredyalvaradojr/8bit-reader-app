import React from "react";
import { NavLink } from "react-router-dom";
import { css } from "emotion";
import { connect } from "react-redux";
import * as actions from "../actions";
import globalStyles from "../utils/globalStyles";
import { hexToRGB, editPostTimestamp } from "../utils/index";
import PostTools from "./PostTools";
import CommentsSVG from "../media/comments.svg";
import VotesSVG from "../media/upvote.svg";

const article = css`
  margin-bottom: 1em;
  border-bottom: 0.125em dotted ${globalStyles.color.darkGray};
  padding-bottom: 1em;

  &_header {
    font-family: "Bungee", cursive;
    font-size: 1.5em;
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
    margin: 0.5em 0 0.3em;
    border-bottom: 0.0625 dashed #ccc;
    padding-bottom: 0.5em;
  }

  &_author {
    text-transform: capitalize;
    font-size: 0.875em;
    font-weight: bold;
  }

  &_date {
    text-transform: capitalize;
    color: ${globalStyles.color.lightPurple};
    font-size: 0.75em;
    font-style: italic;
  }

  &_post-numbers {
    display: flex;
    align-items: center;
    font-size: 0.75em;
    margin-top: 0.2em;
    margin-bottom: 0.3em;
  }

  &_post-numbers--item {
    margin-right: 1em;
    display: flex;
    align-items: baseline;
  }

  &_comments-icon,
  &_votes-icon {
    width: auto;
    height: 0.65em;
    display: inline-block;
    margin-right: 0.2em;
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
          <div className={`${article}_author`}>
            {props.postContent.author}{" "}
            <span className={`${article}_date`}>
              {" "}
              - {editPostTimestamp(props.postContent.timestamp)}
            </span>
          </div>
          <div className={`${article}_post-numbers`}>
            <div
              className={`${article}_number-comments ${article}_post-numbers--item`}
            >
              <img
                className={`${article}_comments-icon`}
                src={CommentsSVG}
                aria-hidden="true"
                alt="comment count icon"
              />
              {props.postContent.commentCount}
            </div>
            <div className={`${article}_votes ${article}_post-numbers--item`}>
              <img
                className={`${article}_votes-icon`}
                src={VotesSVG}
                aria-hidden="true"
                alt="vote score icon"
              />
              {props.postContent.voteScore}
            </div>
          </div>
        </div>
        <PostTools postId={props.postContent.id} />
      </article>
    </li>
  );
};

function mapStateToProps(state, ownProps) {
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
