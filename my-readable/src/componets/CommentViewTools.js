import React, { Component } from "react";
import { connect } from "react-redux";
import { css } from "emotion";
import { postCommentVote, deletePost } from "../actions/index";
import UpvoteSVG from "../media/upvote.svg";
import DownvoteSVG from "../media/downvote.svg";
import Modal from "./Modal";

class CommentViewTools extends Component {
  state = {
    activeEditModal: false
  };

  CommentViewToolsStyles = css`
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

  toggleEditModal = e => {
    console.debug(e.currentTarget);
    this.setState({
      activeEditModal: this.state.activeEditModal ? false : true
    });
  };

  thisDeletePostConfirmation = (e, postId) => {
    // setup delete modal, yes dispatch event, no, just close modal
    console.debug(e.currentTarget, postId);
    this.props.thisDeletePost(postId);
  };

  render() {
    return (
      <div
        className={this.CommentViewToolsStyles}
        data-class="CommentViewToolsStyles"
      >
        <button
          className={`${this.CommentViewToolsStyles}_upvote`}
          onClick={() =>
            this.props.voting(
              this.props.commentId,
              "upVote",
              this.props.currentPost
            )
          }
        >
          <span className="sr-only">Up Vote Post</span>
          <img
            className={`${this.CommentViewToolsStyles}_icon`}
            src={UpvoteSVG}
            alt="up vote post"
            aria-hidden="true"
          />
        </button>
        <button
          className={`${this.CommentViewToolsStyles}_downvote`}
          onClick={() =>
            this.props.voting(
              this.props.commentId,
              "downVote",
              this.props.currentPost
            )
          }
        >
          <span className="sr-only">Down Vote Post</span>
          <img
            className={`${this.CommentViewToolsStyles}_icon`}
            src={DownvoteSVG}
            alt="down vote post"
            aria-hidden="true"
          />
        </button>
        <button
          className="post-tools_edit"
          onClick={e => {
            this.toggleEditModal(e);
          }}
        >
          Edit
        </button>
        {this.state.activeEditModal ? (
          <Modal
            {...this.props}
            closeAction={e => this.toggleEditModal(e)}
            modalType="edit-comment"
          />
        ) : (
          ""
        )}
        <button
          className="post-tools_delete"
          onClick={e => this.thisDeletePostConfirmation(e, this.props.postId)}
        >
          Delete
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    commentId: ownProps.commentId,
    currentPost: state.currentPost
  };
};

const mapDispatchToProps = dispatch => {
  return {
    voting: (commentId, vote, currentPost) => {
      dispatch(postCommentVote(commentId, vote, currentPost));
    },
    thisDeletePost: postId => {
      dispatch(deletePost(postId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentViewTools);
