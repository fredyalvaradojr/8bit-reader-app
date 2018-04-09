import React, { Component } from "react";
import { connect } from "react-redux";
import { css } from "emotion";
import { withRouter } from "react-router-dom";
import {
  loadallCategories,
  setCurrentView,
  categoryFilterSelected,
  loadFilterCategory
} from "../actions";
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

  constructor(props) {
    super(props);
    console.debug(
      "props.categoryFilterSelectedValue: ",
      props.categoryFilterSelectedValue
    );
    this.state = {
      selectStatus: props.categoryFilterSelectedValue
    };
  }

  togglefilterStatus = e => {
    if (
      e.currentTarget.value !== this.state.selectStatus &&
      e.currentTarget.value !== "all"
    ) {
      this.setState({ selectStatus: e.currentTarget.value });
      this.props.setCurrentView("CategoryView");
      this.props.categoryFilterSelected(e.currentTarget.value);
      this.props.loadFilterCategory(e.currentTarget.value);
      this.props.history.push(`/${e.currentTarget.value}`);
    } else {
      this.setState({ selectStatus: e.currentTarget.value });
      this.props.setCurrentView("default");
      this.props.categoryFilterSelected(e.currentTarget.value);
      this.props.history.push(`/`);
    }
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
                value={this.state.selectStatus}
                onChange={e => this.togglefilterStatus(e)}
              >
                <option value="all">All</option>
                {this.props.categories.map(category => (
                  <option key={category.name} value={category.path}>
                    {category.name}
                  </option>
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
    categories: state.categories,
    categoryFilterSelectedValue: state.categoryFilterSelected
  };
};

const mapDispatchToProps = dispatch => ({
  dispatchLoadAllCategories: dispatch(loadallCategories()),
  setCurrentView: view => {
    dispatch(setCurrentView(view));
  },
  categoryFilterSelected: category => {
    dispatch(categoryFilterSelected(category));
  },
  loadFilterCategory: category => {
    dispatch(loadFilterCategory(category));
  }
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(FilterCategories)
);
