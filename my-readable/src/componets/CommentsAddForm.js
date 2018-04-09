import React, { Component } from "react";
import { connect } from "react-redux";
import uniqid from "uniqid";
import { publishComment } from "../actions/index";

class CommentsAddForm extends Component {
  state = {
    newCommentBody: "",
    newCommentAuthor: ""
  };

  handleModalInputChange = e => {
    this.setState({ [e.currentTarget.id]: e.currentTarget.value });
  };

  handleNewComment = (e, id) => {
    this.props.thisPublishComment({
      newCommentParentID: id,
      newCommentBody: this.state.newCommentBody,
      newCommentAuthor: this.state.newCommentAuthor,
      UUID: uniqid(),
      timestamp: Date.now()
    });
    e.preventDefault();
  };

  render() {
    return (
      <div className="add-comment-form">
        <form>
          <ul>
            <li>
              <label
                className={`${this.ModalStyles}_label`}
                htmlFor="newCommentBody"
              >
                Body
              </label>
              <textarea
                className={`${this.ModalStyles}_editable-input`}
                value={this.state.newCommentBody}
                onChange={e => this.handleModalInputChange(e)}
                id="newCommentBody"
              />
            </li>
            <li>
              <label
                className={`${this.ModalStyles}_label`}
                htmlFor="newCommentAuthor"
              >
                Author
              </label>
              <input
                className={`${this.ModalStyles}_editable-input`}
                value={this.state.newCommentAuthor}
                onChange={e => this.handleModalInputChange(e)}
                id="newCommentAuthor"
              />
            </li>
            <li>
              <div className="add-comment-form_actions">
                <button onClick={e => this.props.openForm(e)}>Cancel</button>
                <button
                  onClick={e =>
                    this.handleNewComment(e, this.props.currentPost.id)
                  }
                >
                  Publish
                </button>
              </div>
            </li>
          </ul>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentPost: state.currentPost
  };
};

const mapDispatchToProps = dispatch => {
  return {
    thisPublishComment: comment => {
      dispatch(publishComment(comment));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentsAddForm);
