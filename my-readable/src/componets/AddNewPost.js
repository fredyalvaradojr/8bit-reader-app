import React, { Component } from "react";
import Modal from "./Modal";

class AddNewPost extends Component {
  state = {
    newModalStatus: false
  };

  toggleNewModal = e => {
    console.debug("toggleNewModal");
    this.setState({ newModalStatus: this.state.newModalStatus ? false : true });
  };

  render() {
    return (
      <div className="AddNewPostStyles">
        <button onClick={e => this.toggleNewModal(e)}>AddNewPost</button>
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
