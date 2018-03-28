import React, { Component } from "react";
import { connect } from "react-redux";
import { css } from "emotion";
import { NavLink } from "react-router-dom";
import { loadallCategories } from "../actions";
import MyReadableLogo from "../media/logo.svg";
import globalStyles from "../utils/globalStyles";
import { hexToRGB } from "../utils/index";

class AppHeader extends Component {
  appHeader = css`
    margin: 0 0 2em;
    display: flex;

    &_logo-container {
      flex: 1;
      text-align: left;
    }

    &_hamburger {
      background: none;
      padding: 0.1875em;

      &.appHeader_active {
        .appHeader_bun {
          border: none;
        }
        .appHeader_patty {
          transform: rotate(45deg);
          transition: transform 0.2s cubic-bezier(0.6, 0.22, 0.27, 1.55);
          &:before {
            transform: rotate(-90deg);
            transition: transform 0.2s cubic-bezier(0.6, 0.22, 0.27, 1.55);
          }
        }
      }
    }

    .appHeader_bun {
      border-top: 4px solid ${globalStyles.color.purple};
      border-bottom: 4px solid ${globalStyles.color.purple};
      height: 1.25em;
      position: relative;
      width: 1.875em;
    }

    .appHeader_patty {
      border-top: 4px solid ${globalStyles.color.purple};
      left: 0;
      margin-top: -2px;
      position: absolute;
      top: 50%;
      transform-origin: 50% 50%;
      transition: transform 0.1s ease;
      width: 30px;

      &:before {
        border-top: 4px solid ${globalStyles.color.purple};
        content: "";
        left: 0;
        position: absolute;
        top: -4px;
        transition: transform 0.1s ease;
        width: 30px;
      }
    }

    &_menu-container {
      flex: 1;
      position: relative;
      text-align: right;
    }

    &_menu {
      display: none;
      text-align: left;
      position: absolute;
      top: 1.875em;
      right: 0;
      background: ${globalStyles.color.white};
      z-index: 1;
      width: 100%;
      padding: 1em;
      border: 0.5em dashed ${globalStyles.color.darkGray};
      box-shadow: -1.875em 1.875em 0 0
        rgba(${hexToRGB(globalStyles.color.darkGray)}, 1);

      &.appHeader_active {
        display: block;
      }
    }

    &_menu-item {
      margin: 0.5em 0.1875em;
      border-bottom: 0.0625em dotted ${globalStyles.color.darkGray};
      padding-bottom: 0.5em;

      &:last-child {
        border-bottom: 0;
        padding-bottom: 0;
      }
    }

    &_menu-item-link {
      color: ${globalStyles.color.darkGray};
      text-decoration: none;
      text-transform: uppercase;
      font-weight: bold;
      font-size: 0.75em;
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
          <NavLink to="/">
            <img
              src={MyReadableLogo}
              className={`${this.appHeader}_logo`}
              alt="MyReadable App"
            />
            <span className="sr-only">MyReadble App</span>
          </NavLink>
        </div>
        <div className={`${this.appHeader}_menu-container`}>
          <button
            className={`${this.appHeader}_hamburger ${this.state.menuStatus}`}
            onClick={() => this.toggleMenuStatus()}
          >
            <span className="sr-only">Main Menu</span>
            <div className="appHeader_bun">
              <div className="appHeader_patty" />
            </div>
          </button>
          <ul className={`${this.appHeader}_menu ${this.state.menuStatus}`}>
            <li className={`${this.appHeader}_menu-item`}>
              <NavLink to="/" className={`${this.appHeader}_menu-item-link`}>
                Home
              </NavLink>
            </li>
            {this.props.categories.map(category => {
              return (
                <li
                  key={category.path}
                  className={`${this.appHeader}_menu-item`}
                >
                  <NavLink
                    to={`/${category.path}`}
                    className={`${this.appHeader}_menu-item-link`}
                  >
                    {category.name}
                  </NavLink>
                </li>
              );
            })}
          </ul>
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
  dispatchLoadAllCategories: dispatch(loadallCategories())
});

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);
