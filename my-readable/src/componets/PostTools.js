import React from "react";

const PostTools = props => {
  return (
    <div className="post-tools">
      <span className="post-tools_upvote" />
      <span className="post-tools_downvote" />
      <span className="post-tools_edit" />
      <span className="post-tools_delete" />
    </div>
  );
};

export default PostTools;
