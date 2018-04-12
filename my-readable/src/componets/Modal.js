import React, { Component } from "react";
import { connect } from "react-redux";
import { css } from "emotion";
import uniqid from "uniqid";
import { editPost, addNewPostInfo, editComment } from "../actions/index";
import globalStyles from "../utils/globalStyles";
import ViewTitle from "./ViewTitle";
import CloseSVG from "../media/close.svg";
import { hexToRGB } from "../utils/index";

class Modal extends Component {
  ModalStyles = css`
    position: fixed;
    width: 100%;
    height: 100%;
    overflow: scroll;
    top: 0;
    left: 0;
    background: ${globalStyles.color.white};

    &_container {
      margin: 1.5em;
    }

    &_header {
      text-align: right;
    }

    &_close-btn {
      background: transparent;
      width: 2em;
      height: auto;
      margin-bottom: 1rem;
    }

    &_close-icon {
      max-width: 100%;
      height: auto;
    }

    &_label {
      display: block;
      //border-bottom: 0.0625em dotted ${globalStyles.color.darkGray};
      font-weight: bold;
      line-height: 1.5em;
      margin-bottom: 0.1875em;
    }
    &_editable-input {
      width: 100%;
      margin: 0 0 1em 0;
      padding: 1em;
      border: 0.1875em dashed ${globalStyles.color.darkGray};
    }
    &_li-submit {
      text-align: center;
    }
    &_submit-btn {
      background: ${globalStyles.color.purple};
      color: ${globalStyles.color.white};
      text-transform: uppercase;
      font-weight: bold;
      padding: 0.5em 1em;
      box-shadow: -0.375em 0.375em 0 0
        rgba(${hexToRGB(globalStyles.color.purple)}, 0.4);
    }
  `;

  state = {
    postInfoTitle: "",
    postInfoID: "",
    postInfoBody: "",
    modalType: "",
    newPostId: "",
    newPostTitle: "",
    newPostBody: "",
    newPostAuthor: "",
    newPostCategory: "",
    editCommentBody: "",
    editCommentID: "",
    editcommentParentID: ""
  };

  componentDidMount() {
    switch (this.props.modalType) {
      case "new": {
        this.setState({ modalType: this.props.modalType });
        break;
      }
      case "edit": {
        const thisPostInfo = this.props.allPosts.filter(
          post => post.id === this.props.postId
        );
        this.setState({
          modalType: this.props.modalType,
          postInfoTitle: thisPostInfo[0].title,
          postInfoID: thisPostInfo[0].id,
          postInfoBody: thisPostInfo[0].body
        });
        break;
      }
      case "edit-comment": {
        const thisEditCommentPost = this.props.allPosts.filter(
          post => post.id === this.props.parentID
        );
        const thisEditComment = thisEditCommentPost[0]["comments"].filter(
          comment => comment.id === this.props.commentId
        );
        console.debug("thisComment: ", thisEditComment[0].body);
        this.setState({
          modalType: this.props.modalType,
          editCommentBody: thisEditComment[0].body,
          editCommentID: thisEditComment[0].id,
          editcommentParentID: this.props.parentID
        });
        break;
      }
      default: {
      }
    }
  }

  handleModalEdits = e => {
    this.props.editThisPostInfo(this.state);
    e.preventDefault();
  };

  handleNewPost = e => {
    this.props.addNewPostInfo({
      newPostTitle: this.state.newPostTitle,
      newPostBody: this.state.newPostBody,
      newPostAuthor: this.state.newPostAuthor,
      newPostCategory: this.state.newPostCategory,
      UUID: uniqid(),
      timestamp: Date.now()
    });
    e.preventDefault();
  };

  handleEditComment = e => {
    this.props.handleEditComment({
      editCommentBody: this.state.editCommentBody,
      editCommentID: this.state.editCommentID,
      timestamp: Date.now(),
      parentID: this.state.editcommentParentID
    });
    e.preventDefault();
  };

  handleModalInputChange = e => {
    this.setState({ [e.currentTarget.id]: e.currentTarget.value });
  };

  setModalContent = () => {
    if (this.state.modalType === "new") {
      return (
        <div className={this.ModalStyles} data-class="this.ModalStyles">
          <div className={`${this.ModalStyles}_container`}>
            <div className={`${this.ModalStyles}_header`}>
              <button
                className={`${this.ModalStyles}_close-btn`}
                onClick={e => this.props.closeAction(e)}
              >
                <img
                  src={CloseSVG}
                  className={`${this.ModalStyles}_close-icon`}
                  alt="Close Modal"
                  aria-hidden="true"
                />
                <span className="sr-only">Close Modal</span>
              </button>
              <ViewTitle content="Add A New Post" />
              <p>New post instructions:</p>
            </div>
            <div className={`${this.ModalStyles}_body`}>
              <form onSubmit={e => this.handleNewPost(e)}>
                <ul>
                  <li>
                    <label
                      className={`${this.ModalStyles}_label`}
                      htmlFor="newPostTitle"
                    >
                      Title
                    </label>
                    <input
                      className={`${this.ModalStyles}_editable-input`}
                      value={this.state.newPostTitle}
                      onChange={e => this.handleModalInputChange(e)}
                      id="newPostTitle"
                    />
                  </li>
                  <li>
                    <label
                      className={`${this.ModalStyles}_label`}
                      htmlFor="newPostBody"
                    >
                      Body
                    </label>
                    <textarea
                      className={`${this.ModalStyles}_editable-input`}
                      value={this.state.newPostBody}
                      onChange={e => this.handleModalInputChange(e)}
                      id="newPostBody"
                    />
                  </li>
                  <li>
                    <label
                      className={`${this.ModalStyles}_label`}
                      htmlFor="newPostAuthor"
                    >
                      Author
                    </label>
                    <input
                      className={`${this.ModalStyles}_editable-input`}
                      value={this.state.newPostAuthor}
                      onChange={e => this.handleModalInputChange(e)}
                      id="newPostAuthor"
                    />
                  </li>
                  <li>
                    <label
                      className={`${this.ModalStyles}_label`}
                      htmlFor="newPostCategory"
                    >
                      Select a Category
                    </label>
                    <select
                      id="newPostCategory"
                      className={`${this.ModalStyles}_filter-select`}
                      value={this.state.newPostCategory}
                      onChange={e => this.handleModalInputChange(e)}
                    >
                      <option value="-">-</option>
                      {this.props.allCategories.map(category => (
                        <option key={category.name} value={category.path}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </li>
                  <li className={`${this.ModalStyles}_li-submit`}>
                    <input
                      className={`${this.ModalStyles}_submit-btn`}
                      type="submit"
                      value="Submit"
                    />
                  </li>
                </ul>
              </form>
            </div>
            <div className={`${this.ModalStyles}_footer`} />
          </div>
        </div>
      );
    }
    if (this.state.modalType === "edit-comment") {
      return (
        <div className={this.ModalStyles} data-class="this.ModalStyles">
          <div className={`${this.ModalStyles}_container`}>
            <div className={`${this.ModalStyles}_header`}>
              <button
                className={`${this.ModalStyles}_close-btn`}
                onClick={e => this.props.closeAction(e)}
              >
                <img
                  src={CloseSVG}
                  className={`${this.ModalStyles}_close-icon`}
                  alt="Close Modal"
                  aria-hidden="true"
                />
                <span className="sr-only">Close Modal</span>
              </button>
              <ViewTitle content="Edit Comment" />
            </div>
            <div className={`${this.ModalStyles}_body`}>
              <form onSubmit={e => this.handleEditComment(e)}>
                <ul>
                  <li>
                    <label
                      className={`${this.ModalStyles}_label`}
                      htmlFor="editCommentBody"
                    >
                      Body
                    </label>
                    <textarea
                      className={`${this.ModalStyles}_editable-input`}
                      value={this.state.editCommentBody}
                      onChange={e => this.handleModalInputChange(e)}
                      id="editCommentBody"
                    />
                  </li>
                  <li className={`${this.ModalStyles}_li-submit`}>
                    <input
                      className={`${this.ModalStyles}_submit-btn`}
                      type="submit"
                      value="Submit"
                    />
                  </li>
                </ul>
              </form>
            </div>
            <div className={`${this.ModalStyles}_footer`} />
          </div>
        </div>
      );
    }
    return (
      <div className={this.ModalStyles} data-class="this.ModalStyles">
        <div className={`${this.ModalStyles}_container`}>
          <div className={`${this.ModalStyles}_header`}>
            <button
              className={`${this.ModalStyles}_close-btn`}
              onClick={e => this.props.closeAction(e)}
            >
              <img
                src={CloseSVG}
                className={`${this.ModalStyles}_close-icon`}
                alt="Close Modal"
                aria-hidden="true"
              />
              <span className="sr-only">Close Modal</span>
            </button>
            <ViewTitle content="Edit Post" />
          </div>
          <div className={`${this.ModalStyles}_body`}>
            <form onSubmit={e => this.handleModalEdits(e)}>
              <ul>
                <li>
                  <label
                    className={`${this.ModalStyles}_label`}
                    htmlFor="postInfoTitle"
                  >
                    Title
                  </label>
                  <input
                    className={`${this.ModalStyles}_editable-input`}
                    value={this.state.postInfoTitle}
                    onChange={e => this.handleModalInputChange(e)}
                    id="postInfoTitle"
                  />
                </li>
                <li>
                  <label
                    className={`${this.ModalStyles}_label`}
                    htmlFor="postInfoBody"
                  >
                    Body
                  </label>
                  <textarea
                    className={`${this.ModalStyles}_editable-input`}
                    value={this.state.postInfoBody}
                    onChange={e => this.handleModalInputChange(e)}
                    id="postInfoBody"
                  />
                </li>
                <li className={`${this.ModalStyles}_li-submit`}>
                  <input
                    className={`${this.ModalStyles}_submit-btn`}
                    type="submit"
                    value="Submit"
                  />
                </li>
              </ul>
            </form>
          </div>
          <div className={`${this.ModalStyles}_footer`} />
        </div>
      </div>
    );
  };

  render() {
    const modalContent = this.setModalContent();

    return <div>{modalContent}</div>;
  }
}

const mapStateToProps = state => {
  return {
    allPosts: state.posts,
    allCategories: state.categories,
    currentPost: state.currentPost
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editThisPostInfo: state => {
      dispatch(editPost(state));
    },
    addNewPostInfo: state => {
      dispatch(addNewPostInfo(state));
    },
    handleEditComment: state => {
      dispatch(editComment(state));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
