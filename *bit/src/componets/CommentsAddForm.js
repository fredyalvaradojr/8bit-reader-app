import React, { Component } from "react";
import { connect } from "react-redux";
import { css } from "emotion";
import { publishComment } from "../actions/index";
import globalStyles from "../utils/globalStyles";
import { hexToRGB, uniqid } from "../utils/index";

class CommentsAddForm extends Component {
  state = {
    newCommentBody: "",
    newCommentAuthor: "",
    fieldsMissing: false
  };

  CommentsAddForm = css`
    &_label {
      display: block;
      font-weight: bold;
      line-height: 1.5em;
      margin-bottom: 0.1875em;
      text-align: left;
      font-size: 0.875em;
    }

    &_editable-input {
      width: 100%;
      margin: 0 0 0.5em 0;
      padding: 0.5em;
      font-size: 1em;
      border: 0.1875em dashed ${globalStyles.color.darkGray};
    }
    &_submit-btn {
      background: ${globalStyles.color.purple};
      color: ${globalStyles.color.white};
      text-transform: uppercase;
      font-size: 0.75em;
      font-weight: bold;
      padding: 0.8em 1.5em;
      box-shadow: -0.375em 0.375em 0 0
        rgba(${hexToRGB(globalStyles.color.purple)}, 0.4);
    }
    &_error-block {
      border: 0.3em solid ${globalStyles.color.orange};
      padding: 0.5em;
      color: ${globalStyles.color.darkOrange};
      font-weight: 800;
      text-align: left;
      font-size: 0.6875em;
      margin-bottom: 1em;
    }
    &_add-buttons {
      padding-bottom: 1em;
      margin-bottom: 1.5em;
      border-bottom: 0.0625rem dotted ${globalStyles.color.purple};
    }
    &_cancel-btn {
      margin-left: 1em;
      background: none;
      color: ${globalStyles.color.purple};
    }
  `;

  handleModalInputChange = e => {
    this.setState({ [e.currentTarget.id]: e.currentTarget.value });
  };

  handleNewComment = (e, id) => {
    if (
      this.state.newCommentBody !== "" &&
      this.state.newCommentAuthor !== ""
    ) {
      this.setState({ fieldsMissing: false });
      this.props.thisPublishComment({
        newCommentParentID: id,
        newCommentBody: this.state.newCommentBody,
        newCommentAuthor: this.state.newCommentAuthor,
        UUID: uniqid(),
        timestamp: Date.now()
      });
    } else {
      this.setState({ fieldsMissing: true });
    }
    e.preventDefault();
  };

  render() {
    return (
      <div className={this.CommentsAddForm}>
        {this.state.fieldsMissing ? (
          <div className={`${this.CommentsAddForm}_error-block`}>
            Please verify that all the fields are filled out.
          </div>
        ) : (
          ""
        )}
        <form>
          <ul>
            <li>
              <label
                className={`${this.CommentsAddForm}_label`}
                htmlFor="newCommentBody"
              >
                Body
              </label>
              <textarea
                className={`${this.CommentsAddForm}_editable-input`}
                value={this.state.newCommentBody}
                onChange={e => this.handleModalInputChange(e)}
                id="newCommentBody"
              />
            </li>
            <li>
              <label
                className={`${this.CommentsAddForm}_label`}
                htmlFor="newCommentAuthor"
              >
                Author
              </label>
              <input
                className={`${this.CommentsAddForm}_editable-input`}
                value={this.state.newCommentAuthor}
                onChange={e => this.handleModalInputChange(e)}
                id="newCommentAuthor"
              />
            </li>
            <li>
              <div
                className={
                  this.props.noComments
                    ? ""
                    : `${this.CommentsAddForm}_add-buttons`
                }
              >
                <button
                  className={`${this.CommentsAddForm}_submit-btn`}
                  onClick={e => this.handleNewComment(e, this.props.parentID)}
                >
                  Submit
                </button>
                {this.props.noComments ? (
                  ""
                ) : (
                  <button
                    className={`${this.CommentsAddForm}_cancel-btn`}
                    onClick={e => this.props.openForm(e)}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </li>
          </ul>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    noComments: ownProps.noComments,
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
