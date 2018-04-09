import React, { Component } from "react";
import { css } from "emotion";
import { connect } from "react-redux";
import uniqid from "uniqid";
import globalStyles from "../utils/globalStyles";
import PostTools from "./PostTools";
import Breadcrumb from "./Breadcrumb";
import { hexToRGB } from "../utils/index";
import ViewTitle from "./ViewTitle";
import { publishComment } from "../actions/index";
import CommentView from "./CommentView";

const article = css`
  &_header {
    font-family: "Bungee", cursive;
    color: ${globalStyles.color.purple};
    text-shadow: 0.25em 0.25em rgba(${hexToRGB(globalStyles.color.purple)}, 0.2);
    margin: 1em 0;
    padding: 1em 0;
    border-top: 0.1875em dashed ${globalStyles.color.darkGray};
    border-bottom: 0.1875em dashed ${globalStyles.color.darkGray};
  }

  &_meta {
    margin-bottom: 0.5em;
    border-bottom: 0.0625 dashed #ccc;
    padding-bottom: 0.5em;
    display: flex;
  }

  &_body {
    margin: 0 0 3em;
  }
`;

class PostView extends Component {
  state = {
    commentsFormStatus: false,
    newCommentBody: "",
    newCommentAuthor: ""
  };

  toggleCommentForm = e => {
    this.setState({
      commentsFormStatus: this.state.commentsFormStatus ? false : true
    });
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
      <div className="post-view">
        <article className={article}>
          <ViewTitle content={this.props.currentPost.title} />
          <Breadcrumb backToTitle="List" backTo="/" viewTo="default" />
          <div className={`${article}_meta`}>
            <div className={`${article}_author`}>
              {this.props.currentPost.author}
            </div>
            <div className={`${article}_number-comments`}>
              {this.props.currentPost.commentCount}
            </div>
            <div className={`${article}_number-votes`}>
              {this.props.currentPost.voteScore}
            </div>
          </div>
          <div className={`${article}_body`}>{this.props.currentPost.body}</div>
          <PostTools />
          {this.props.currentPost.comments &&
          this.props.currentPost.comments.length > 0 ? (
            <div className={`${article}_comments`}>
              <div className="commentsheader">
                <h2>Comments</h2>
                <button onClick={e => this.toggleCommentForm(e)}>
                  + Comment
                </button>
              </div>
              {this.state.commentsFormStatus ? (
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
                          <button onClick={e => this.toggleCommentForm(e)}>
                            Cancel
                          </button>
                          <button
                            onClick={e =>
                              this.handleNewComment(
                                e,
                                this.props.currentPost.id
                              )
                            }
                          >
                            Publish
                          </button>
                        </div>
                      </li>
                    </ul>
                  </form>
                </div>
              ) : (
                ""
              )}
              <ul>
                {this.props.currentPost.comments.map(comment => (
                  <li key={comment.id}>
                    <CommentView commentInfo={comment} />
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className={`${article}_comments`}>
              <h2>This post needs your feedback</h2>
            </div>
          )}
        </article>
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

export default connect(mapStateToProps, mapDispatchToProps)(PostView);
