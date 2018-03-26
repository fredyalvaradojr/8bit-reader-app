import React from "react";
import { connect } from "react-redux";
import PostTools from "./PostTools";

const PostView = props => {
  console.debug(props.currentPost);
  return (
    <div className="postview">
      <h1>{props.currentPost.title}</h1>
      <div>{props.currentPost.body}</div>
      <div>
        {props.currentPost.author}
        {props.currentPost.commentCount}
        {props.currentPost.voteScore}
      </div>
      <PostTools />
    </div>
  );
};

function mapStateToProps(state, ownProps) {
  console.debug(state);
  return {
    currentPost: state.currentPost
  };
}

export default connect(mapStateToProps)(PostView);
