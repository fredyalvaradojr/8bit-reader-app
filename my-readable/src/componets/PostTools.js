import React from "react";

const PostTools = props => {
  console.debug(props);
  return (
    <div className="post-tools">
      <span className="post-tools_upvote">Up</span>
      <span className="post-tools_downvote">Down</span>
      <span className="post-tools_edit">Edit</span>
      <span className="post-tools_delete">Delete</span>
    </div>
  );
};

export default PostTools;
