import React, { Component } from "react";
import { connect } from "react-redux";
import { css } from "emotion";
import { NavLink } from "react-router-dom";
import { loadallCategories, setCurrentView } from "../actions";
import MyReadableLogo from "../media/logo.svg";

class AppHeader extends Component {
  appHeader = css`
    margin: 1em 0 2em;

    &_logo-container {
      text-align: center;
    }
  `;

  state = {
    menuStatus: ""
  };

  toggleMenuStatus = () => {
    const menuStatus = this.state.menuStatus === "" ? `appHeader_active` : "";
    this.setState({ menuStatus });
  };

  render() {
    return (
      <div className={this.appHeader} data-class="appHeader">
        <div className={`${this.appHeader}_logo-container`}>
          <NavLink
            to="/"
            onClick={() => {
              this.props.setCurrentView("default");
            }}
          >
            <img
              src={MyReadableLogo}
              className={`${this.appHeader}_logo`}
              alt="MyReadable App"
            />
            <span className="sr-only">MyReadble App</span>
          </NavLink>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.debug(state);
  return {
    categories: state.categories
  };
};

const mapDispatchToProps = dispatch => ({
  dispatchLoadAllCategories: dispatch(loadallCategories()),
  setCurrentView: view => {
    dispatch(setCurrentView(view));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);
