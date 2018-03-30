import React, { Component } from "react";
import { connect } from "react-redux";
import { postVote } from "../actions/index";

class PostTools extends Component {
  render() {
    return (
      <div className="post-tools">
        <button
          className="post-tools_upvote"
          onClick={() =>
            this.props.voting(this.props.postId, "upVote", this.props.allPosts)
          }
        >
          Up
        </button>
        <button
          className="post-tools_downvote"
          onClick={() =>
            this.props.voting(
              this.props.postId,
              "downVote",
              this.props.allPosts
            )
          }
        >
          Down
        </button>
        <span className="post-tools_edit">Edit</span>
        <span className="post-tools_delete">Delete</span>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.debug(state);
  return {
    postId: ownProps.postId,
    allPosts: state.posts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    voting: (postId, vote, allPosts) => {
      console.debug(postId, vote, allPosts);
      dispatch(postVote(postId, vote, allPosts));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostTools);
