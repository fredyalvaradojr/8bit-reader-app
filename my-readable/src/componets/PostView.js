import React from "react";
import { css } from "emotion";
import { connect } from "react-redux";
import globalStyles from "../utils/globalStyles";
import PostTools from "./PostTools";
import BackButton from "./BackButton";
import { hexToRGB } from "../utils/index";

const article = css`
  &_header {
    font-family: "Bungee", cursive;
    color: ${globalStyles.color.orange};
    margin: 1em 0;
    padding: 1em 0;
    border-top: 0.1875em dashed ${globalStyles.color.darkGray};
    border-bottom: 0.1875em dashed ${globalStyles.color.darkGray};
    text-shadow: 0.125em 0.125em
      rgba(${hexToRGB(globalStyles.color.darkOrange)}, 1);
  }

  &_meta {
    margin-bottom: 0.5em;
    border-bottom: 0.0625 dashed #ccc;
    padding-bottom: 0.5em;
    display: flex;
  }

  &_body {
    margin: 0 0 3em;
  }
`;

const PostView = props => {
  return (
    <div className="post-view">
      <BackButton backToTitle="List" backTo="/" viewTo="default" />
      <article className={article}>
        <header>
          <h1 className={`${article}_header`}>{props.currentPost.title}</h1>
        </header>
        <div className={`${article}_meta`}>
          <div className={`${article}_author`}>{props.currentPost.author}</div>
          <div className={`${article}_number-comments`}>
            {props.currentPost.commentCount}
          </div>
        </div>
        <div className={`${article}_body`}>{props.currentPost.body}</div>
        <PostTools />
        {props.currentPost.comments && props.currentPost.comments.length > 0 ? (
          <div className={`${article}_comments`}>
            <h2>Comments</h2>
            <ul>
              {props.currentPost.comments.map(comment => (
                <li key={comment.id}>{comment.body}</li>
              ))}
            </ul>
          </div>
        ) : (
          <div className={`${article}_comments`}>
            <h2>This post needs your feedback</h2>
          </div>
        )}
      </article>
    </div>
  );
};

function mapStateToProps(state, ownProps) {
  return {
    currentPost: state.currentPost
  };
}

export default connect(mapStateToProps)(PostView);
