import React, { Component } from "react";
import { css } from "emotion";
import Modal from "./Modal";
import globalStyles from "../utils/globalStyles";
import { hexToRGB } from "../utils/index";

class AddNewPost extends Component {
  state = {
    newModalStatus: false
  };

  AddNewPostStyles = css`
    text-align: right;

    &_button {
      margin: 0 0 1.28em;
      background: ${globalStyles.color.purple};
      padding: 0.8em 1.5em;
      box-shadow: -0.375em 0.375em 0 0
        rgba(${hexToRGB(globalStyles.color.purple)}, 0.4);
      text-transform: uppercase;
      color: ${globalStyles.color.white};
      font-size: 0.75em;
      font-weight: 800;
      display: inline-block;
    }

    &_plus {
      font-size: 1.5em;
    }
  `;

  toggleNewModal = e => {
    this.setState({ newModalStatus: this.state.newModalStatus ? false : true });
  };

  render() {
    return (
      <div className={this.AddNewPostStyles}>
        <button
          className={`${this.AddNewPostStyles}_button`}
          onClick={e => this.toggleNewModal(e)}
        >
          <span className={`${this.AddNewPostStyles}_plus`}>+</span> Post
        </button>
        {this.state.newModalStatus ? (
          <Modal
            {...this.props}
            closeAction={e => this.toggleNewModal(e)}
            modalType="new"
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default AddNewPost;
