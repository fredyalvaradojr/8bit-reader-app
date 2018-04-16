import React, { Component } from "react";
import { connect } from "react-redux";
import { css } from "emotion";
import { postCommentVote, deleteComment } from "../actions/index";
import UpvoteSVG from "../media/upvote.svg";
import DownvoteSVG from "../media/downvote.svg";
import DeleteSVG from "../media/delete.svg";
import EditSVG from "../media/edit.svg";
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
    &_downvote,
    &_delete,
    &_edit {
      background: none;
      margin-right: 0.5em;
    }

    &_delete {
      margin-right: 0;
    }

    &_icon {
      width: 1.3em;
      height: auto;
      display: inline-block;
    }
  `;

  toggleEditModal = e => {
    this.setState({
      activeEditModal: this.state.activeEditModal ? false : true
    });
  };

  thisDeleteCommentConfirmation = (e, commentId, parentID) => {
    this.props.thisDeleteComment(commentId, parentID);
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
              this.props.parentID
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
              this.props.parentID
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
          className={`${this.CommentViewToolsStyles}_edit`}
          onClick={e => {
            this.toggleEditModal(e);
          }}
        >
          <span className="sr-only">Edit This Comment</span>
          <img
            className={`${this.CommentViewToolsStyles}_icon`}
            src={EditSVG}
            alt="Edit This Comment"
            aria-hidden="true"
          />
        </button>
        {this.state.activeEditModal ? (
          <Modal
            {...this.props}
            closeAction={e => this.toggleEditModal(e)}
            modalType="edit-comment"
            commentId={this.props.commentId}
            parentID={this.props.parentID}
          />
        ) : (
          ""
        )}
        <button
          className={`${this.CommentViewToolsStyles}_delete`}
          onClick={e =>
            this.thisDeleteCommentConfirmation(
              e,
              this.props.commentId,
              this.props.parentID
            )
          }
        >
          <span className="sr-only">Delete This Comment</span>
          <img
            className={`${this.CommentViewToolsStyles}_icon`}
            src={DeleteSVG}
            alt="Delete This Comment"
            aria-hidden="true"
          />
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    parentID: ownProps.parentID,
    commentId: ownProps.commentId,
    currentPost: state.currentPost
  };
};

const mapDispatchToProps = dispatch => {
  return {
    voting: (commentId, vote, parentID) => {
      dispatch(postCommentVote(commentId, vote, parentID));
    },
    thisDeleteComment: (commentID, parentID) => {
      dispatch(deleteComment(commentID, parentID));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentViewTools);
