import React, { Component } from "react";
import { connect } from "react-redux";
import { css } from "emotion";
import { editPost } from "../actions/index";
import globalStyles from "../utils/globalStyles";
import ViewTitle from "./ViewTitle";
import CloseSVG from "../media/close.svg";
import { hexToRGB } from "../utils/index";

class Modal extends Component {
  ModalStyles = css`
    position: fixed;
    width: 100%;
    height: 100%;
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
    postInfoBody: ""
  };

  componentDidMount() {
    console.debug(this.props);
    const thisPostInfo = this.props.allPosts.filter(post => {
      if (post.id === this.props.postId) {
        console.debug("return post: ", post);
        return post;
      }
    });
    this.setState({
      postInfoTitle: thisPostInfo[0].title,
      postInfoID: thisPostInfo[0].id,
      postInfoBody: thisPostInfo[0].body
    });
  }

  handleModalEdits = e => {
    console.debug(
      "handleModalEdits",
      this.state.postInfoID,
      this.state.postInfoTitle,
      this.state.postInfoBody
    );
    // dispatch action to update post information
    this.props.editThisPostInfo(this.state);
    // on complete set modal state false
    e.preventDefault();
  };
  handleModalInputChange = e => {
    this.setState({ [e.currentTarget.id]: e.currentTarget.value });
  };

  render() {
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
  }
}

const mapStateToProps = state => {
  return {
    allPosts: state.posts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editThisPostInfo: state => {
      dispatch(editPost(state));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
