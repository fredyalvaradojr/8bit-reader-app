import React from "react";
import CommentViewTools from "./CommentViewTools";

const CommentView = props => {
  return (
    <div className="CommentViewStyles">
      <div>{props.commentInfo.body}</div>
      <div>{props.commentInfo.author}</div>
      <div>{props.commentInfo.voteScore}</div>
      <CommentViewTools
        parentID={props.parentID}
        commentId={props.commentInfo.id}
      />
    </div>
  );
};

export default CommentView;
