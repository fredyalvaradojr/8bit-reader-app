import React from "react";
import { css } from "emotion";
import CommentViewTools from "./CommentViewTools";
import PostMeta from "./PostMeta";

const CommentView = props => {
  const CommentViewStyles = css`
    &_body {
      margin-bottom: 1em;
      font-size: 1.125em;
    }
  `;
  return (
    <div className={CommentViewStyles} data-class="CommentView">
      <div className={`${CommentViewStyles}_body`}>
        {props.commentInfo.body}
      </div>
      <PostMeta postContent={props.commentInfo} comment={true} />
      <CommentViewTools
        parentID={props.parentID}
        commentId={props.commentInfo.id}
      />
    </div>
  );
};

export default CommentView;
