import React, { Component } from "react";
import { connect } from "react-redux";
import { css } from "emotion";
import { postVote, deletePost, setDeletePostFlag } from "../actions/index";
import UpvoteSVG from "../media/upvote.svg";
import DownvoteSVG from "../media/downvote.svg";
import EditSVG from "../media/edit.svg";
import DeleteSVG from "../media/delete.svg";
import Modal from "./Modal";

class PostTools extends Component {
  state = {
    activeEditModal: false
  };

  PostToolsStyles = css`
    display: flex;
    align-items: center;
    justify-content: flex-end;

    &_upvote,
    &_downvote,
    &_edit,
    &_delete {
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

  thisDeletePostConfirmation = (e, postId) => {
    if (this.props.thisDeletePostFlag) {
      this.props.thisSetDeletePostFlag(true);
    } else {
      this.props.thisSetDeletePostFlag(false);
    }
    this.props.thisDeletePost(postId);
  };

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
        <button
          className={`${this.PostToolsStyles}_edit`}
          onClick={e => {
            this.toggleEditModal(e);
          }}
        >
          <span className="sr-only">Edit This Post</span>
          <img
            className={`${this.PostToolsStyles}_icon`}
            src={EditSVG}
            alt="Edit This Post"
            aria-hidden="true"
          />
        </button>
        {this.state.activeEditModal ? (
          <Modal
            {...this.props}
            closeAction={e => this.toggleEditModal(e)}
            modalType="edit"
          />
        ) : (
          ""
        )}
        <button
          className={`${this.PostToolsStyles}_delete`}
          onClick={e => this.thisDeletePostConfirmation(e, this.props.postId)}
        >
          <span className="sr-only">Delete This Post</span>
          <img
            className={`${this.PostToolsStyles}_icon`}
            src={DeleteSVG}
            alt="Delete This Post"
            aria-hidden="true"
          />
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    thisDeletePostFlag: ownProps.postView,
    postId: ownProps.postId,
    allPosts: state.posts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    voting: (postId, vote, allPosts) => {
      dispatch(postVote(postId, vote, allPosts));
    },
    thisDeletePost: postId => {
      dispatch(deletePost(postId));
    },
    thisSetDeletePostFlag: bool => {
      dispatch(setDeletePostFlag(bool));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostTools);
