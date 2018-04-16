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
    margin: 0 0 1em;
    flex: 0 0 40%;
    max-width: 40%;

    &_filter-container {
      flex: 1;
      position: relative;
      text-align: left;
    }

    &_filter {
      padding: 0.1em;
      box-shadow: -0.375em 0.375em 0 0
        rgba(${hexToRGB(globalStyles.color.purple)}, 0.4);
      color: ${globalStyles.color.black};
      font-size: 0.6875em;
      font-weight: 400;
      padding: 0.3em 0.5em;
      width: 100%;
      display: inline-block;
      text-align: left;
    }

    &_filter-label {
      margin-left: 0.3em;
    }

    &_filter-select {
      background: none;
      padding-left: 0;
      color: ${globalStyles.color.black};
      font-weight: 900;
      text-transform: uppercase;
    }
  `;

  state = {
    selectStatus: ""
  };

  componentWillReceiveProps(nextProps) {
    const catName =
      this.props.match.params.category !== nextProps.match.params.category
        ? nextProps.match.params.category
        : this.props.match.params.category;
    if (Object.keys(this.props.categories).length !== 0) {
      const catMatch = this.props.categories.filter(
        cat => cat.name === catName
      );
      if (catMatch.length > 0) {
        this.setState({
          selectStatus: catName
        });
        if (this.props.categoryFilterSelectedValue !== catName) {
          this.props.categoryFilterSelected(catName);
        }
      } else {
        if (this.props.match.path !== "/") {
          this.props.setCurrentView("fourzerofour");
          this.props.history.push("/fourzerofour");
        }
      }
    }
  }

  togglefilterStatus = e => {
    if (
      e.currentTarget.value !== this.state.selectStatus &&
      e.currentTarget.value !== "all"
    ) {
      this.props.setCurrentView("CategoryView");
      this.setState({ selectStatus: e.currentTarget.value });
      this.props.history.push(`/${e.currentTarget.value}`);
      this.props.categoryFilterSelected(e.currentTarget.value);
      this.props.loadFilterCategory(e.currentTarget.value);
    } else {
      this.setState({ selectStatus: e.currentTarget.value });
      this.props.history.push(`/`);
      this.props.setCurrentView("default");
      this.props.categoryFilterSelected(e.currentTarget.value);
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
