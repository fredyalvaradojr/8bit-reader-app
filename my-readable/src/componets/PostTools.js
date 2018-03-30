import React, { Component } from "react";
import { connect } from "react-redux";
import { css } from "emotion";
import { postVote } from "../actions/index";
import UpvoteSVG from "../media/upvote.svg";
import DownvoteSVG from "../media/downvote.svg";

class PostTools extends Component {
  PostToolsStyles = css`
    display: flex;
    align-items: center;
    justify-content: flex-end;

    &_upvote,
    &_downvote {
      background: none;
      margin-right: 0.5em;
    }

    &_icon {
      width: 1.3em;
      height: auto;
      display: inline-block;
    }
  `;

  render() {
    return (
      <div className={this.PostToolsStyles} data-class="PostToolsStyles">
        <button
          className={`${this.PostToolsStyles}_upvote`}
          onClick={() =>
            this.props.voting(this.props.postId, "upVote", this.props.allPosts)
          }
        >
          <span className="sr-only">Up Vote Post</span>
          <img
            className={`${this.PostToolsStyles}_icon`}
            src={UpvoteSVG}
            alt="up vote post"
            aria-hidden="true"
          />
        </button>
        <button
          className={`${this.PostToolsStyles}_downvote`}
          onClick={() =>
            this.props.voting(
              this.props.postId,
              "downVote",
              this.props.allPosts
            )
          }
        >
          <span className="sr-only">Down Vote Post</span>
          <img
            className={`${this.PostToolsStyles}_icon`}
            src={DownvoteSVG}
            alt="down vote post"
            aria-hidden="true"
          />
        </button>
        <span className="post-tools_edit">Edit</span>
        <span className="post-tools_delete">Delete</span>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    postId: ownProps.postId,
    allPosts: state.posts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    voting: (postId, vote, allPosts) => {
      dispatch(postVote(postId, vote, allPosts));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostTools);
