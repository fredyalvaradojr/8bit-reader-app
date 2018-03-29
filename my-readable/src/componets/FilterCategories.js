import React, { Component } from "react";
import { connect } from "react-redux";
import { css } from "emotion";
import { NavLink } from "react-router-dom";
import { loadallCategories } from "../actions";
import MyReadableLogo from "../media/logo.svg";
import globalStyles from "../utils/globalStyles";
import { hexToRGB } from "../utils/index";

class FilterCategories extends Component {
  filterCategoriesCSS = css`
    margin: 0 0 2em;
    display: flex;

    &_filter-container {
      flex: 1;
      position: relative;
      text-align: left;
    }

    &_filter {
      background: ${globalStyles.color.purple};
      padding: 0.1em;
      box-shadow: -0.375em 0.375em 0 0
        rgba(${hexToRGB(globalStyles.color.purple)}, 0.4);
      text-transform: uppercase;
      color: ${globalStyles.color.white};
      font-size: 0.75em;
      font-weight: 400;
      padding: 0.3em 0.5em;
      width: 100%;
      display: inline-block;
      text-align: center;
    }

    &_filter-label {
    }

    &_filter-select {
      background: none;
      color: ${globalStyles.color.white};
      font-weight: 900;
      text-transform: uppercase;
    }
  `;

  state = {
    filterStatus: ""
  };

  togglefilterStatus = () => {
    const filterStatus =
      this.state.filterStatus === "" ? `appHeader_active` : "";
    this.setState({ filterStatus });
  };

  render() {
    return (
      <div
        className={this.filterCategoriesCSS}
        data-class="filterCategoriesCSS"
      >
        <div className={`${this.filterCategoriesCSS}_filter-container`}>
          <form>
            <label
              htmlFor="filter-category"
              className={`${this.filterCategoriesCSS}_filter`}
            >
              <span className={`${this.filterCategoriesCSS}_filter-label`}>
                Filter By:
              </span>
              <select
                id="filter-category"
                className={`${this.filterCategoriesCSS}_filter-select`}
                value={``}
                onChange={``}
              >
                <option value="all">All</option>
                {this.props.categories.map(category => (
                  <option value={category.path}>{category.name}</option>
                ))}
              </select>
            </label>
          </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(FilterCategories);
