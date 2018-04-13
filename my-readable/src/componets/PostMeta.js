import React from "react";
import { css } from "emotion";
import globalStyles from "../utils/globalStyles";
import CommentsSVG from "../media/comments.svg";
import VotesSVG from "../media/upvote.svg";
import { hexToRGB, editPostTimestamp } from "../utils/index";

const PostMetaStyles = css`
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

const PostMeta = props => {
  return (
    <div className={`${PostMetaStyles}_meta`}>
      <div className={`${PostMetaStyles}_author`}>
        {props.postContent.author}{" "}
        <span className={`${PostMetaStyles}_date`}>
          {" "}
          - {editPostTimestamp(props.postContent.timestamp)}
        </span>
      </div>
      <div className={`${PostMetaStyles}_post-numbers`}>
        {props.comment ? (
          ""
        ) : (
          <div
            className={`${PostMetaStyles}_number-comments ${PostMetaStyles}_post-numbers--item`}
          >
            <img
              className={`${PostMetaStyles}_comments-icon`}
              src={CommentsSVG}
              aria-hidden="true"
              alt="comment count icon"
            />
            {props.postContent.commentCount}
          </div>
        )}
        <div
          className={`${PostMetaStyles}_votes ${PostMetaStyles}_post-numbers--item`}
        >
          <img
            className={`${PostMetaStyles}_votes-icon`}
            src={VotesSVG}
            aria-hidden="true"
            alt="vote score icon"
          />
          {props.postContent.voteScore}
        </div>
      </div>
    </div>
  );
};

export default PostMeta;
