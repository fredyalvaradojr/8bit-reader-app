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
import PostMeta from "./PostMeta";

const article = css`
  @media (min-width: 48em) {
    flex: 0 1 50%;
  }

  &_article {
    margin-bottom: 1em;
    border-bottom: 0.125em dotted ${globalStyles.color.darkGray};
    padding-bottom: 1em;

    @media (min-width: 48em) {
      margin: 1em;
    }
  }

  &_header {
    font-family: "Bungee", cursive;
    font-size: 1.5em;
  }

  &_header_link {
    text-decoration: none;
    color: ${globalStyles.color.purple};
    text-shadow: 0.25em 0.25em rgba(${hexToRGB(globalStyles.color.purple)}, 0.1);
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
    <li key={props.postContent.id} className={article} data-class="article">
      <article className={`${article}_article`}>
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
        <PostMeta postContent={props.postContent} />
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
